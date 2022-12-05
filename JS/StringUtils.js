// @목차
// lineBreakBetweenLongText
// numberOfItemsInArray
// replaceAllInString
// sortJSONStringByPriceAscending

//========================================================================  
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
  },
  //========================================================================
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
  /*
  INPUT
  [{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]
  OUTPUT
  [{"name":"eggs","price":1},{"name":"rice","price":4.04},{"name":"coffee","price":9.99}]
  */
  const sortJSONStringByPriceAscending = (jsonString) => {
     const parsedJson =  JSON.parse(jsonString);

     parsedJson.sort(function(a, b) {
         let priceA = parseFloat(a.price);
         let priceB = parseFloat(b.price);
         if(priceA == priceB){ // sort by name
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
         }else{
            return priceA - priceB;
         }  
     });

     return JSON.stringify(parsedJson); 
  }

  console.log(sortJSONStringByPriceAscending('[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]'));
  //========================================================================
