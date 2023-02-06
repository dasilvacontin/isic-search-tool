const fs = require('fs');

fs.readFile('ISICS-improved2.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const isics = JSON.parse(data);

  let html = '';
  for (const isic of isics) {
    html += `
    <div class="ISIC">
      <div class="code">${isic.code}</div>
      <div class="name">${isic.name}</div>
      <div class="desc"><span class="description">${isic.description}</span><span class="includes">${isic.includes}</span><span class="excludes">${isic.excludes}</span></div>
    </div>
    `;
  }

  console.log(html);
});
