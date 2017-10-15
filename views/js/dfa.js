var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
 "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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

window.onload = function() {
  localStorage.setItem("status", "noDfa");
  localStorage.setItem("height", 2);
  localStorage.setItem("width", 2);

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
