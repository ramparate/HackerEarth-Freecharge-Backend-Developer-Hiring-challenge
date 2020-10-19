let selectionSort = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    // console.log(i)
      let min = i;
      for (let j = i + 1; j < len; j++) {
          if (arr[min] > arr[j]) {
              min = j;
          }
      }
      // console.log(min)
      if (min !== i) {
          let tmp = arr[i];
          arr[i] = arr[min];
          arr[min] = tmp;
          console.log( arr[min])
      }
  }
  console.log(arr)
  return arr;
}
arr= [64 ,25,12,22,11]

// Find the minimum element in arr[0...4]
// and place it at beginning
// 11 25 12 22 64

// Find the minimum element in arr[1...4]
// and place it at beginning of arr[1...4]
// 11 12 25 22 64

// Find the minimum element in arr[2...4]
// and place it at beginning of arr[2...4]
// 11 12 22 25 64

// Find the minimum element in arr[3...4]
// and place it at beginning of arr[3...4]
// 11 12 22 25 64 
var rainbow =[64 ,25,12,22,11]
selectionSort(rainbow)

// The Selection Sort algorithm sorts maintains two parts.

// First part that is already sorted
// Second part that is yet to be sorted.
// The algorithm works by repeatedly finding the minimum e
// element (considering ascending order) from unsorted part and putting it at the end of sorted part.
function selectionSortRecursive(arr) {

  var swap = function(x, y) {
      var temp = arr[y];
      arr[y] = arr[x];
      arr[x] = temp;
  }

  var sort = function(start) {
      if (start === arr.length) {
          return arr;
      }

      var min = start;

      for (var i = start + 1; i < arr.length; i++) {
          if (arr[i] < arr[min]) {
              min = i;
          }
      }

      swap(start, min);

      return sort(start + 1);
  }

  return sort(0);
}
var rainbow =[64 ,25,12,22,11]
var temp=selectionSortRecursive(rainbow);
console.log(">>>>>>>>>>>>>>>>",temp);
/**
 * Finds smallest element of an aray
 * @param {Array} arr array for searching
 * @return {number} index of the smallest element in array
 */
// const findSmallestIndex = ( arr ) => {
//   let smallest = arr[0];
//   let smallestIndex = 0;
//   let arrLen = arr.length;

//   for ( let i = 0; i < arrLen; i++ ) {
//       if ( arr[i] < smallest ) {
//           smallest = arr[i];
//           smallestIndex = i;
//       }
//   }
//   return smallestIndex;
// };

/**
* Sorts recursively an array of numbers
* @param {Array} arr An array of numbers
* @return {Array} New sorted array
*/
// const selectionSort = ( arr ) => {
//   if ( !arr.length ) return [];
//   let newArray = Array.prototype.slice.call( arr );
//   let smallest = arr.splice( findSmallestIndex( arr ), 1 );
//   return smallest.concat( selectionSort( arr ) );
// };

// let arr = [23, 43, 23423, 66, 5, 57, 78, 0, 1];

// console.log( selectionSort(arr) );