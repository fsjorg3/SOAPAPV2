const fs = require('fs');

const html = fs.readFileSync('c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\2023_raw.html', 'utf8');
const templateJson = JSON.parse(fs.readFileSync('c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\assets\\informacion_financiera\\2024\\2024.json', 'utf8'));

function decodeHtml(html) {
    return html.replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&aacute;/g, 'á').replace(/&uacute;/g, 'ú').replace(/&eacute;/g, 'é').replace(/&ntilde;/g, 'ñ').replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Aacute;/g, 'Á').replace(/&Uacute;/g, 'Ú').replace(/&Eacute;/g, 'É').replace(/&Ntilde;/g, 'Ñ');
}

templateJson.año = 2023;

const periodosParsed = [];

const accordionRegex = /<div class="accordion-item">([\s\S]*?)<\/ul>/g;
let match;
while ((match = accordionRegex.exec(html)) !== null) {
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
            let title = decodeHtml(aMatch[2]).trim();
            documentos.push({
                titulo: title,
                link: aMatch[1].trim()
            });
        } else {
            let title = decodeHtml(liContent).trim();
            documentos.push({
                titulo: title,
                link: ""
            });
        }
    }
    
    periodosParsed.push({
        periodo: periodo,
        documentos: documentos
    });
}

templateJson.secciones[0].periodos = periodosParsed;

for (let i = 1; i < templateJson.secciones.length; i++) {
    for (let p of templateJson.secciones[i].periodos) {
        for (let d of p.documentos) {
            d.link = "";
        }
    }
}

const dir = 'c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\assets\\informacion_financiera\\2023';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(dir + '\\2023.json', JSON.stringify(templateJson, null, 4), 'utf8');
console.log('Successfully wrote 2023.json');
