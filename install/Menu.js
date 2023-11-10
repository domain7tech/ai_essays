///Menu
///When you first start, run the List Folder Contents in the menu to save time setting up
//your properties

function onOpen() {
  var ui = SpreadsheetApp.getUi(); // Get the user interface object to add a custom menu
  // Creates a custom menu with the name 'Folder Data'
  ui.createMenu('Folder Data')
      .addItem('Clear IDs', 'clearSheet') // Adds an item to the custom menu
      .addItem('List Folder Contents', 'listFolderContents') // Adds another item to the custom menu
      .addItem('Run the AI on the most Recent Submission', 'OpenAI') 
      .addToUi(); // Adds the custom menu to the UI
}


///

function listFolderContents() {
  var myFolderID = getMyFolderID();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('IDs'); // Replace with your actual sheet name
  
  
  var folder = DriveApp.getFolderById(myFolderID);
  var contents = folder.getFiles();
  var fileArray = [];
  
  while (contents.hasNext()) {
    var file = contents.next();
    fileArray.push([file.getName(), file.getId()]);
  }
  
  // Write to the sheet starting at row 2, column 1 (A2)
  sheet.getRange(2, 1, fileArray.length, 2).setValues(fileArray);
}
function clearSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('IDs'); // Replace 'YourHardcodedSheetName' with your actual sheet name
  // Assuming that row 1 contains headers and you do not wish to clear them
  sheet.getRange('A2:B' + sheet.getLastRow()).clearContent();
}
