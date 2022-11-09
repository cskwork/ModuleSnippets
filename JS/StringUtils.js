/*
INPUT
a,b,c,d,e
OUTPUT
a,b,c
d,e
*/
  lineBreakBetweenLongText: (idString, lineBreakNumber)=>{
      let idList = idString.split(',');
      let newIdString = '';
      for (var i = idList.length - 1; i >= 0; i--) {
          newIdString+=idList[i];
                    
      }
  },
