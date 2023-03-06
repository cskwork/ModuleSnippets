// @목차

// line Break Between LongText

// number Of Items In Array

// replace All In String

// Reverse string

//========================================================================  
// line Break Between LongText
/*
INPUT
  a,b,c,d,e
OUTPUT
  a,b,c
  d,e
*/
const lineBreakBetweenLongText = (idString, lineBreakNumber) => {
    let idList = idString.split(',');
    let newIdString = '';
    for (var i = idList.length - 1; i >= 0; i--) {
        newIdString+=idList[i];
                  
    }
};
//========================================================================
// number Of Items In Array
/*
INPUT
  var arr = [
    25,
    "apple",
    ["banana", "strawberry", "apple", 25]
  ];
OUTPUT
2
*/
const numberOfItemsInArray = (arr, itemName ) => {
  console.time('flat');
  let count = 0;

  flatDeep(arr, 10).forEach( eachItem =>{
    if( eachItem === itemName ){
      count++;
    }
  });
  // OR arr.flat(10)
  console.timeEnd('flat');
  return count;
}

const flatDeep = (arr, depth = 1) => {
  return depth > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, depth - 1) : val), [])
      : arr.slice();
};
//========================================================================
// replace All In String
/*
INPUT
'ab,###asf'
OUTPUT
"ab,asf"
*/
const replaceAllInString = (input, asIsChar, toBeChar) => {
  const regExp = new RegExp(asIsChar, 'g'); // = /a/g;
  return input.replace(regExp, toBeChar);
};
console.log(replaceAllInString('ab,###asf', '#', ''));
//========================================================================
// Reverse string
const ReverseString = str => [...str].reverse().join('');
console.log(ReverseString("JavaScript"))  // tpircSavaJ
//========================================================================
// Trim whitespaces in string 
var str = " a b    c  d   e   f g   hi j ";
var newStr = str.replace(/\s+/g, '');
console.log(newStr)
//========================================================================