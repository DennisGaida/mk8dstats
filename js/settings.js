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

  init:function(){
	ui.setDisplayMode();
  }
};
