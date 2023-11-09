function copyDocsContentsToArray() {
  var folderId = '1uTnAuzEj3cH0AToRgiSGTFJ1sI9IrI96'; // Replace with your folder ID
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
  Logger.log(docsContent);
  
  return docsContent; // This array contains the contents of the documents
}
