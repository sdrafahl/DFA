var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
 "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

window.onload = function() {
  localStorage.setItem("status", "noDfa");
  localStorage.setItem("height", 2);
  localStorage.setItem("width", 2);

  var stateButton = document.getElementById("states");
  stateButton.onclick = function() {
    addState();
  }

  var transButton = document.getElementById("trans");
  transButton.onclick = function() {
    addTransition();
  }
}

function validate() {
   var start = document.getElementById("start").value;
   var end = document.getElementById("terminal").value;

   for(var x = 0; x < alphabet.size; x++) {
     if(document.getElementById(alphabet[x]) == null) {
       return;
     }
     var incra = 0;
     term = (end == alphabet[x]);
     var state = {
       terminal: term,
       transitions: [],
     };
     localStorage.setItem(alphabet[x], state);
     while(document.getElementById(incra + alphabet[x]) != null) {
       state.transitions.append(alphabet[x]);
       incra++;
     }
   }
}

function addState() {
  tr = document.createElement("tr");
  table = document.getElementById("table1");
  for(var x=0;x<localStorage.getItem("width");x++) {
    th = document.createElement("th");
    if(x == 0) {
      th.innerHTML = alphabet[localStorage.getItem("height")];
    }
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
  th.innerHTML = localStorage.getItem("height");
  tr = document.getElementById("transitions");
  tr.appendChild(th);
  columns = document.getElementById("table1").childNodes[1].childNodes;
  console.log(document.getElementById("table1").childNodes[1].childNodes);
  for(var x=0;x<columns.length;x++) {
    newth = document.createElement("th");
    newInput = document.createElement("input");
    newInput.id = localStorage.getItem("width") + alphabet[x-1];
    newth.appendChild(newInput);
    columns.childNodes[1].childNodes.appendChild(newth);
  }
  w = localStorage.getItem("width");
  localStorage.setItem("width", w + 1);
}
