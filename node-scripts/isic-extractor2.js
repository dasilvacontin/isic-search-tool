const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('ISICS.pdf'),
});

const isicCodes = [];
let code, name, description;
rl.on('line', (line) => {
  const codeMatch = line.match(/^(\d{2})\s/);
  if (codeMatch) {
    if (code && name && description) {
      isicCodes.push({ code, name, description });
    }
    code = codeMatch[1];
    name = line.substring(codeMatch[0].length).trim();
    description = '';
  } else if (name) {
    description += line.trim() + '\n';
  }
});

rl.on('close', () => {
  console.log(JSON.stringify(isicCodes, null, 2));
});