
//==============================================================================================================
// 입력시 조건에 따른 오늘의 날짜 고정해서 넣기 
// https://stackoverflow.com/questions/16089041/how-can-i-test-a-trigger-function-in-gas/16089067#16089067
function onEdit(e) {
   // FOR DEBUG
   /*
   var debug_e = {
    authMode:  e.authMode,  
    range:  e.range.getA1Notation(),    
    source:  e.source.getId(),
    user:  e.user,   
    value:  e.value,
    oldValue: e. oldValue
  }
  console.log(debug_e);
  */
  
  var sheet = e.source.getActiveSheet();

  if (e.range.getColumn() != 5) {
    return;
  }
  var inputCell = sheet.getRange(e.range.getRow(), e.range.getColumn()); // UTF-8 INPUT REQ. e.value is undefined
  var cell = sheet.getRange(e.range.getRow(), 4);
  //console.log('cell : ' + cell +e.range.getRow());
  // If the cell is checked, it gets the adjaecent cell in column D and sets its number formating to the format 11-Nov-2020
  //console.log('e.getValue '+ inputCell.getValue());

  if (inputCell.getValue() == "완료") {  
    cell.setNumberFormat("yyyy.mm.dd HH:mm:ss").setValue(new Date());
  }
  // If the cell is unchecked, it will clear the ajaecent cell in column D.
  else if (inputCell.getValue() != "완료") {
    //cell.clear();
  }
  //console.log('cellEND : ');
}
//==============================================================================================================
