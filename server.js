var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var connection = require('./connection');
var emailsRouter = require('./routes/email.routes');

app.use('/emails', emailsRouter);

connection.init();

var server = app.listen(3000, () => {
  console.log('Morena API listening on port ' + server.address().port);
});