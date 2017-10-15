var port = 3000;
var express = require("express");
var app = express();
var path = __dirname + '/views/html/';
var fs = require('fs');
var http = require('http');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require("mysql");


/*Setup Connection with Database */
/*This will need to be changed when placed on server */
var connection = mysql.createConnection({
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "DFA"
});

connection.connect(function (err) {
  if (err) {
    console.log('Error Connecting to MYSQL');
    return;
  }
  console.log("Connection Established With MYSQL");
});

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.set('view engine', 'html');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.post("/getDFA", function(req, res) {
  var sql = "SELECT * FROM DFA WHERE user = '" + req.body.user + "'" + ";";
  console.log(sql);
  connection.query(sql, function(err, rows) {
    if(err) {
      throw err;
    }
    res.json({
      dfa: rows[0].dfa,
    });
  });
});

router.post("/save", function(req, res) {
  var sql1 = "SELECT * FROM DFA WHERE user = '" + req.body.user + "'" + ";";
  console.log(sql1);
  connection.query(sql1, function(err, rows) {
    if(err) {
      throw err;
    }
    if(rows.length == 1) {
      var updateSql = "UPDATE DFA SET dfa = '" + req.body.dfa + "' WHERE user = '" + req.body.user + "';";
      console.log(updateSql);
      connection.query(updateSql, function(err) {
        if(err) {
          throw err;
        }
      });
    } else {
      var sqlInsert = "INSERT INTO DFA VALUES('" + req.body.user + "','" + req.body.dfa + "'" + ");";
      console.log(sqlInsert);
      connection.query(sqlInsert, function(err) {
        if(err) {
          throw err;
        }
      });
    }
  });
});

router.post("/getUsers", function(req, res) {
  var sql = "SELECT * FROM DFA";
  console.log(sql);
  connection.query(sql, function(err, rows) {
    if(err) {
      throw err;
    }
    var users = "";
    for(var x=0;x<rows.length;x++) {
      users += rows[x].user;
      users += ",";
    }
    res.json({
      users: users
    });
  });
});

router.get("/",function(req,res){
  res.sendFile(path + "dfa.html");
});

app.use("/",router);
app.use("*",function(req,res){
  console.log("error");
});

app.listen(port,function(){
  console.log("Live at Port: " + port);
});
