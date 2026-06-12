const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const dir = 'c:\\Documentos\\proyectos\\SOAPAPV2\\backend\\assets\\informacion_financiera\\2021';
const jsonPath = path.join(dir, '2021.json');
const templateJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '_')           // Replace spaces with _
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\_\_+/g, '_')         // Replace multiple _ with single _
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function getQuarterSuffix(periodo) {
    if (periodo.toLowerCase().includes('primer trimestre')) return 'Q1';
    if (periodo.toLowerCase().includes('segundo trimestre')) return 'Q2';
    if (periodo.toLowerCase().includes('tercer trimestre')) return 'Q3';
    if (periodo.toLowerCase().includes('cuarto trimestre')) return 'Q4';
    if (periodo.toLowerCase().includes('primer semestre')) return 'S1';
    if (periodo.toLowerCase().includes('segundo semestre')) return 'S2';
    return 'Q0'; // default
}

let downloadedCount = 0;

for (let sec of templateJson.secciones) {
    for (let per of sec.periodos) {
        let qSuffix = getQuarterSuffix(per.periodo);
        
        for (let doc of per.documentos) {
            if (doc.link && doc.link.includes('drive.google.com')) {
                // Extract ID
                const match = doc.link.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match) {
                    const fileId = match[1];
                    const safeTitle = slugify(doc.titulo);
                    
                    let filename = `2021_${qSuffix !== 'Q0' ? qSuffix + '_' : ''}${safeTitle}.pdf`;
                    const filePath = path.join(dir, filename);
                    
                    if (!fs.existsSync(filePath)) {
                        console.log(`Downloading ${doc.titulo} -> ${filename}`);
                        const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
                        
                        try {
                            execSync(`curl -L -s -o "${filePath}" "${url}"`, { stdio: 'inherit' });
                            
                            const content = fs.readFileSync(filePath, 'utf8');
                            if (content.startsWith('<html') || content.startsWith('<!DOCTYPE html>')) {
                                console.log(`  -> Warning: Downloaded HTML instead of PDF for ${filename}. Might be a large file warning.`);
                            } else {
                                downloadedCount++;
                            }
                        } catch(err) {
                            console.error(`  -> Failed to download ${filename}`);
                        }
                    } else {
                        console.log(`Already exists: ${filename}`);
                    }
                    
                    doc.link = filename;
                }
            }
        }
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(templateJson, null, 4), 'utf8');
console.log(`Finished downloading ${downloadedCount} documents.`);
console.log(`Updated 2021.json with local filenames.`);
