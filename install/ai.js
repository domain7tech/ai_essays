//This script only needs editing if you want add more prompts
//or change the email subject line
var mySheetID = getMySheetID();
var mySheetTabName = getMySheetTabName();
var theStop = 0;


function readEssayData() {
  // Open the Spreadsheet
  copyDocsContentsToArray();//Ensure most recent data is being used from Prompts
  setAISystemRole();//Ensure most recent data is being used from the Control

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
 
  var sheet = ss.getSheetByName(mySheetTabName);
  
  // Get the last row and column in the sheet to know the range of data
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  
  // Read only the last row of data into a 1D array
  var lastRowData = sheet.getRange(lastRow, 1, 1, lastCol).getValues()[0];
  
  // Log the data to Google Apps Script logger for debugging purposes
  //Logger.log(lastRowData);

  return lastRowData;
}


/////Start OpenAI Process

function OpenAI() {


// Replace these with the actual IDs of your documents
var prompt1Id = Prompt1ID();
var prompt2Id = Prompt2ID();
var prompt3Id = Prompt3ID();

// Retrieve and store the contents of each document in a variable
var prompt1Text = DocumentApp.openById(prompt1Id).getBody().getText();
var prompt2Text = DocumentApp.openById(prompt2Id).getBody().getText();
var prompt3Text = DocumentApp.openById(prompt3Id).getBody().getText();


// Initialize position variable
var position;

var prompt_spreadsheet = SpreadsheetApp.openById(mySheetID);
// Access the specific sheet
var prompt_sheet = prompt_spreadsheet.getSheetByName(mySheetTabName);

// Determine the last row with content
var prompt_lastRow = prompt_sheet.getLastRow();

// Get the value from the last row of column G
var prompt_lastValueInG = prompt_sheet.getRange(prompt_lastRow, 7).getValue();
//Logger.log("Last value in Column G: '" + prompt_lastValueInG + "'");

// Check the value in column G and set the position accordingly
if (prompt_lastValueInG.trim() === Qtype1ID()) {
  position = prompt1Text;
} else if (prompt_lastValueInG.trim() === Qtype2ID()) {
  position = prompt2Text;
} else if (prompt_lastValueInG.trim() === Qtype3ID()) {
  position = prompt3Text;
}

Logger.log("Selected Prompt: " + position); // Log the selected prompt

var lastSubmissionData = readEssayData();
var myData = JSON.stringify(lastSubmissionData);

const myAITemp = getAITemp();
const myAIModel = getAIModel();
const myAITokens = getAITokens();
const myPropValue = myKey();


// Combine the selected prompt with the last submission data
//You can adjust the mode, temperature, and maxTokens

var prompt = position + "\n" + myData;
var model = myAIModel;
var temperature = myAITemp;
var maxTokens = myAITokens;
var apiKey = myPropValue;
var nextForm = false; // Initialize nextForm as false
var theControl = setAISystemRole();

// Set up the request body with the given parameters
//You can adjust the model, temp, and maxTokens in the script properies
//Temp is from .1-.9 but in the settings use whole numbers 1-9

var requestBody = {
  "model": model,
  "temperature": temperature,
  "max_tokens": maxTokens,
  "messages": [
    {
      "role": "system",
      "content": theControl
    },
    {"role": "user", "content": prompt}
  ]
};

var requestOptions = {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  },
  "payload": JSON.stringify(requestBody)
};

try {
  // Call the OpenAI API
  var response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);

  // Check for success response status code
   if (response.getResponseCode() === 200) {
    // Set nextForm to true since the response was successful
    nextForm = true;

    var jsonResponse = JSON.parse(response.getContentText());

    // Extract the model's response
    var modelResponse = jsonResponse['choices'][0]['message']['content'];

    // Log the model's response
   
    Logger.log(modelResponse);
    // Process the modelResponse as needed
  } else {
    // Handle non-success response
    Logger.log('Error: ' + response.getResponseCode());
  }
} catch (e) {
  // Handle any exceptions that occur during the fetch call
     Logger.log('Exception: ' + e.toString());
}

//Logger.log(nextForm);

if (nextForm) {
 
  // Perform actions here when nextForm is true.
  // Use MailApp to send the email
  // Fetch the spreadsheet by its ID or URL


var spreadsheet = SpreadsheetApp.openById(mySheetID);
// Access the specific sheet
var sheet = spreadsheet.getSheetByName(mySheetTabName);
// Get the values in the third column (C), fifth column (E), and sixth column (F)


if (!sheet) {
  Logger.log('Error: Sheet not found.');
} else {
  // This is pulling in all the email addresses and finding the last row with data
  var lastRow = sheet.getLastRow();
  
  // Fetch the values in the last row for columns C, E, and F
  var rangeC = sheet.getRange('C' + lastRow);
  var rangeE = sheet.getRange('E' + lastRow);
  var rangeF = sheet.getRange('F' + lastRow);
  
  var valueC = rangeC.getValue();
  var valueE = rangeE.getValue();
  var valueF = rangeF.getValue();

  // Construct the recipient email address using the values from the last row
  var recipient = [valueC, valueE, valueF].join(',');
  
  // Check if there's an email address before attempting to send
  if (recipient) {
    var now = new Date();
    // Format the date and time to a human-readable string
    // Ensure to use the correct timezone, for example, 'GMT+02:00' for Central European Time
    var timestamp = Utilities.formatDate(now, 'GMT+06:00', 'yyyy-MM-dd HH:mm:ss'); 
    
    // Construct the email subject with the date and time included
    var emailSubject = "AI and Google Model Analysis Report - " + timestamp;                  

    MailApp.sendEmail({
      to: recipient, // Using the recipient's email address from the last row
      subject: emailSubject,
      body: "Here is the analysis report generated by the model:\n\n" + modelResponse
    });
    nextForm = false;
    var logMessage ="Email sent successfully to: " + recipient;
    var logTimestamp = timestamp;

    Logger.log(logMessage);
    Logger.log(nextForm);

      // Access the spreadsheet and the specific sheet (tab)
    var logSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = logSpreadsheet.getSheetByName("Log");

    // Find the last row with content in Column A
    var logLastRow = logSheet.getLastRow();

    // Write data to the next row
    logSheet.getRange(logLastRow + 1, 1).setValue(logTimestamp); 
    logSheet.getRange(logLastRow + 1, 2).setValue(logMessage);

     formatLogSheet();



  } else {
    Logger.log("No email address found in the last row.");
  }

}

//This re-runs the OpenAI query if it fails for some reason

} else {
  
   
 
  // Wait for 30 seconds before calling OpenAI() again
    Utilities.sleep(5000); 
    
    theStopp++;
    
    OpenAI();
    // 5000 milliseconds = 5 seconds
              // 20000 milliseconds = 20 seconds
              // 30000 milliseconds = 30 seconds
              // 60000 milliseconds = 1 minute
    


    
}


}
