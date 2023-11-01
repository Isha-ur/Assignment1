const fs = require('fs');

//count words 
function countWords(text) {
  const words = text.split(/\s+/);
  return words.length;
}

//count lines 
function countLines(text) {
  const lines = text.split('\n');
  return lines.length;
}

fs.readFile('input2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  const wordCount = countWords(data);
  const lineCount = countLines(data);
  const size = data.length;

  
  const outputData = `Word Count: ${wordCount}\nLine Count: ${lineCount}\nTotal Size: ${size} bytes`;

  //print output
  console.log(outputData);
  
  // Write the output in new file
  fs.writeFile('output2.txt', outputData, (err) => {
    if (err) {
      console.error('Error writing output file:', err);
    } else {
      console.log('Counted values is write to output file');
    }
  });
});
