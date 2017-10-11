var port = 3001;
var path = __dirname + '/views/html';
var fs = require('fs');
var express = require("express");
var app = express();
var http = require('http');
var NodeSession = require('node-session');
var session = require('express-session');
var router = express.Router();
var cookieParser = require('cookie-parser');
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

connection.connect(function(err){
  if(err){
    console.log('Error Connecting to MYSQL');
    return;
  }
  console.log("Connection Established With MYSQL");
});

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cookieParser('SecretCode'));
app.use(session({
  secret: '1234567890QWERTY',
  resave: true,
  saveUninitialized: true
}));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  console.log("Is Logged In " + req.session.loggedIn);
  res.sendFile(path + "dfa.html");
});

app.use("/",router);
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(port,function(){
  console.log("Live at Port: " + port);
});
