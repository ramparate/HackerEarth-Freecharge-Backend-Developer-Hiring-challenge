let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  for (let i = 0; i < len; i++) {
    console.log(i);
      for (let j = 0; j < len; j++) {
          if (inputArr[j] > inputArr[j + 1]) {
            console.log("###>>",inputArr[j])
              let tmp = inputArr[j];
              inputArr[j] = inputArr[j + 1];
              inputArr[j + 1] = tmp;
          }
      }
  }
  return inputArr;
};
function bubble_Sort(a) {
  var swapp;
  var n = a.length - 1;
  var x = a;
  do {
    swapp = false;
    for (var i = 0; i < n; i++) {
      if (x[i] > x[i + 1]) {
        var temp = x[i];
        x[i] = x[i + 1];
        x[i + 1] = temp;
        swapp = true;
      }
    }
    n--;
  } while (swapp);
  return x;
}
// The idea behind bubble sort is that every pair of adjacent values is compared, and then the two values swap positions if the first value is greater than the second. This way during each pass through the array, the largest value “bubbles up” to the top, and after each pass the elements furthest to the right are in the correct order. Here’s an example: given the array [5,3,1,4,6] we can use bubble sort to sort the array in ascending order. It’ll start by comparing the first pair of values, 5 & 3. 3 is smaller than 5, so it’ll swap the two values and then move on to compare the next pair of values, 5 & 1. It’ll continue doing this over and over until the array is sorted:
// Iteration 1: [5,3,1,4,6] → [3,5,1,4,6] → [3,1,5,4,6] → [3,1,4,5,6] → [3,1,4,5,6]
// Iteration 2: [3,1,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6]
// Iteration 3: [1,3,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6] → [1,3,4,5,6]
var rainbow =[5,3,1,4,6];
let output=bubbleSort(rainbow);
console.log(">>>>>>>>>>>>>>>",output);
var rainbow1 =[5,3,1,4,6];
let output1=bubble_Sort(rainbow1);
console.log(">>>>>>>>>>>>>>>",output1);
// Recursion Idea.  

// Base Case: If array size is 1, return.
// Do One Pass of normal Bubble Sort. This pass fixes last element of current subarray.
// Recur for all elements except last of current subarray.
//Recursive Bubble Sort
let recursiveBubbleSort = (arr, n = arr.length) => {
  //If there is only single element 
  //the return the array
  if(n == 1){
    return arr;
  }
  
  //Swap the elements by comparing them
  for(let j = 0; j < n - 1; j++){
    if(arr[j] > arr[j + 1]){
      [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
    }
  }
  
  //Recursively call the function to sort.
  return recursiveBubbleSort(arr, n-1);
}
var rainbow3 =[5,3,1,4,6];

let output3=recursiveBubbleSort(rainbow3);
console.log(">>>>>>>>>>>>>>>",output3);