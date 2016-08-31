#!/usr/bin/env node
'use strict'

const express = require('express')
const TwitterStream = require('twitter-stream-api')

module.exports = (() => {

    let port = 5000
    const streamFollow = 'nytimes'
    const streamTrack = 'trump'

    const myconsumerKey = 'H0ULfCMzkIc40VHPgZfZKsQ07'
    const myconsumerSecret = '7YUfCQ1HSPg26Fk23GRrxsA2sXcUzXkWIJsuQNLlKxsYh8AAb9'
    const mytwitterAuthKey = '74664919-yeGrN5D9n5ke1KYQWMULrYM91byWeW07s56EsdsO7'
    const mytwitterAuthSecret = 'Tj1o7OF4UcHGudeYzekMYYPypEiohQls1azSAS3tghqf9'

    var keys = {
        consumer_key: myconsumerKey,
        consumer_secret: myconsumerSecret,
        token : mytwitterAuthKey,
        token_secret : mytwitterAuthSecret
    }
    let init = () => {
        let app = express()
        app.use(express.static('.'))
        let http = require('http').Server(app)
        let io = require('socket.io')(http)

        let connectionsArray = []
        let  updateSockets = (data) => {
            connectionsArray.forEach(function(tmpSocket) {
                tmpSocket.volatile.emit('notification', data);
            })
        }

        var Twitter = new TwitterStream(keys, false);
        Twitter.stream('statuses/filter', {
            track: streamTrack //,
            //           follow : streamFollow
        });

        //Initial connection
        Twitter.on('connection success', function (uri) {
            console.log('connection success', uri);
        });

        // This event is triggered when there is a tweet in the stream
        Twitter.on('data', function (obj) {
            console.log('data');
            let metaTweet = JSON.parse(obj.toString())
            console.log(metaTweet.text)
            updateSockets({
                data: metaTweet
            })
        });

        //These events to handle errors pushed from the stream.
        Twitter.on('connection error network', function (error) {
            console.log('connection error network', error);
        });
        Twitter.on('connection error stall', function () {
            console.log('connection error stall');
        });
        Twitter.on('connection error http', function (httpStatusCode) {
            console.log('connection error http', httpStatusCode);
        });
        Twitter.on('connection error unknown', function (error) {
            console.log('connection error unknown', error);
            Twitter.close();
        });
        // Twitter.debug(function (reqObj) {
        //     require('request-debug')(reqObj, function (type, data, req) {
        //         console.log(type, data, req);
        //     });
        // });

        //WebSocket push to UI
        io.on('connection', function(socket){
            console.log('socket io - a user connected')
            connectionsArray.push(socket);
            console.log('Number of connections:' + connectionsArray.length);

            socket.on('disconnect', function(){
                var socketIndex = connectionsArray.indexOf(socket);
                console.log('socket = ' + socketIndex + ' disconnected');
                if (socketIndex >= 0) {
                    connectionsArray.splice(socketIndex, 1);
                }
            })

        })
        console.log(`listening on ${port}`)
        http.listen(port)
    }
    init()
})()