const fs = require('fs');
const pdf = require('pdf-parse');

async function extractISICInfo(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  const pdfData = await pdf(dataBuffer);
  const lines = pdfData.text.split('\n');

  let currentISIC = '';
  let currentDescription = '';
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().length === 0) continue;

    if (line.match(/^\d{4} /)) {
      if (currentISIC) {
        result.push({
          code: currentISIC,
          description: currentDescription
        });
      }

      currentISIC = line.split(' ')[0];
      currentDescription = line.split(' ').slice(1).join(' ');
    } else {
      currentDescription += ' ' + line;
    }
  }

  if (currentISIC) {
    result.push({
      code: currentISIC,
      description: currentDescription
    });
  }

  return JSON.stringify(result);
}

const output = extractISICInfo('ISICS.pdf');
output.then(result => console.log(result))
