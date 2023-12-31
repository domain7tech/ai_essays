//Access OpenAI Account
/*

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

//Do not touch anything above this line


function readEssayData() {
  // Open the Spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Open the sheet named 'Form Responses 1'
  var sheet = ss.getSheetByName('Form Responses 1');
  
  // Get the last row and column in the sheet to know the range of data
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  
  // Read only the last row of data into a 1D array
  var lastRowData = sheet.getRange(lastRow, 1, 1, lastCol).getValues()[0]; // Get the first (and only) array
  
  // Log the data to Google Apps Script logger for debugging purposes
  Logger.log(lastRowData);

  return lastRowData;
}

function OpenAI() {
 
  var promptsContent = copyDocsContentsToArray(); // Function to get contents of Prompt1, Prompt2, and Prompt3
  var lastSubmissionData = readEssayData();
  var myData = JSON.stringify(lastSubmissionData);

  Logger.log(myData);

  const myPropValue = myKey();

  var prompt = promptsContent.join("") + myData;
  var model = "gpt-3.5-turbo-16k-0613";
  var temperature = .7;
  var maxTokens = 2400;
  var apiKey = myPropValue;

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
  

}*/



