
//==============================================================================================================
// 입력시 조건에 따른 오늘의 날짜 고정해서 넣기 
// https://stackoverflow.com/questions/16089041/how-can-i-test-a-trigger-function-in-gas/16089067#16089067
function onEdit(e) {
  const checkConditionColumnNumber = 6;
  const setAutoDateColumnNumber = 5;
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
  if (e.range.getColumn() != checkConditionColumnNumber) {
    return;
  }
  var inputCell = sheet.getRange(e.range.getRow(), e.range.getColumn()); // UTF-8 INPUT REQ. e.value is undefined
  var cell = sheet.getRange(e.range.getRow(), setAutoDateColumnNumber);
  
  if (inputCell.getValue() == "완료") {  
    let timeZone = Utilities.formatDate(new Date(), Session.getScriptTimeZone() , "yyyy.MM.dd HH:mm:ss");
    // Logger.log(timeZone);
    cell.setNumberFormat("yyyy.mm.dd HH:mm:ss").setValue(timeZone); 
  }
  // If the cell is unchecked, it will clear the ajaecent cell in column D.
  else if (inputCell.getValue() != "완료" && inputCell.getValue() != "종료") {
     cell.clear();
  }
  //console.log('cellEND : ');
}
//==============================================================================================================
