//This files connects the program to your Script Properties
//If you want more than 3 Pompt Files you would need to edit this
//and create more PromptXIDs and add references to them in the AI.gs
//script.

//Manage OpenAI Key

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

//Manage AI Settings like Model and Temperature


function getAITemp() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('AI_TEMP');
    let tempNumber = parseFloat(sheetId);
    // If the number is an integer, divide by 10 to get a decimal
    if (Number.isInteger(tempNumber)) {
      tempNumber /= 10;
    }
    // No need to use toFixed if you want a number type
    return tempNumber;
  } catch (err) {
    console.log(`Failed getting property "AI_TEMP": ${err.message}`);
    return null;
  }
}

function getAIModel() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('AI_MODEL');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "AI_MODEL": ${err.message}`);
    return null;
  }
}

function getAITokens() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('AI_TOKENS');
    let aiMaxTokens = parseFloat(sheetId);
    return aiMaxTokens;
  } catch (err) {
    console.log(`Failed getting property "AI_TOKENS": ${err.message}`);
    return null;
  }
}


//DOCUMENT_ID_CONTROL

function getDocumentControlID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('DOCUMENT_ID_CONTROL');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "DOCUMENT_ID_CONTROL": ${err.message}`);
    return null;
  }
}



//FOLDER_ID_PROMPTS
function getMyFolderID() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const sheetId = scriptProperties.getProperty('FOLDER_ID_PROMPTS');
    return sheetId;
  } catch (err) {
    console.log(`Failed getting property "FOLDER_ID_PROMPTS": ${err.message}`);
    return null;
  }
}


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
