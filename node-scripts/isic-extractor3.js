const pdfParse = require('pdf-parse');
const fs = require('fs');

async function extractDataFromPdf(filePath) {
  const data = await pdfParse(fs.readFileSync(filePath));
  const lines = data.text.split('\n');
  let currentSection = '';
  let currentCode = '';
  let currentName = '';
  let currentDescription = '';
  const result = [];

  for (const line of lines) {
    if (line.startsWith('Section')) {
      currentSection = line;
      continue;
    }

    if (line.startsWith('0')) {
      if (currentCode) {
        result.push({
          code: currentCode,
          name: currentName,
          description: currentDescription
        });
      }
      currentCode = line.substring(0, 3).trim();
      currentName = line.substring(3).trim();
      currentDescription = '';
      continue;
    }

    currentDescription += line + '\n';
  }

  if (currentCode) {
    result.push({
      code: currentCode,
      name: currentName,
      description: currentDescription
    });
  }

  return result;
}

(async () => {
  const result = await extractDataFromPdf('ISICS.pdf');
  console.log(JSON.stringify(result, null, 2));
})();