#!/usr/bin/env node

'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var restClient = require('request-promise');

module.exports = (function() {
  // todo it would be better to read this in from a file that isn't checked in
  var consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc';
  var consumerSecret = 'OQmDIdT3xRtvVyolAUmuqzCj8xAVrNiskk0LgRrYZ08yqSXHHU';
  var twitterAuthAPI = 'https://api.twitter.com/oauth2/token';

  // this will get updated when /auth is called
  var twitterAuthToken = 'AAAAAAAAAAAAAAAAAAAAAA9LtwAAAAAAeihb7UwP%2B6hq8GZBlS0HKH%2Bu1qs%3DWAzj5p8Aq67HPskRnFi6ydvN0nogHIyH8Vg4znGo2dDiruNncC';


  var app = express();

  app.use(express.static('.'));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  var getHandler = function(req, res) {
    res.json({
      "hello": "world"
    });
  };

  var putHandler = function(req, res) {
    console.log('you sent me', req.body);
    res.status(201).json({
      "status": "OK"
    })
  };


  var handleAuth = function(req, res) {
    console.log('handling auth')

    var combinedString = encodeURIComponent(consumerKey) + ':' + encodeURIComponent(consumerSecret);
    var b64Encoded = (new Buffer(combinedString)).toString('base64');
    console.log('b64encoded', b64Encoded)

    var oauthPost = {
      'method': 'POST',
      'uri': twitterAuthAPI,
      'headers': {
        'Authorization': 'Basic ' + b64Encoded,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      'json': true,
      'body': 'grant_type=client_credentials'
    }

    restClient(oauthPost)
      .then((authResponse) => {
        console.log('successful response', authResponse)

        // set this variable, which should be used in future calls to
        twitterAuthToken = authResponse.access_token;
        res.json({
          'auth': true,
          'data': authResponse
        });
      })
      .catch((err) => {
        console.log('auth error', err);
        res.status(500).json({
          'auth': false,
          'error': err
        });
      });

  }

  app.post('/auth', handleAuth);
  app.get('/foo', getHandler);
  app.put('/bar', putHandler);

  app.listen(5000, function() {
    console.log('listening on port 5000');
  });

})()
