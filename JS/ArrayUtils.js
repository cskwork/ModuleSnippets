/**
 * Essential code snippets
 *
 * Remove Duplicates from List
 * 
 * Merge Arrays
 *
 */

// =================================================================
// Remove Duplicates from List
const RemoveDupli = arr => [...new Set(arr)];
console.log(RemoveDupli([2, 2, 2, 5, 1, 0, 2])) // [2,5,1,0]
console.log(RemoveDupli([9, 6, 7, 8, 8, 6]))  // [9,6,7,8]
// =================================================================
// Merge Arrays
const lang1 = ["JavaScript", "Python", "C++"];
const lang2 = ["C#", "Dart", "Java"];
const merge = [...lang1, ...lang2];
console.log(merge); // [""JavaScript", "Python", "C++", "C#", "Dart", "Java"]
// =================================================================