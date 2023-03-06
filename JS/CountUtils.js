/**
 * Essential code snippets
 *
 * Count elements with reduce function
 * 
 * Count single element with reduce funciton
 */

// =================================================================
// Count elements with reduce function
const names = ['Paul', 'John', 'Paul', 'Steve', 'Harald', 'John', 'Paul'];

const countNames = names.reduce((names, name) => {
    names[name] = (names[name] || 0) + 1;
    return names;
}, {});
console.log(countNames); // {Paul: 3, John: 2, Steve: 1, Harald: 1}
// =================================================================
// Count single element with reduce funciton
const Occurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
console.log(Occurrences([1, 4, 5, 5, 1, 3], 1))  // 2
console.log(Occurrences([2, 5, 5, 6, 7, 6, 6], 6)) // 3
// =================================================================
