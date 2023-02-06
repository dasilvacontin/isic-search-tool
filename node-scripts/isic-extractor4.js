const pdf = require('pdf-parse');
const fs = require('fs');

const PDF_FILE = './ISICS.pdf';
const REGEX = /^(\d+\s?)+\s(.*)/;

pdf(PDF_FILE).then(data => {
  let codes = [];
  let lines = data.text.split('\n');
  let currentCode = '';
  let currentDescription = '';

  lines.forEach(line => {
    let matches = line.match(REGEX);
    if (matches) {
      if (currentCode) {
        codes.push({
          code: currentCode,
          name: currentDescription
        });
      }
      currentCode = matches[1].trim();
      currentDescription = matches[2];
    } else {
      currentDescription += '\n' + line;
    }
  });

  console.log(JSON.stringify(codes));
});