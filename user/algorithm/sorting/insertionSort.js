// The iteration starts at the second element. We consider the first
//  element sorted by default. For each iteration,
//   we keep track of the current element.
//    Each current element will be the first element 
//    of the unsorted array - and each element before it will belong to the sorted array.

// Through a while loop, we go through the sorted array 
// and shift elements to the right, opening up a space for the current element to be inserted.

// 12, 11, 13, 5, 6

// Let us loop for i = 1 (second element of the array) to 4 (last element of the array)

// i = 1. Since 11 is smaller than 12, move 12 and insert 11 before 12
// 11, 12, 13, 5, 6

// i = 2. 13 will remain at its position as all elements in A[0..I-1] are smaller than 13
// 11, 12, 13, 5, 6

// i = 3. 5 will move to the beginning and all other elements from 11 to 13 will move one position ahead of their current position.
// 5, 11, 12, 13, 6

// i = 4. 6 will move to position after 5, and elements from 11 to 13 will move one position ahead of their current position.
// 5, 6, 11, 12, 13

function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                console.log("######>>>>",inputArr[j]);
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
  }
let array=[12, 11, 13, 5, 6];
let out=insertionSort(array)

let recursiveInsertionSort = (arr, i = arr.length) => {
    //if index is less than 1 then return
    if(i <= 1){
      return;
    }
    //Recursively call the same function
    recursiveInsertionSort(arr, i - 1);  
    let key = arr[i - 1];
    let j = i - 2;
    //Sort the array
    while(j >= 0 && arr[j] > key){
      arr[j + 1] = arr[j];
      j--;
    }
  
    arr[j + 1] = key; 
    return arr;
}
  
let array1=[12, 11, 13, 5, 6];
let out1=recursiveInsertionSort(array1,array1.length)
console.log(out1);