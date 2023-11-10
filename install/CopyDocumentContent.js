//These functions update the program when you change your prompts.
//You should not need to make any changes

function copyDocsContentsToArray() {
  var myFolderID = getMyFolderID();


  var folderId = myFolderID; // Replace with your folder ID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var docsContent = [];
  
  while (files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    
    
    // Check if the file name matches any of the documents
    if (fileName === 'Prompt1' || fileName === 'Prompt2' || fileName === 'Prompt3') {
      var doc = DocumentApp.openById(file.getId());
      var body = doc.getBody();
      var text = body.getText();
      docsContent.push(text);
    }
  }
  
  // Log the array to verify its contents
  //Logger.log(docsContent);
  
  return docsContent; // This array contains the contents of the documents
}


//Loads Control statement

function setAISystemRole() {
  var myFolderID = getDocumentControlID();

  var myControl = ''; // Initialize the variable
  var docId = myFolderID; // Replace with your actual document ID

  try {
    var doc = DocumentApp.openById(docId);
    var body = doc.getBody();
    myControl = body.getText();

    // Log the variable to view in the Apps Script console
    //Logger.log(myControl);
  } catch (e) {
    // Log the error message if the document cannot be found or another error occurs
    Logger.log('Error: ' + e.toString());
  }

  // Return the text content of the document
  return myControl;
}


