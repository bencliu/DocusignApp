const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Send email request
app.get('/first', function(req, res) {
    res.send("first reqponse successful");
});

//Send bulk emails
app.get('/second', function(req, res) {
    res.send("second responde successful");
});

//Retrieve and store bulk documents
app.get('/third', function(req, res) {
    res.send("Third response successful");
});

app.listen(process.env.PORT || 8080);