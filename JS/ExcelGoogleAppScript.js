
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

// Project Management
// https://script.google.com/home/projects/1bPzMyvyhsYgVAy5BwcfVB9xDkAxIOu3OWfXztXksx_u6Z1enOyVwJG-E/edit
/*
Copyright (c) 2020, Evenbytes
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
* Neither the name of the <organization> nor the
names of its contributors may be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

//Version 2.02 Updated 15/OCT/2020

var LogSheetName = "LOG";
var MainTaskColumn = 3;
var TaskIdentifierColumn = 4;
var TaskDescriptionColumn = 5;
var userColumn = 10;
var userColumName;
var StatusColumn = 13;
var CreatedDateColumn = 14;
var CompletedDateColumn = 15;
var LastUpdatedColumn = 16;
var CreatedByColumn = 17;
var LastUpdatedByColumn = 18;
var NumberOfColumns = 18;
var NotificationTableRange = "A22:B30"
var NotificationTableValues;

var taskIdentifierColumnName;
var ConfigSheetName = "Config";

var TaskFolderIDRange = "B2";
var TaskFolderID = "";
var TemplateDocRange = "B3";
var TemplateDoc = "";
var ArchiveTaskAfterRange = "B4";
var ArchiveTaskAfter = "";
var InitStatusRange = "B5";
var InitStatus = "";
var ProductBacklogNameRange = "B6";
var ProductBacklogName = "";
var CompletedActionsRange = "B7";
var CompletedActions = "";
var LogActivatedRange = "B8";
var LogActivated = false;
var AcrchiveBacklogNameRange = "B9";
var AcrchiveBacklogName = "";
var NextTaskIDRange = "B10";
var NextTaskID = 0;

var NotifyTaskAssignmentRange = "B20";
var NotifyTaskAssignment = false;

var emailData;

var configSheet;
var activeSpreadsheet;
InitVariables_();

function InitVariables_(){
  
  activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ConfigSheetName); 
  //--------
  
  TaskFolderID = configSheet.getRange(TaskFolderIDRange).getValue();
  TemplateDoc = configSheet.getRange(TemplateDocRange).getValue();
  //CreationKeyword = configSheet.getRange(CreationKeywordRange).getValue();  
  InitStatus = configSheet.getRange(InitStatusRange).getValue();  
  NotifyTaskAssignment = configSheet.getRange(NotifyTaskAssignmentRange).getValue();
  ProductBacklogName = configSheet.getRange(ProductBacklogNameRange).getValue();
  AcrchiveBacklogName = configSheet.getRange(AcrchiveBacklogNameRange).getValue();
  ArchiveTaskAfter = configSheet.getRange(ArchiveTaskAfterRange).getValue();
  
  
  CompletedActions = configSheet.getRange(CompletedActionsRange).getValue().toString().split(',');  
  NotificationTableValues = configSheet.getRange(NotificationTableRange).getValues();  
  LogActivated = configSheet.getRange(LogActivatedRange).getValues();  
  
  userColumName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ProductBacklogName).getRange(1, userColumn, 1, 1).getValue();
  taskIdentifierColumnName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ProductBacklogName).getRange(1, TaskIdentifierColumn, 1, 1).getValue();  
}


function initSpreadsheetEditTrigger() {
  PropertiesService.getUserProperties().deleteProperty("userEmail");
  getUserEmail();  
}

function getNextID_(){
  NextTaskID = 1;
  NextTaskID = parseInt(configSheet.getRange(NextTaskIDRange).getValue());  
  configSheet.getRange(NextTaskIDRange).setValue(parseInt(NextTaskID + 1));
  return NextTaskID;
}

//Standard On Edit Event
function onEdit(e){
  
  if (activeSpreadsheet.getName() == ProductBacklogName){  
    for(var i = e.range.getRow(); i <= e.range.getLastRow(); i++){      
      //Check if new Line created      
      if(e.range.columnStart >= MainTaskColumn && e.range.columnEnd <= MainTaskColumn){        
        if(!e.hasOwnProperty("oldValue")){          
          activeSpreadsheet.getRange(i, 1, 1, 1).setValue(getNextID_());
          activeSpreadsheet.getRange(i, StatusColumn, 1, 1).setValue(InitStatus);    
          udpateCreationDate_(i);
          updateCreatedBy_(i);
          udpateLastUpdateDate_(i);
          updateLastUpdateBy_(i);  
          log("New task created in the system!", "ACTION");          
        }
      }
      
      if(e.range.columnStart >= MainTaskColumn && e.range.columnEnd <= StatusColumn){     
        udpateLastUpdateDate_(i);
        updateLastUpdateBy_(i);        
      }
      
      var currentStatus = activeSpreadsheet.getRange(i, StatusColumn, 1, 1).getValue();        
      if(CompletedActions.indexOf(currentStatus) != -1){          
        udpateCompletedDate_(i);
        updateLastUpdateBy_(i);          
        log("Task marked as completed with the status " + currentStatus, "ACTION");
      }
    }
  } 
}

function ExecuteBackgroundTasks(){
  
  try{
    reviewActionsforAllLines();   
  }
  catch(e){}
}


function CreateDetailedDocumentinActiveLine(){
  if (activeSpreadsheet.getName() == ProductBacklogName){
    
    var currentRow = SpreadsheetApp.getActiveRange().getRow();    
    var createDoc = true;
    
    if (activeSpreadsheet.getRange(currentRow, TaskDescriptionColumn, 1, 1).getValue() != ""){
      createDoc = SpreadsheetApp.getUi().alert("Existing desciption detected ✋", "Do you want to overwrite the description detected in line " + currentRow ,  SpreadsheetApp.getUi().ButtonSet.YES_NO) == SpreadsheetApp.getUi().Button.YES;
    }
    
    if (createDoc){
      
      var folder;          
      if (TaskFolderID == ""){
        folder = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getParents().next();    
      }
      else{            
        folder = DriveApp.getFolderById(TaskFolderID);            
      }          
      
      var filename = activeSpreadsheet.getRange(currentRow, TaskDescriptionColumn-1, 1, 1).getValue();          
      var file = DriveApp.getFileById(TemplateDoc).makeCopy(filename, folder);          
      activeSpreadsheet.getRange(currentRow, TaskDescriptionColumn, 1, 1).setValue("=Hyperlink(\"" + file.getUrl()  + "\";\"" + filename  + "\")");          
      log("Task Description Document created with the name " + filename, "ACTION");      
      
    }    
  }  
}

function ArchiveTaskLine(line){ 
  var destination = SpreadsheetApp.getActive().getSheetByName(AcrchiveBacklogName);  
  var source = SpreadsheetApp.getActive().getSheetByName(ProductBacklogName);  
  destination.appendRow(source.getRange(line, 1, 1, NumberOfColumns).getValues()[0]);
  source.deleteRow(line);
}

function udpateCreationDate_(line){
  SpreadsheetApp.getActiveSheet().getRange(line, CreatedDateColumn, 1, 1).setValue(new Date());
}

function udpateLastUpdateDate_(line){
  SpreadsheetApp.getActiveSheet().getRange(line, LastUpdatedColumn, 1, 1).setValue(new Date());
}

function udpateCompletedDate_(line){
  if (SpreadsheetApp.getActiveSheet().getRange(line, CompletedDateColumn, 1, 1).getValue() == "")
    SpreadsheetApp.getActiveSheet().getRange(line, CompletedDateColumn, 1, 1).setValue(new Date());
}

function updateCreatedBy_(line){
  SpreadsheetApp.getActiveSheet().getRange(line, CreatedByColumn, 1, 1).setValue(getUserEmail());
}

function updateLastUpdateBy_(line){
  SpreadsheetApp.getActiveSheet().getRange(line, LastUpdatedByColumn, 1, 1).setValue(getUserEmail());
}

function getPeopleToNotifyByStatus(status){  
  for(var i = 0; i < NotificationTableValues.length; i++)
    if (NotificationTableValues[i][0].toLowerCase() == status.toLowerCase())
    return NotificationTableValues[i][1];   
}

function VerifyAndSendNotificationForStatus(status, lineIndex){  
  try{
    
    if (getPeopleToNotifyByStatus(status).indexOf('@') > 0){
      loadEmailData(lineIndex);    
      var subject = SpreadsheetApp.getActiveSpreadsheet().getName() + " // " + emailData[taskIdentifierColumnName] + " // " + status;
      var htmlContent = HtmlService.createTemplateFromFile(status).evaluate().getContent();  
      GmailApp.sendEmail(getPeopleToNotifyByStatus(status), subject, '', {
        htmlBody: htmlContent
      });    
      log("Notification sent, Task in status " + status + " notified to " + getPeopleToNotifyByStatus(status), "ACTION");
    }
    
  }
  catch(e){
    log("Error trying to send the notification for the line " + lineIndex + " With the status " + status + ". Details: " + e.toString(), "ERROR");
  }
}

function SendTaskAssigned(lineIndex){   
  loadEmailData(lineIndex);  
  var subject = SpreadsheetApp.getActiveSpreadsheet().getName() + " // New Task for you: " + emailData[taskIdentifierColumnName];
  var htmlContent = HtmlService.createTemplateFromFile('taskassigned').evaluate().getContent();  
  if(emailData[userColumName]){
    GmailApp.sendEmail(emailData[userColumName], subject, '', {
      htmlBody: htmlContent
    });
    log("Notification sent, Task assigned to " + emailData[userColumName], "ACTION");
  }  
}

function loadEmailData(lineIndex){  
  emailData = {};
  var headerRow = SpreadsheetApp.getActiveSheet().getRange(1, 1, 1, NumberOfColumns).getValues();
  var dataRow = SpreadsheetApp.getActiveSheet().getRange(lineIndex, 1, 1, NumberOfColumns).getValues();  
  for (var i= 0; i <= headerRow[0].length; i++)    
    emailData[headerRow[0][i]] = dataRow[0][i];
  
  emailData["docLink"] = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  emailData["docName"] = SpreadsheetApp.getActiveSpreadsheet().getName();  
}

function getUserEmail() {
  var userEmail = PropertiesService.getUserProperties().getProperty("userEmail");
  if(!userEmail) {   
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt("Please enter your email");
    PropertiesService.getUserProperties().setProperty("userEmail",response.getResponseText());
    log("First Login by " + response.getResponseText(), "ACTION");
  }
  return userEmail;
}

function log(m,logLevel){
  if (LogActivated)
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LogSheetName).appendRow([new Date(),logLevel,getUserEmail(), m]);
}


function getGASStatus_(){
  var documentProperties = PropertiesService.getDocumentProperties();
  var installed = false;
  try{
    installed = documentProperties.getProperty("STATUSNAME");
  }
  catch(e){
    //Logger.log(e);
  }
  
  if (installed == null)
    return false;
  
  return (installed.toLowerCase() == "true");  
}

function installGAS_(){ 
  
  var email = getUserEmail();
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('ExecuteBackgroundTasks').timeBased().everyMinutes(15).create();
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty("STATUSNAME", "true");
  documentProperties.setProperty("INSTALLEDUSERNAME", email);
  SpreadsheetApp.getUi().alert("Script installed successfully 😄", "Refresh to see menu changes", SpreadsheetApp.getUi().ButtonSet.OK);
  
}

function uninstallGAS_(){ 
  
  var documentProperties = PropertiesService.getDocumentProperties();    
  if ((getUserEmail() == documentProperties.getProperty("INSTALLEDUSERNAME")) || (documentProperties.getProperty("INSTALLEDUSERNAME") == null)) {
    
    for(var i = 0; i < ScriptApp.getProjectTriggers().length; i++){
      if (ScriptApp.getProjectTriggers()[i].getHandlerFunction() == "ExecuteBackgroundTasks"){
        ScriptApp.deleteTrigger(ScriptApp.getProjectTriggers()[i]);
      }
    } 
    
    documentProperties.setProperty("STATUSNAME", "false");    
    SpreadsheetApp.getUi().alert("Scrum script removed 😢", "Refresh to see menu changes", SpreadsheetApp.getUi().ButtonSet.OK);   
    
  }
  else{
    SpreadsheetApp.getUi().alert("Please contact with " + documentProperties.getProperty("INSTALLEDUSERNAME") + " to unistall the script"); 
  }  
}


function onOpen(e) {  
  var  menu = SpreadsheetApp.getUi().createMenu("TASKS");  
  if (getGASStatus_()){    
    menu.addItem("📝 Create task description in active line...", "CreateDetailedDocumentinActiveLine").addToUi();
    menu.addSeparator();
    menu.addItem("⚠️ Uninstall Script (" + PropertiesService.getDocumentProperties().getProperty("INSTALLEDUSERNAME") + ")", "uninstallGAS_").addToUi();
    
  }
  else{
    menu.addItem("✔️ Activation Required - Installation", "installGAS_").addToUi(); 
  }
  
  menu.addSeparator();
  menu.addItem("Reset your email (" + PropertiesService.getUserProperties().getProperty("userEmail") + ")", "initSpreadsheetEditTrigger").addToUi(); 
  
}

var date_diff_indays = function(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}


function reviewActionsforAllLines(){
  
  var source = SpreadsheetApp.getActive().getSheetByName(ProductBacklogName);
  var taskList = source.getDataRange().getValues();
  
  for(var i = taskList.length - 1; i > 0; i--){   
    
    //Review line notifications Changes in the status
    if (source.getRange(i+1, StatusColumn,1,1).getNote() != taskList[i][StatusColumn-1]){
      
      //Check if we need to do any notification here!!    
      if ((InitStatus.indexOf(taskList[i][StatusColumn-1]) > -1) && TaskDescriptionColumn){
        SendTaskAssigned(i+1);        
      }
      
      VerifyAndSendNotificationForStatus(taskList[i][StatusColumn-1], i+1);
      source.getRange(i+1, StatusColumn,1,1).setNote(taskList[i][StatusColumn-1]);      
    }
    
    //Review if line is done and need to be archived
    if (CompletedActions.indexOf(taskList[i][StatusColumn-1]) > -1){ 
      var days = date_diff_indays(new Date(taskList[i][CompletedDateColumn-1]),new Date())    
      if (days > ArchiveTaskAfter){
        log("Archive Line " + (i + 1) + " Days " + days, "ACTION");
        ArchiveTaskLine(i + 1);
      }      
    }   
  }   
}

////////////////////////////////////////////////////////////
// Developed by Evenbytes 2020
///////////////////////////////////////////////////////////
