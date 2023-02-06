const fs = require('fs');

fs.readFile('ISICS.json', 'utf8', (err, data) => {
  if (err) throw err;

  const isics = JSON.parse(data);

  for (const isic of isics) {
    // Remove "Detailed structure and explanatory notes"
    isic.name = isic.name.replace('Detailed structure and explanatory notes', '');

    // Remove "International Standard Industrial Classification of All Economic Activities (ISIC), Revision 4"
    isic.name = isic.name.replace('International Standard Industrial Classification of All Economic Activities (ISIC), Revision 4', '');

    // Remove "Section" and the text that follows
    const sectionIndex = isic.name.indexOf('Section');
    if (sectionIndex !== -1) {
      isic.name = isic.name.substring(0, sectionIndex);
    }

    // Split isic.name into isic.name and isic.description
    const newLineIndex = isic.name.indexOf('\n');
    if (newLineIndex !== -1) {
      isic.description = isic.name.substring(newLineIndex + 1);
      isic.name = isic.name.substring(0, newLineIndex);
    }
  }

  fs.writeFile('ISICS-improved.json', JSON.stringify(isics, null, 2), (err) => {
    if (err) throw err;
    console.log('The ISICS.json file has been improved and saved to ISICS-improved.json');
  });
});
