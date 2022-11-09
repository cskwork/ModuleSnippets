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
