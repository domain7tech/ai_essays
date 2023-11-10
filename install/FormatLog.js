function formatLogSheet() {
  // Access the spreadsheet and the specific sheet (tab)
  var logSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = logSpreadsheet.getSheetByName("Log");

  // Set the formatting options for columns A and B
  var formatOptions = {
    fontSize: 12,
    bold: true,
    wrap: true,
    horizontalAlignment: 'left',
    verticalAlignment: 'top',
    border: true
  };

  // Apply formatting to columns A and B
  logSheet.getRange("A:B").setFontSize(formatOptions.fontSize);
  logSheet.getRange("A:B").setFontWeight(formatOptions.bold);
  logSheet.getRange("A:B").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  logSheet.getRange("A:B").setHorizontalAlignment(formatOptions.horizontalAlignment);
  logSheet.getRange("A:B").setVerticalAlignment(formatOptions.verticalAlignment);
  logSheet.getRange("A:B").setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    "black",
    SpreadsheetApp.BorderStyle.SOLID
  );
}
