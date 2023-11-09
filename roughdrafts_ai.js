//Access OpenAI Account
/*
function myKeyRD() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const myProp = scriptProperties.getProperty('OPENAI_API_KEY');
    return myProp;
  } catch (err) {
    console.log(`Failed getting property "OPENAI_API_KEY": ${err.message}`);
    return null;
  }
}

//Do not touch anything above this line


function readRoughDraftData() {
  // Open the Spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Open the sheet named 'stuData'
  var sheet = ss.getSheetByName('Form Responses 3');
  
  // Get the last row and column in the sheet to know the range of data
  var lastRow = sheet.getLastRow();
  //var lastCol = sheet.getLastColumn();
  
  // Read all data in the sheet into a 2D array
  // If your sheet has headers and you want to use it, change the 2 to a 1
  //var allData = sheet.getRange(2, 4, lastRow, lastCol).getValues();
  
  var allData = sheet.getRange(2, 4, lastRow - 2 + 1).getValues();
  
  
  // If your sheet has headers and you want to use it, change the 2 to a 1
  // If you're only interested in 9 columns, you can adjust the getRange parameters.
  //var nineColsData = sheet.getRange(2, 1, lastRow, 9).getValues();
  
  // Log the data to Google Apps Script logger for debugging purposes
  Logger.log(allData);


  return allData;
}


function OpenAIRoughDraft() {
 
var allData = readRoughDraftData();
var myData = JSON.stringify(allData); 

Logger.log(myData);

  const myPropValue = myKeyRD();

  var prompt = "Count the words in this data and suggest 5 changes to make more engaging: " + myData;
  var model = "gpt-3.5-turbo-16k-0613";
  var temperature = .7;
  var maxTokens = 2400;
  var apiKey = myPropValue;

Logger.log(prompt);

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
      {"role": "user", "content": prompt}]
  };

  var requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(requestBody)
  };

  // Call the OpenAI API
  var response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);

  // Parse the JSON response
  var jsonResponse = JSON.parse(response.getContentText());

  // Extract the model's response
  var modelResponse = jsonResponse['choices'][0]['message']['content'];

  //var FinalOutput = columnC[i][0] +" ; "+ modelResponse + " || ";

  // Log the model's response
 Logger.log(modelResponse);

// Use MailApp to send the email
  MailApp.sendEmail({
    to: "tonydeprato@domain7.tech", // Replace with the recipient's email address
    subject: "Model Analysis Report",
    body: "Here is the analysis report generated by the model:\n\n" + modelResponse
  });
  
  Logger.log("Email sent successfully");
  

}

*/
