const fs = require('fs');
const ISICS = JSON.parse(fs.readFileSync('ISICS.json'));

const codeRegex = /^\d{1,4}$/;

for (const section of ISICS) {
  if (!codeRegex.test(section.code)) {
    console.error(`Incorrect code format detected: ${section.code}`);
  }
}