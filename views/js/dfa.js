var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
 "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z"];

var selected = false;

function convertStateToString(state) {
  var out = "";
  if(state.terminal) {
    out += "T-"
  } else {
    out += "O-"
  }
  for(var x=0;x<state.transitions.length;x++) {
    out += x + ":" + state.transitions[x] + "-";
  }
  return out
}

function convertStringToState(input) {
  var state = {
    transitions: [],
  };
  if(input.charAt(0) == "T") {
    state.terminal = true;
  } else {
    state.terminal = false;
  }
  first = true;
  var from = "";
  var to = "";
  for(var x=2;x<input.length;x++) {
    ch = input.charAt(x);
    if(ch == ":") {
      state.transitions.push(input.charAt(x+1));
    }
  }
  return state;
}

function saveDFA() {
  if(selected) {
    var dfaString = "";
    x = 0;
    dfaString += localStorage.getItem("startLetter");
    dfaString += ">";
    while(localStorage.getItem(alphabet[x]) != null) {
      dfaString += localStorage.getItem(alphabet[x]);
      dfaString += "+";
      x++;
    }
    us = document.getElementById("userInput").value;

    $.ajax({
      url: '/save',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify ({
        user: us,
        dfa: dfaString,
      }),
      success: function() {
        console.log("success");
      },
      error: function(xhr, status, error) {
        console.log("error");
      },
    });
  }
}

window.onload = function() {
  localStorage.setItem("status", "noDfa");
  localStorage.setItem("height", 2);
  localStorage.setItem("width", 2);

  setupUsers();

  var stateButton = document.getElementById("plusStates");
  stateButton.onclick = function() {
    addState();
  }

  var transButton = document.getElementById("trans");
  transButton.onclick = function() {
    addTransition();
  }

  var testButton = document.getElementById("testButton");
  testButton.onclick = function() {
    test();
  }

  var saveButton = document.getElementById("saveDFA");
  saveButton.onclick = function() {
    saveDFA();
  };

  var loadDfaButton = document.getElementById("loadButton");
  loadDfaButton.onclick = function() {
    selection = document.getElementById("users");
    var userName = selection.options[selection.selectedIndex].text;
    $.ajax({
      url: '/getDFA',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify ({
        user: userName
      }),
      success: function(data) {
        var dfa = data.dfa;
        var startStateLetter = dfa.charAt(0);

        var state;
        for(var x=2;x<dfa.length;x++) {
          if(dfa.charAt(x) != "+") {
            state += dfa.charAt(x);
          } else {
            localStorage.setItem(alphabet[x-2], state);
            state = "";
          }
        }
        start = localStorage.getItem(startStateLetter);
        localStorage.setItem("start", start);
        localStorage.setItem("startLetter", startStateLetter);
        selected = true;
        display = document.getElementById("dfa_status");
        display.innerHTML = "DFA Selected"
        populateTable(data);

      },
      error: function(xhr, status, error) {
        console.log("error");
      },
    });
  }
}

function populateTable(data) {
  var startInput = document.getElementById("start");
  startInput.value = localStorage.getItem("startLetter");
  var width = 0;
  tempDfa = localStorage.getItem(alphabet[0]);
  for(var y=2;y<tempDfa.length;y++) {
    if(tempDfa.charAt(y) == ":") {
      width++;
    }
  }
  width -= 2;
  for(var b=0;b<width;b++) {
    addTransition();
  }
  height = 0;
  for(var n=0;n<data.dfa.length;n++) {
    if(data.dfa.charAt(n) == "+") {
      height++;
    }
  }
  height -= 2;
  for(var b=0;b<height;b++) {
    addState();
  }
  for(x=0;x<alphabet.length;x++) {
    if(localStorage.getItem(alphabet[x]) != null) {
      dfa = localStorage.getItem(alphabet[x]);
      if(dfa.charAt(0) == "T") {
        terminalInput = document.getElementById("terminal");
        terminalInput.value = alphabet[x];
      }
      count = 1;
      for(var x1=2;x1<dfa.length;x1++) {
        ch = dfa.charAt(x1);
        if(ch == ":") {
          x1++;
          trans = dfa.charAt(x1);
          id = count + alphabet[x];
          inputBox = document.getElementById(id);
          if(inputBox == null) {
            return;
          }
          inputBox.value = trans;
          box = document.getElementById("id");
          count++;
        }
      }
    }
  }
}

function setupUsers() {
  var list = document.getElementById("users");
  var user = "";
  $.ajax({
    url: '/getUsers',
    type: 'POST',
    success: function(data) {
      for(var x=0;x<data.users.length;x++) {
        if(data.users.charAt(x) != ",") {
          user += data.users.charAt(x);
        } else {
          option = document.createElement("option");
          option.value = user;
          option.innerHTML = user;
          option.label = user;
          selection = document.getElementById("users");
          selection.appendChild(option);
          user = "";
        }
      }
    },
    error: function(xhr, status, error) {
      console.log("error");
    }
  });

}

function validate() {
   var end = document.getElementById("terminal").value;
   for(var x = 0; x<alphabet.length; x++) {
     if(document.getElementById("1" + alphabet[x]) == null) {
       break;
     }
     var incra = 1;
     term = (end == alphabet[x]);
     var state = {
       terminal: term,
       transitions: [],
     };
     while(document.getElementById(incra + alphabet[x]) != null) {
       state.transitions.push(document.getElementById(incra + alphabet[x]).value);
       incra++;
     }
     localStorage.setItem(alphabet[x], convertStateToString(state));

   }
   var start = localStorage.getItem(document.getElementById("start").value.trim());
   localStorage.setItem("startLetter", document.getElementById("start").value.trim());
   localStorage.setItem("start", start);
   localStorage.setItem("end", end);
   selected = true;
   display = document.getElementById("dfa_status");
   display.innerHTML = "DFA Selected"
}

function test() {
  if(selected) {
    startState =  convertStringToState(localStorage.getItem("start"));
    end = localStorage.getItem("end");
    input = "" + document.getElementById("inputString").value;
    for(var x=0;x<input.length;x++) {
      ch = input.charAt(x);
      ch = ch - 1;
      startState = convertStringToState(localStorage.getItem(startState.transitions[ch]));
    }
    var element = document.getElementById("out");
    if(startState.terminal) {
      element.innerHTML = "This string is in the language defined by this DFA";
    } else {
      element.innerHTML = "This string is not the language defined by this DFA";
    }
  }
}

function addState() {
  tr = document.createElement("tr");
  table = document.getElementById("table1").childNodes[1];
  lab = document.createElement("th");
  index = localStorage.getItem("height") * 1;
  lab.innerHTML = alphabet[index];
  tr.appendChild(lab);
  for(var x=0;x<localStorage.getItem("width");x++) {
    th = document.createElement("th");
    input = document.createElement("input");
    input.id = "" + (x + 1) + alphabet[localStorage.getItem("height")];
    th.appendChild(input);
    tr.appendChild(th);
    table.appendChild(tr);
  }
  var h = localStorage.getItem("height");
  h = h * 1;
  localStorage.setItem("height", h+1);
}

function addTransition() {
  th = document.createElement("th");
  th.innerHTML = localStorage.getItem("width") * 1 + 1;
  tr = document.getElementById("transitions");
  tr.appendChild(th);
  columns = document.getElementById("table1").childNodes[1].childNodes;
  for(var x=2;x<document.getElementById("table1").childNodes[1].childNodes.length;x++) {
    if(x % 2 == 0 || x > 6) {
      newth = document.createElement("th");
      newInput = document.createElement("input");
      var a = "";
      if(x > 6) {
        a = alphabet[(x-1)/2];
      } else {
        a = alphabet[(x/2)-1];
      }
      newInput.id = localStorage.getItem("width") * 1 + 1 + a;
      newth.appendChild(newInput);
      document.getElementById("table1").childNodes[1].childNodes[x].appendChild(newth);
    }
  }
  w = localStorage.getItem("width");
  w = w * 1;
  localStorage.setItem("width", w + 1);
}
