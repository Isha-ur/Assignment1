var arr = [1,1,1,1,1,1];

let firstSmallest = 1e8;
let secondSmallest = 1e8;

// Check arr has at least two digit 
if(arr.length<2)
{
    console.log(`lenght is less than two`);
}

for(let i=0; i<arr.length; i++)
{
    
    if(arr[i]<firstSmallest)
    {
        secondSmallest = firstSmallest;
        firstSmallest = arr[i];
    }
    else if(arr[i]<secondSmallest && arr[i]!=firstSmallest)
    {
        secondSmallest = arr[i];
    }
}

if(secondSmallest == 1e8)
{
    secondSmallest = "second smallest No. not exist";
}
console.log(`first smallest No. :- ${firstSmallest}\n Second smallest No. :- ${secondSmallest}`);