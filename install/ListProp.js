function listScriptProperties() {
  // Get the script properties
  var scriptProperties = PropertiesService.getScriptProperties();

  // Get all the keys (property names)
  var propertyKeys = scriptProperties.getKeys();

  // Iterate through the keys and log the names and values
  for (var i = 0; i < propertyKeys.length; i++) {
    var key = propertyKeys[i];
    var value = scriptProperties.getProperty(key);
    Logger.log("Property Name: " + key + ", Value: " + value);
  }
}
