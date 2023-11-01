const fs = require('fs');

// Get current directory path
const currentDirectory = process.cwd();

// Read  contents of current directory
fs.readdir(currentDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log('Files and folders in the current directory:');
  files.forEach((file) => {
    console.log(file);
  });
})