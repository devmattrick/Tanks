var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

http.listen(3005, function(){
  console.log('Server listening on *:3000');
});