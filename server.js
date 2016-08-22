#!/usr/bin/env node

'use strict'

// load dependencies from node_modules
var express = require('express');
var bodyParser = require('body-parser');

module.exports = (function() {

  var app = express();

  // configure the express server
  app.use(express.static('.'));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  var getHandler = function(req, res, next) {
    res.json({
      "hello": "world"
    });
  };

  var putHandler = function(req, res, next) {
    console.log('you sent me', req.body);
    res.status(201).json({
      "status": "OK"
    })
  };

  // define some REST endpoints
  app.get('/foo', getHandler);
  app.put('/bar', putHandler);

  // start listening.  The server won't exit.
  app.listen(5000, function() {
    console.log('listening on port 5000');
  });

})()
