const fs = require("fs");

// Read the contents of ISIC-improved.json
fs.readFile("ISICs-improved.json", "utf8", function (err, data) {
    if (err) throw err;
    const ISICs = JSON.parse(data);

    // Split the description into description, includes, and excludes
    for (let i = 0; i < ISICs.length; i++) {
        let description = ISICs[i].description;
        if (!description) continue
        let includes = "";
        let excludes = "";

        const includesRegex = /(This\s)?(class\s)?(also\s)?includes\:?\s([\s\S]+)/i;
        const excludesRegex = /(This\s)?(class\s)?(also\s)?excludes\:?\s([\s\S]+)/i;

        const includesMatch = description.match(includesRegex);

        if (includesMatch) {
            includes = includesMatch[4];
            description = description.replace(includesMatch[4], "");
            const excludesMatch = includes.match(excludesRegex);
            if (excludesMatch) {
                excludes = excludesMatch[4];
                includes = includes.replace(excludesMatch[4], "");
            }
        } else {
            const excludesMatch = description.match(excludesRegex);
            if (excludesMatch) {
                excludes = excludesMatch[4];
                description = description.replace(excludesMatch[4], "");
            }
        }

        ISICs[i].description = description.trim();
        ISICs[i].includes = includes.trim();
        ISICs[i].excludes = excludes.trim();
    }

    // Write the improved JSON to a new file
    fs.writeFile("ISICs-improved2.json", JSON.stringify(ISICs, null, 2), function (err) {
        if (err) throw err;
        console.log("The file has been saved!");
    });
});