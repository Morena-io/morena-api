var express = require('express');
var bodyParser = require('body-parser');

var baseRouter = express.Router();
baseRouter.use(bodyParser.json());

baseRouter.route('/')
  .get((req, res, next) => {
    res.status(200);
    res.json({message: 'API Initialized'});
  });

module.exports = baseRouter;