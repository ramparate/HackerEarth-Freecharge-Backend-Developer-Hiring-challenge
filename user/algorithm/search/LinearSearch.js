function linearSearch(arr, elToFind) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i] == elToFind) {
      return i;
    }
  } return null;
}
var rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
linearSearch(rainbow, "green"); // returns 3
linearSearch(rainbow, "white"); //