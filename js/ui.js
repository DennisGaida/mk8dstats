/* ui.js
  Provides functions that allow the user to interact with the calculator, and keeps track of various states the calculator is in.
    -lists - A hardcoded array of the various parts that make up a build.
    -selected - The partIndex values of each selected part in the Part Select area (see: parts.js.)
    
    -onPartChange() - Called when the user selects a new part in the Part Select area.
    -getSelectedIndex(listIndex) - returns the selctedIndex of the part currently selected in the list indicated by listIndex.
  */

var ui = {
  lists:["chara","kart","tire","glider"],
  selected:[-1,-1,-1,-1,-1,-1,-1,-1],
  currentResults:[],
  maxSearchResults:500,

  onPartChange:function(){
    var lists = document.querySelectorAll(".partSelect");
    for(var i=0;i<lists.length;i++){
      var partList = parts.getList(ui.lists[i%4]);
      ui.selected[i] = partList[lists[i].selectedIndex][0];
    }
    display.updateStatDisplay();
  },

  onPartListKeyDown:function(e){
    var direction = 0;
    if(false && event.key !== undefined){
      if(event.key === "ArrowLeft") direction = 1;
      else if(event.key === "ArrowRight") direction = 2;
    }
    else if (event.keyCode !== undefined){
      if(event.keyCode == 37) direction = 1;
      else if(event.keyCode == 39) direction = 2;
    }
    if(direction != 0){
      var lists = document.querySelectorAll(".partSelect");
      for(var i=0;i<lists.length;i++){
        if(lists[i] === document.activeElement){
          if(i > 0 && direction == 1)
            lists[i-1].focus();
          else if(i<7 && direction == 2){
            lists[i+1].focus(); 
            break;
          }
        }
      }
    }
  },

  onPartOptionsChange:function(e){
    if(settings.partOptions == 0){
      //Some parts have been removed, change the selection to one that still exists
      ui.fixSelection();
    }
    settings.set("partOptions",e.target.selectedIndex);
  },

  fixSelection:function(){
    var lists = document.querySelectorAll(".partSelect");
    for(var i=0;i<lists.length;i++){
      var partIndex = ui.getSelectedIndex(i);
      var partSet = parts[ui.lists[i%4]][partIndex][1];
      for(var j=0;j<parts[ui.lists[i%4]+"_unique"].length;j++){
        if(parts[ui.lists[i%4]+"_unique"][j][1] == partSet){
          ui.selected[i] = parts[ui.lists[i%4]+"_unique"][j][0];
          break;
        }
      }
    }
  },

  onSortOptionsChange:function(e){
    settings.set("sortOptions",e.target.selectedIndex);
  },

  onSortOrderChange:function(e){
    settings.set("sortOrder",e.target.selectedIndex);
  },

  onDisplayModeChange:function(e){
    settings.set("displayMode",e.target.selectedIndex);
    ui.setDisplayMode();
  },

  setDisplayMode:function(){
    var mode = settings.displayMode;
    var divs = [["individualStatsArea"],
                ["searchArea","searchResults"]];
    for(var i=0;i<divs.length;i++){
      for(var j=0;j<divs[i].length;j++)
        document.getElementById(divs[i][j]).style.display = (mode == i)?"inline-block":"none";
    }
  },

  getSelectedIndex:function(listIndex){
    var index = ui.selected[listIndex];
    var type = ui.lists[listIndex%4];
    var liveList = document.querySelectorAll(".partSelect")[listIndex];

    if(index == -1){
      index = parts[type][0][0];
      ui.selected[listIndex] = index;
    }

    var name = str.get(type,ui.selected[listIndex]);
    var list = parts.getList(type);
    for(var i=0;i<list.length;i++)
      if(list[i][0] == ui.selected[listIndex]){
        return i;
      }
    return -1;
  },


  simpleSearchOnClick:function(e){
    var li = document.querySelectorAll("#searchArea li");
    var checkbox = document.querySelectorAll("#searchArea input[type=\"checkbox\"]");
    for(var i=0;i<li.length;i++){
      if(li[i] === e.target || li[i] === e.target.parentElement){
        var state = checkbox[i].checked;
        if(!state){
          checkbox[i].checked = true;
          ui.setSimpleSearchStates();
        }
        else if(e.target.className === "searchCheckbox" || e.target.tagName === "LI" || e.target.tagName === "SPAN"){
          checkbox[i].checked = false;
          ui.setSimpleSearchStates();
        }
      }
    }
  },

  setSimpleSearchStates:function(){
    var checkbox = document.querySelectorAll("#searchArea input[type=\"checkbox\"]");
    var select = document.querySelectorAll("#searchArea select");
    for(var i=0;i<select.length;i++){
      var state = checkbox[i].checked?0:6;
      state += select[i].selectedIndex;
      settings.simpleSearchState[i] = state;
    }
    settings.setCookieArray("simpleSearchState");
    display.applySimpleSearchState();
  },

  getBuildOneStats:function(order){
    var displayStats = [];
    var indices = [];
    var partList = document.querySelectorAll(".partSelect");
    for(var i=0;i<4;i++){
      indices[i] = partList[i].selectedIndex;
    }
    for(i=0;i<stats.chara[0].length;i++){
      displayStats[i] = 0;
      for(j=0;j<4;j++){
        var type = ui.lists[j%4];
        var groupIndex = parts.getList(type)[indices[j]][1];
        displayStats[i] += stats[type][groupIndex][order[i]];
      }
    }
    return displayStats;
  },

  simpleSearchReset:function(){
    settings.simpleSearchState = [2,8,2,8,8,8,8,8,8,8,8,8];
    settings.setCookieArray("simpleSearchState");
    display.applySimpleSearchState();
  },

  simpleSearchSubmit:function(){
    var results = [];
    var order = [0,2,4,1,5,3,6,8,10,7,11,9];
    var numCharas = groups.chara.length;
    var numKarts = groups.kart.length;
    var numTires = groups.tire.length;
    var numGliders = groups.glider.length;
    var displayStats = ui.getBuildOneStats(order);

    for(var c=0;c<numCharas;c++){
      for(var k=0;k<numKarts;k++){
        for(var t=0;t<numTires;t++){
          for(var g=0;g<numGliders;g++){
	    if(ui.simpleSearchValidateBuild(displayStats,order,c,k,t,g)){
              //str.get("chara",groups.chara[c][0])
              results.push([c,k,t,g]);
            }
          }
        }
      }
    }
 /*   //Remove Build #1 from results
    var buildOne = [];
    var lists = document.querySelectorAll(".partSelect");
    for(var i=0;i<4;i++){
      var partIndex = ui.getSelectedIndex(i);
      var partSet = parts[ui.lists[i%4]][partIndex][1];
      for(var j=0;j<parts[ui.lists[i%4]+"_unique"].length;j++){
        if(parts[ui.lists[i%4]+"_unique"][j][1] == partSet){
          buildOne[i] = parts[ui.lists[i%4]+"_unique"][j][1];
          break;
        }
      }
    }
    for(i=0;i<results.length;i++){
      alert(results[i]+"\n"+buildOne);
      if(buildOne[0] == results[i][0] &&
         buildOne[1] == results[i][1] &&
         buildOne[2] == results[i][2] &&
         buildOne[3] == results[i][3]){
           results.splice(i,1);
           break;
      }
    } */

    var list = document.querySelector("#searchResults ul");
    var message = document.getElementById("searchResultsMessage");
    if(results.length == 0){
      list.innerHTML = "";
      message.innerHTML = "No results found.";
      message.style.display = "block";
    }
    else if(results.length > ui.maxSearchResults){
      list.innerHTML = "";
      message.innerHTML = "Too many search results to display.<br>Found: "+results.length+"<br>Limit: "+ui.maxSearchResults;
      message.style.display = "block";
    }
    else{
      ui.populateResultList(results);
      message.style.display = "none";
    }
  },

  populateResultList:function(results){
    var colors = ["DFF","CEF","BDF","ACF","9BF","8AF","CFC","AFA","9F9","7F7","5F5","FCC","FAA","F99","F77","F55"];
    var list = document.querySelector("#searchResults ul");
    var html = "";
    for(var i=0;i<results.length;i++){
      html += "<li style=\"background-color:#"+colors[results[i][0]]+"\" id=\"result"+i+"\"><input type=\"radio\" name=\"result\" value=\""+i+"\">";
      for(var j=0;j<results[i].length;j++){
        var type = ui.lists[j];
        var label = str.get(type,groups[type][results[i][j]][0]);
        html += "<span class=\"resultsPartition\">"+label+"</span>";
      }
      html += "</li>";
    } 
    list.innerHTML = html;
    ui.currentResults = results;
    var lis = document.querySelectorAll("#searchResults li");
    var radios = document.querySelectorAll("#searchResults input[type=\"radio\"]");
    for(i=0;i<radios.length;i++){
      radios[i].onchange = ui.onResultChange;
      lis[i].onclick = ui.onResultClick;
    }
  },

  onResultChange:function(){
    var radios = document.querySelectorAll("#searchResults input[type=\"radio\"]");
    var partLists = document.querySelectorAll(".partSelect");
    for(var index=0;index<radios.length && !radios[index].checked;index++);
    for(var i=0;i<4;i++){
      ui.selected[i+4] = groups[ui.lists[i]][ui.currentResults[index][i]][0];
      partLists[i+4].selectedIndex = ui.getSelectedIndex(i+4);
    }
    display.updateStatDisplay();
  },

  onResultClick:function(e){
    var radios = document.querySelectorAll("#searchResults input[type=\"radio\"]");
    var lis = document.querySelectorAll("#searchResults li");
    var target = e.target;
    if(target.tagName !== "LI") target = target.parentElement;
    var index = target.id.substring(6);
    radios[index].checked = true;
    radios[index].focus();
    ui.onResultChange();
  },

  simpleSearchValidateBuild:function(displayStats,order,chara,kart,tire,glider){
    for(var i=0;i<settings.simpleSearchState.length;i++){
      var state = settings.simpleSearchState[i];
      if(state < 6){
        var s1 = stats.chara[chara][order[i]] + stats.kart[kart][order[i]]
                 + stats.tire[tire][order[i]] + stats.glider[glider][order[i]];
        var s2 = displayStats[i];
        if(state == 0 && !(s1 < s2)) return false;
        else if(state == 1 && !(s1 <= s2)) return false;
        else if(state == 2 && !(s1 == s2)) return false;
        else if(state == 3 && !(s1 >= s2)) return false;
        else if(state == 4 && !(s1 > s2)) return false;
        else if(state == 5 && !(s1 != s2)) return false;
      }
    }    
    return true;
  },

  init:function(){
    var partLists = document.querySelectorAll(".partSelect");
    for(var i=0;i<partLists.length;i++){
      partLists[i].selectedIndex = 0;
      partLists[i].onchange = ui.onPartChange;
      partLists[i].onkeydown = ui.onPartListKeyDown;
    }
    document.getElementById("partOptions").onchange = ui.onPartOptionsChange;
    document.getElementById("sortOptions").onchange = ui.onSortOptionsChange;
    document.getElementById("sortOrder").onchange = ui.onSortOrderChange;
    document.getElementById("displayMode").onchange = ui.onDisplayModeChange;
    document.getElementById("simpleSearchReset").onclick = ui.simpleSearchReset;
    document.getElementById("simpleSearchSubmit").onclick = ui.simpleSearchSubmit;

    var simpleSearchLi = document.querySelectorAll("#searchArea li");
    var simpleSearchCheckbox = document.querySelectorAll("#searchArea input[type=\"checkbox\"]");
    var simpleSearchSelect = document.querySelectorAll("#searchArea select");
    for(i=0;i<simpleSearchLi.length;i++){
      simpleSearchLi[i].onclick = ui.simpleSearchOnClick;
      simpleSearchCheckbox[i].onchange = ui.setSimpleSearchStates;
      simpleSearchSelect[i].onchange = ui.setSimpleSearchStates;
    }
    display.updateStatDisplay();
    display.applySimpleSearchState();
  }
};
