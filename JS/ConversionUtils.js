/**
 * Essential code snippets
 *
 * Convert any number to digit
 * 
 * Stringify every object
 * 
 * Convert to Array
 *
 */

// =================================================================
// Convert any number to digit
const convertNrToDigitArray = (number) =>
    [...`${number}`].map((el) => parseInt(el));

convertNrToDigitArray(1234);        // [1, 2, 3, 4]
convertNrToDigitArray(23658126);    // [2, 3, 6, 5, 8, 1, 2, 6]
// =================================================================
// Stringify every object
const stringify = (obj) => {
    for (let [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }
};

const obj = {
    firstname: 'MY',
    surname: 'NAME',
};

stringify(obj);

// will produce:
// firstname: MY
// surname: NAME
// =================================================================
// Convert to Array
const ConvertToArray = val => (Array.isArray(val) ? val : [val]);
console.log(ConvertToArray("JavaScript")) // [JavaScript]
console.log(ConvertToArray(1000)) // [1000]
console.log(ConvertToArray(true)) // [true]
//================================================================
// Number <-> String
// converting string to number
let string2 = "903"
let num = Number(string2)
// converting number to string
let num2 = 49
let string1 = num2.toString();
//================================================================