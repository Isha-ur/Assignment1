function segregateEvenOdd(arr) {
    var left = 0, right = arr.length - 1;

    while (left < right) {
        while (arr[left] % 2 == 0 && left < right)
            left++;

        while (arr[right] % 2 == 1 && left < right)
            right--;

        if (left < right) {
            var temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}

function removeDuplicates(arr) {
    var uniqueArr = arr.filter(function(item, index, self) {
        console.log(item);
        console.log(index);
        console.log(self);
        console.log(self.indexOf(item) === index)
        return self.indexOf(item) === index;
    });
    return uniqueArr;
}

var arr = [12, 34, 45, 9, 8, 90, 3, 12, 34, 8];

console.log(`orignal arr: ${arr}`);
arr = removeDuplicates(arr);
segregateEvenOdd(arr);


console.log("Array after segregation and removing duplicate:");
console.log(arr.join(" "));