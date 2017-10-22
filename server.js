var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO add dev check before adding these headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

var connection = require('./db/connection');
var baseRouter = require('./base.routes');
var emailsRouter = require('./emails/email.routes');

app.use((req, res, next) => {
  console.log('<--', 'HTTP', req.method, req.originalUrl);
  next();
});
app.use('/emails', emailsRouter);
app.use('/', baseRouter);

connection.init();

var port = process.env.API_PORT || 3002;
var server = app.listen(port, () => {
  console.log('Morena API listening on port ' + server.address().port);
});