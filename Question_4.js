function countBit(number) 
{

    if (number === 0) {
      return 1; 
    }
  
    let bitCount = 0;
    while (number) { 
      bitCount++;
      number = Math.floor(number / 2);
    }
  
    return bitCount;
  }
  
  
  var number = 10; 
  // calling function
  var bitsRequired = countBit(number);

  // print bitsRequired
  console.log(`Number ${number} requires ${bitsRequired} bits in its binary representation.`);
  