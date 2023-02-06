const fs = require("fs");

fs.readFile("ISICS.json", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const ISICS = JSON.parse(data);

  let hasIncorrectDetection = false;
  for (let i = 0; i < ISICS.length - 1; i++) {
    const currentCode = ISICS[i].code;
    const nextCode = ISICS[i + 1].code;
    if (!nextCode.startsWith(currentCode)) {
      console.error(
        `Incorrect detection of start of code section: current code ${currentCode} but next code is ${nextCode}`
      );
      hasIncorrectDetection = true;
    }
  }

  if (!hasIncorrectDetection) {
    console.log("No incorrect detection of start of code section found.");
  }
});