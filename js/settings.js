/* settings.js
  Handles user settings and cookies.
  */

var settings = {
  partOptions:0,
  displayMode:0,
  locale:0,
  sortOptions:0,
  sortOrder:0,
  simpleSearchState:[2,8,2,8,8,8,8,8,8,8,8,8],

  set:function(property,value){
    settings[property] = value;
    settings.setCookie(property);
    if(property === "partOptions" || property === "sortOptions" || property === "sortOrder"){
      sort.sortAll();
      display.populatePartLists();
    }
  },

  setCookie:function(property) {
    var value = settings[property];
    var expires = "expires=2147483647";
    document.cookie = property + "=" + value + ";" + expires + ";path=/";
  },

  setCookieArray:function(property){
    var array = settings[property];
    var value = "";
    for(var i=0;i<array.length;i++){
      value = value+array[i];
      if(i+1 < array.length)
        value = value+",";
    }
    var expires = "expires=2147483647";
    document.cookie = property + "=" + value + ";" + expires + ";path=/";
  },

  readCookie:function(property){
    var name = property + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  },

  readCookieArray:function(property){
    var name = property + "=";
    var ca = document.cookie.split(';');
    var array = [];
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        var value = c.substring(name.length, c.length);
        var strArray = value.split(",");
        for(var j=0;j<strArray.length;j++){
          array[j] = parseInt(strArray[j]);
        }
      }
    }
    return array;
  },

  init:function(){
        var settingsProperties = ["partOptions","displayMode","locale","sortOptions","sortOrder"];
        for(var i=0;i<settingsProperties.length;i++){
          var value = settings.readCookie(settingsProperties[i]);
          if(value !== undefined && value != ""){
            settings[settingsProperties[i]] = parseInt(value);
          }
          settings.setCookie(settingsProperties[i]);
          if(i != 2) //skip "Locale"
            document.getElementById(settingsProperties[i]).selectedIndex = value;
        }

        var settingsArrays = ["simpleSearchState"];
        for(i=0;i<settingsArrays.length;i++){
          var array = settings.readCookieArray(settingsArrays[i]);
          if(array.length == settings[settingsArrays[i]].length){
            settings[settingsArrays[i]] = array;
          }
          settings.setCookieArray(settingsArrays[i]);
        }
	ui.setDisplayMode();
  }
};
