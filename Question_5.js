function capitalizeCharacter(inputString, charToCapitalize) {
    let result = '';
  
    for (let i = 0; i < inputString.length; i++) {
      if (inputString[i] === charToCapitalize) {
        result += charToCapitalize.toUpperCase();
      } else {
        result += inputString[i];
      }
    }
  
    return result;
  }
  

  const inputString = "Hello, world! This is a sample string.";
  const charToCapitalize = 'a';
  const capitalizedString = capitalizeCharacter(inputString, charToCapitalize);
  console.log(capitalizedString);
  