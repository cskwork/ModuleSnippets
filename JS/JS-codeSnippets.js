/**
 * Essential code snippets
 *
 * Sorting an array
 * Making API calls using the fetch() method
 * Find the Maximum using a Conditional (ternary) Operator
 * Creating a New Array using the Existing Array/List
 * Creating a New Array after Filtering the Existing Array
 * Find an Element based on Specific Conditions
 * Find the Index of an Element based on Specific Conditions
 * Sum of All Elements in an Array
 * Remove the First Element from the Array
 *
 */

// =================================================================
// Sorting an array
const numbers = [102, -1, 2];
numbers.sort((a, b) => a - b);
console.log(numbers);
// [ -1, 2, 102 ]
// =================================================================

// =================================================================
// Making API calls using the fetch() method
const fetchAPI = async (URL) => {
  const response = await fetch(URL);

  const data = await response.json();

  console.log(data);
};
fetchAPI("https://jsonplaceholder.typicode.com/todos/1");
// =================================================================

// =================================================================
// Find the Maximum using a Conditional (ternary) Operator
num1 = 10;
num2 = 20;

const maxi = num1 > num2 ? num1 : num2;

console.log(maxi);
// 20
// =================================================================

// =================================================================
// Creating a New Array using the Existing Array/List
var fruits = ["apple", "mango", "watermelon", "orange"];

var fruits_len = fruits.map((ele) => ele.length);

console.log(fruits_len);
// [ 5, 5, 11, 6 ]
// =================================================================

// =================================================================
// Creating a New Array after Filtering the Existing Array
var fruits = ["apple", "mango", "watermelon", "orange"];

var even_fruits = fruits.filter((ele) => ele.length % 2 !== 0);

console.log(even_fruits);
// [ 'apple', 'mango', 'watermelon' ]
// =================================================================

// =================================================================
// Find an Element based on Specific Conditions
var fruits = ["apple", "mango", "watermelon", "orange"];

var data = fruits.find(
  (element) => element.length > 6 && element.length % 2 !== 0
);

console.log(data);
// watermelon
// =================================================================

// =================================================================
// Find the Index of an Element based on Specific Conditions
var fruits = ["apple", "mango", "watermelon", "orange"];

var data = fruits.findIndex(
  (element) => element.length > 6 && element.length % 2 !== 0
);

console.log(data);
// 2
// =================================================================

// =================================================================
//  Sum of All Elements in an Array
var numbersAll = [1, 2, 3, 4, 5];

var initial_value = 0;

var total = numbersAll.reduce(
  (accumulator, current_value) => accumulator + current_value,
  initial_value
);

console.log(total);
// 15
// =================================================================

// =================================================================
//   Remove the First Element from the Array
var numbersBeforeRemoval = [1, 2, 3, 4, 5];

var delete_value = numbersBeforeRemoval.shift();

console.log(`${delete_value} is deleted from the array`);

console.log("updated array: ", numbersBeforeRemoval);
// 1 is deleted from the array
// updated array:  [ 2, 3, 4, 5 ]
// =================================================================

/**
 * https://www.geeksforgeeks.org/javascript-code-snippets-that-every-developer-must-know/
 *
 */
