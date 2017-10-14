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
  console.log(document.getElementById("table1").childNodes[1].childNodes);
  for(var x=2;x<document.getElementById("table1").childNodes[1].childNodes.length;x++) {
    if(x % 2 == 0) {
      newth = document.createElement("th");
      newInput = document.createElement("input");
      newInput.id = localStorage.getItem("width") + alphabet[(x/2)-1];
      newth.appendChild(newInput);
      document.getElementById("table1").childNodes[1].childNodes[x].appendChild(newth);
    }
  }
  w = localStorage.getItem("width");
  w = w * 1;
  localStorage.setItem("width", w + 1);
}
