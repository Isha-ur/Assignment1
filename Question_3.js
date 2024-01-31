function interchangeFirstAndLastDigit(input) 
{
  
    const numberStr = input.toString();
    if (numberStr.length < 2) {
      console.log("The number must have at least two digits to interchange.");
      return;
    }

    const firstDigit = numberStr[0];
    const lastDigit = numberStr[numberStr.length - 1];

    //  swap first and last digit
    const newNumberStr = lastDigit + numberStr.substring(1, numberStr.length - 1) + firstDigit;
    
    const newNumber = parseInt(newNumberStr, 10);
    
    return newNumber;

  }
  
  
  var input = 12345;

  // calling function
  var newNumber = interchangeFirstAndLastDigit(input);
  
  // print output
  console.log(`Original Number:-  ${input}`);
  console.log(`New Number:-  ${newNumber}`);
  