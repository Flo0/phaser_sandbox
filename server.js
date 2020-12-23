const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'authoritative_server/index.html');
})
