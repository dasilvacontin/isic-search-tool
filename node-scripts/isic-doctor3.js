const fs = require('fs');

const ISICS = JSON.parse(fs.readFileSync('ISICS.json', 'utf-8'));

let prevCode = '';
for (const isic of ISICS) {
  if (typeof isic.code !== 'string' || !/^\d+$/.test(isic.code)) {
    console.error(`Invalid code: ${isic.code}`);
  }

  if (typeof isic.name !== 'string' || isic.name.length === 0) {
    console.error(`Invalid name: ${isic.name}`);
  }

  if (isic.code <= prevCode) {
    console.error(`Invalid order: ${isic.code} <= ${prevCode}`);
  }

  prevCode = isic.code;
}

console.log('JSON is valid');