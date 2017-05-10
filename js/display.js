/* display.js
  Provides functions that are primarily used for updating visual aspects of the screen for the user.
    -updateLocale() - Updates all strings to reflect a change in the user's language settings.
    -updateStatDisplay() - Updates the "stat areas" which display build information.
    -populatePartLists() - Populates the part list from scratch, called each time the sort order is changed.
  */

var display = {
  updateLocale: function(){
    var labels = document.querySelectorAll(".statLabel");
    for(var i=0;i<12;i++){
      labels[i].innerHTML = str.get("stat",i);
      labels[i+12].innerHTML = str.get("stat",i);
    }

    labels = document.querySelectorAll(".partListHeader,.partSelectHeader");
    for(i=0;i<4;i++){
      for(var j=0;j<=12;j+=4)
        labels[i+j].innerHTML = str.get("label",i);
    }

    labels = document.querySelectorAll(".buildHeader");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("buildHeader",i);

    labels = document.querySelectorAll("#partsBar h2");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("partSelectHeader",i);

    labels = document.querySelectorAll("#partOptions option");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("partOptions",i);

    labels = document.querySelectorAll("#sortOptions option");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("sortOptions",i);

    labels = document.querySelectorAll("#sortOrder option");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("sortOrder",i);

    labels = document.querySelectorAll("#displayMode option");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("displayMode",i);

    labels = document.querySelectorAll("#individualStatsArea table tr:first-child td");
    var labelOrder = [0,0,2,4,6,8,10,1,3,5,7,9,11];
    for(i=1;i<labels.length;i++)
      labels[i].innerHTML = str.get("stat",labelOrder[i]);

    labels = document.querySelectorAll("#individualStatsArea table td:first-child");
    for(i=1;i<labels.length;i++)
      labels[i].innerHTML = str.get("label",(i-1)%4)+" #"+(Math.floor((i-1)/4)+1);

    labels = document.querySelectorAll("#sortBar h1");
    for(i=0;i<labels.length;i++)
      labels[i].innerHTML = str.get("optionsHeaders",i)+":";

  },

  applySimpleSearchState:function(){
    var li = document.querySelectorAll("#searchArea li");
    var select = document.querySelectorAll("#searchArea select");
    var checkbox = document.querySelectorAll("#searchArea input[type=\"checkbox\"]");
    for(var i=0;i<li.length;i++){
      var state = settings.simpleSearchState[i];
      li[i].style.fontWeight = (state<6)?"bold":"normal";
      li[i].style.color = (state<6)?"black":"gray";
      select[i].selectedIndex = state%6;
      checkbox[i].checked = state<6;
    }
  },

  updateStatDisplay:function(){
    var display_stats = []; //Using an array in the event I need all stats readily available
    var order = [0,2,4,1,5,3,6,8,10,7,11,9]; //Order of stat categories
    var orderIndividual = [0,4,5,6,10,11,2,1,3,8,7,9]; //Order of stat categories for the individual part list
    var partLists = document.querySelectorAll(".partSelect");
    var valueOut = document.querySelectorAll(".statValue");
    var fillOut = document.querySelectorAll(".statFill");
    var partsOut = document.querySelectorAll(".buildParts");
    var indices = [];
    for(var i=0;i<partLists.length;i++){
      indices[i] = partLists[i].selectedIndex;
      //Set Part Images
      var html = "";
      var type = [ui.lists[i%4]];
      var group = groups[type][parts.getList(type)[indices[i]][1]];
      var height = (i%4==0)?32:32;
      var width = (i%4==0)?32:50;
      for(var j=0;j<group.length;j++){
        if(j%2==0 && j > 0) html += "<br>";
        var title = str.get(type,group[j]);
        html+="<img src=\"img/"+type+"_"+group[j]+".png\" height=\""+height+"\" width=\""+width+"\" alt=\""+title+"\" title=\""+title+"\"> ";
      }
      partsOut[i].innerHTML = html;
    }

    //Set Stat Values
    for(i=0;i<24;i++){
      display_stats[i] = 0;
      for(j=(i<12?0:4);j<(i<12?4:8);j++){
        var type = ui.lists[j%4];
        var statIndex = parts.getList(type)[indices[j]][1];
        display_stats[i] += stats[type][statIndex][order[i%12]];
      }
      var value = display_stats[i]*0.25+0.75;
      valueOut[i].innerHTML = value;
      fillOut[i].style.width = (value/6*108)+"px";
    }

    //Add individual part values
    for(i=0;i<8;i++){
      var type = ui.lists[i%4];
      var statIndex = parts.getList(type)[indices[i]][1];
      var cells = document.querySelectorAll("#individualStatsArea tr:nth-child("+(i+2)+") td");
      for(j=0;j<12;j++){
        var value = stats[type][statIndex][orderIndividual[j]]*0.25;
        if(i%4==0) value += 0.75;
        cells[j+1].innerHTML = value;
      }
    }
  },

 
  populatePartLists:function(){
    sort.sortAll();
    var lists = document.querySelectorAll(".partSelect");
    for(var i=0;i<2;i++){
      for(var j=0;j<4;j++){
        var html = "";
        for(var k=0;k<parts.getList(ui.lists[j]).length;k++){
          html += "<option>"+str.get(ui.lists[j],parts.getList(ui.lists[j])[k][0])+"</option>";
        }
        lists[i*4+j].innerHTML = html;
        lists[i*4+j].selectedIndex = ui.getSelectedIndex(i*4+j);
      }
    }
  },

  init:function(){
    //Init Stat Bars
    var statContainerArea = document.querySelectorAll(".statContainerArea");
      display.updateLocale();
      display.populatePartLists();
  }
};
