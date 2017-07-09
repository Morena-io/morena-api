var express = require('express');
var bodyParser = require('body-parser');
var EmailController = require('./email.controller');

var emailsRouter = express.Router();
emailsRouter.use(bodyParser.json());

emailsRouter.route('/')
  .get((req, res, next) => {
    EmailController.getAll(res);
  })
  .post((req, res, next) => {
    EmailController.create(req.body, res);
  });

module.exports = emailsRouter;