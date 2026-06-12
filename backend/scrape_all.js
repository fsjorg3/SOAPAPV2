const fs = require('fs');
const http = require('http');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function decodeHtml(html) {
    return html.replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&aacute;/g, 'á').replace(/&uacute;/g, 'ú').replace(/&eacute;/g, 'é').replace(/&ntilde;/g, 'ñ').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Aacute;/g, 'Á').replace(/&Uacute;/g, 'Ú').replace(/&Eacute;/g, 'É').replace(/&Ntilde;/g, 'Ñ');
}

async function scrapeAll() {
    const templatePath = 'c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\assets\\informacion_financiera\\2024\\2024.json';
    const templateJson = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

    for (let sec of templateJson.secciones) {
        sec.periodos = [];
    }
    templateJson.año = 2021;

    const sectionsToScrape = [
        { url: 'http://127.0.0.1:5501/info/2021/2021-Estados-financieros.html', title: 'Estados financieros, contables, presupuestales y programáticos' },
        { url: 'http://127.0.0.1:5501/info/2021/2021-Montos-pagados.html', title: 'Montos pagados por ayudas y subsidios' },
        { url: 'http://127.0.0.1:5501/info/2021/2021-Notas-estados-financieros.html', title: 'Notas a los Estados Financieros' },
        { url: 'http://127.0.0.1:5501/info/2021/2021-Relacion-bienes.html', title: 'Relación de bienes que componen el patrimonio' },
        { url: 'http://127.0.0.1:5501/info/2021/2021-Informacion-financiera-relativa.html', title: 'Información financiera relativa a la evaluación y rendición de cuentas' },
        { url: 'http://127.0.0.1:5501/info/2021/2021-Presupuesto-ingresos-egresos.html', title: 'Presupuesto de Ingresos y Egresos' }
    ];

    for (let task of sectionsToScrape) {
        try {
            console.log(`Scraping ${task.title}...`);
            const html = await fetchHtml(task.url);
            const periodosParsed = [];

            const accordionRegex = /<div class="accordion-item">([\s\S]*?)<\/ul>/g;
            let match;
            let foundAccordion = false;

            while ((match = accordionRegex.exec(html)) !== null) {
                foundAccordion = true;
                const block = match[1];
                const periodMatch = block.match(/<button[^>]*>([^<]+)<\/button>/);
                if (!periodMatch) continue;
                const periodo = periodMatch[1].trim();

                const documentos = [];
                const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
                let liMatch;
                while ((liMatch = liRegex.exec(block)) !== null) {
                    let liContent = liMatch[1];
                    const aMatch = liContent.match(/<a\s+href="([^"]+)"[^>]*>([^<]*)/);
                    if (aMatch) {
                        let docTitle = decodeHtml(aMatch[2]).trim();
                        documentos.push({ titulo: docTitle, link: aMatch[1].trim() });
                    } else {
                        let docTitle = decodeHtml(liContent.replace(/<[^>]+>/g, '')).trim();
                        if (docTitle) documentos.push({ titulo: docTitle, link: "" });
                    }
                }
                
                periodosParsed.push({ periodo: periodo, documentos: documentos });
            }

            if (!foundAccordion) {
                const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/i;
                const articleMatch = articleRegex.exec(html);
                if (articleMatch) {
                    const block = articleMatch[1];
                    const documentos = [];
                    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
                    let liMatch;
                    while ((liMatch = liRegex.exec(block)) !== null) {
                        let liContent = liMatch[1];
                        if (liContent.includes('breadcrumb')) continue;
                        
                        const aMatch = liContent.match(/<a\s+href="([^"]+)"[^>]*>([^<]*)/);
                        if (aMatch) {
                            let docTitle = decodeHtml(aMatch[2]).trim();
                            if (docTitle && docTitle !== 'Recursos' && !docTitle.includes('financiera 2022') && !docTitle.includes('financiera 2023') && !docTitle.includes('financiera 2021')) {
                                documentos.push({ titulo: docTitle, link: aMatch[1].trim() });
                            }
                        } else {
                            let docTitle = decodeHtml(liContent.replace(/<[^>]+>/g, '')).trim();
                            if (docTitle) documentos.push({ titulo: docTitle, link: "" });
                        }
                    }
                    if (documentos.length > 0) {
                        periodosParsed.push({ periodo: task.title, documentos: documentos });
                    }
                }
            }

            const secInfo = templateJson.secciones.find(s => s.titulo === task.title);
            if (secInfo) {
                secInfo.periodos = periodosParsed;
            } else {
                console.error(`Section not found in template: ${task.title}`);
            }

        } catch (err) {
            console.error(`Failed to scrape ${task.url}: ${err.message}`);
        }
    }

    const directLinks = [
        {
            titulo: "Norma para la difusión a la ciudadanía de la ley de ingresos y del presupuesto de egresos",
            link: "https://drive.google.com/file/d/12VxtNN6tANFuY0dYgHTmXA7y3Xw5y1xp/view"
        },
        {
            titulo: "Norma para establecer la estructura de información del formato del ejercicio y destino de gasto federalizado y reintegros",
            link: "https://drive.google.com/file/d/1OpEvSgsFk2gHyChPxcYWIeljogBARMqa/view?usp=sharing"
        }
    ];

    for (let dl of directLinks) {
        const secInfo = templateJson.secciones.find(s => s.titulo === dl.titulo);
        if (secInfo) {
            secInfo.periodos = [{
                periodo: dl.titulo,
                documentos: [
                    {
                        titulo: dl.titulo,
                        link: dl.link
                    }
                ]
            }];
        }
    }

    const dir = 'c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\assets\\informacion_financiera\\2021';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}\\2021.json`, JSON.stringify(templateJson, null, 4), 'utf8');
    console.log('Successfully wrote 2021.json');
}

scrapeAll();
