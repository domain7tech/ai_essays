//Load Prompts

copyDocsContentsToArray();

//Set Access to Sheets 

// Function to access the Sheet ID
function getMySheetID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_SHEET_ID');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_SHEET_ID": ${err.message}`);
    return null;
  }
}

// Function to access the Sheet Tab Name
function getMySheetTabName() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetTabName = scriptProperties.getProperty('MY_SHEET_TAB_NAME');
    return sheetTabName;
  } catch (err) {
    console.log(`Failed getting property "MY_SHEET_TAB_NAME": ${err.message}`);
    return null;
  }
}

var mySheetID = getMySheetID();
var mySheetTabName = getMySheetTabName();

//Access OpenAI Account


function myKey() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const myProp = scriptProperties.getProperty('OPENAI_API_KEY');
    return myProp;
  } catch (err) {
    console.log(`Failed getting property "OPENAI_API_KEY": ${err.message}`);
    return null;
  }
}



function readEssayData() {
  // Open the Spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
 
  var sheet = ss.getSheetByName(mySheetTabName);
  
  // Get the last row and column in the sheet to know the range of data
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  
  // Read only the last row of data into a 1D array
  var lastRowData = sheet.getRange(lastRow, 1, 1, lastCol).getValues()[0];
  
  // Log the data to Google Apps Script logger for debugging purposes
  Logger.log(lastRowData);

  return lastRowData;
}

///Pull in Prompt IDs
function Prompt1ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_PROMPT_1');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_PROMPT_1": ${err.message}`);
    return null;
  }
}

function Prompt2ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_PROMPT_2');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_PROMPT_2": ${err.message}`);
    return null;
  }
}

function Prompt3ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_PROMPT_3');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_PROMPT_3": ${err.message}`);
    return null;
  }
}

////Pull in Question Type

function Qtype1ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_QTYPE_1');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_QTYPE_1": ${err.message}`);
    return null;
  }
}

function Qtype2ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_QTYPE_2');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_QTYPE_2": ${err.message}`);
    return null;
  }
}

function Qtype3ID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('MY_QTYPE_3');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "MY_QTYPE_3": ${err.message}`);
    return null;
  }
}

///////////////////////


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
Logger.log("Last value in Column G: '" + prompt_lastValueInG + "'");

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

const myPropValue = myKey();

// Combine the selected prompt with the last submission data
var prompt = position + "\n" + myData;
var model = "gpt-3.5-turbo-16k-0613";
var temperature = .7;
var maxTokens = 2400;
var apiKey = myPropValue;
var nextForm = false; // Initialize nextForm as false

// Set up the request body with the given parameters
var requestBody = {
  "model": model,
  "temperature": temperature,
  "max_tokens": maxTokens,
  "messages": [
    {
      "role": "system",
      "content": "You are a K-12 English Literature teacher helping students get started on essays and writing prompts."
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

Logger.log(nextForm);

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
    // Send the email
    MailApp.sendEmail({
      to: recipient, // Using the recipient's email address from the last row
      subject: "Model Analysis Report",
      body: "Here is the analysis report generated by the model:\n\n" + modelResponse
    });
    nextForm = false;
    Logger.log("Email sent successfully to: " + recipient);
    Logger.log(nextForm);
  } else {
    Logger.log("No email address found in the last row.");
  }

}

//This re-runs the OpenAI query if it fails for some reason

} else {
  // Wait for 30 seconds before calling OpenAI() again
  setTimeout(function() {
    OpenAI();
  }, 30000); // 5000 milliseconds = 5 seconds
              // 20000 milliseconds = 20 seconds
              // 30000 milliseconds = 30 seconds
              // 60000 milliseconds = 1 minute

}


}
