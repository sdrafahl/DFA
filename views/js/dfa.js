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
  table = document.getElementById("table");
  for(var x=0;x<localStorage.getItem("width");x++) {
    th = document.createElement("th");
    if(x == 0) {
      th.innerHTML = alphabet[localStorage.getItem("height")];
    }
    input = document.createElement("input");
    input.id = "" + localStorage.getItem("height") + alphabet[x];
    th.appendChild(input);
    tr.appendChild(th);
    table.appendChild(tr);
  }
  var h = localStorage.getItem("height");
  h = h * 1;
  localStorage.setItem("height", h+1);
}
