/**
 * Validation Check : 
 *
 * Check if Valid Json
 * 
 * Check For Palindrom
 * 
 * Check if number is Power of Two
 * 
 */

// =================================================================
// Check Null 
const checkNull = val => val === undefined || val === null;
checkNull() // true
checkNull(835) // false
checkNull("JavaScript") // false
// =================================================================
// Check if Valid Json
const isValidJson = (str) =>{
  try{
    JSON.parse(str);
    return true;
  }catch(e){
    return false;
  }
}
isValidJSON('{"firstname":"Paul","surname":"Knulst"}'); // true
isValidJSON('{"firstname":"Paul",surname:"Knulst"}');   // false
isValidJSON(null); // true
// =================================================================
// Check For Palindrome
const isPalindrome = (str) => str === str.split('').reverse().join('');

isPalindrome('rotator');    // true
isPalindrome('kayak');      // true
isPalindrome('twitter');    // false
// =================================================================
// Check if number is Power of Two
const isNumberPowerOfTwo = (number) => !!number && (number & (number - 1)) === 0;

isNumberPowerOfTwo(100); // false
isNumberPowerOfTwo(128); // false
