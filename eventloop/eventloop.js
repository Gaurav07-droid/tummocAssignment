const fs = require("fs");

// Define an array of file paths to process
const filesToProcess = [
  "eventloop/file1.txt",
  "eventloop/file2.txt",
  "eventloop/file3.txt",
];

//  function to process a single file
function processFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(`Processing ${filePath}: ${data}`);
  });
}

// function to process all files in the array
function processAllFiles() {
  filesToProcess.forEach((filePath) => {
    processFile(filePath);
  });
}

//will be executed first in the event loop
console.log("fourth file");

// Use setImmediate to call processAllFiles asynchronously in the event loop
setImmediate(() => {
  console.log("Starting file processing...");
  processAllFiles();
  console.log("File processing complete!");
});
