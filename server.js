#!/usr/bin/env node
'use strict'

const express = require('express')
const restClient = require('request-promise')
const Rx = require('rx/dist/rx.all.js')


module.exports = (() => {
    const consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc'

    // todo it would be better to read this in from a file that isn't checked in
    const consumerSecret = 'OQmDIdT3xRtvVyolAUmuqzCj8xAVrNiskk0LgRrYZ08yqSXHHU'
    const twitterAuthAPI = 'https://api.twitter.com/oauth2/token'
    const twitterSearchAPI = 'https://api.twitter.com/1.1/search/tweets.json'
    let twitterAuthToken = 'AAAAAAAAAAAAAAAAAAAAAA9LtwAAAAAAeihb7UwP%2B6hq8GZBlS0HKH%2Bu1qs%3DWAzj5p8Aq67HPskRnFi6ydvN0nogHIyH8Vg4znGo2dDiruNncC'

    let port = 5000

    const twitterSearchString = 'from:guychurchward OR @emc OR #emc OR #trump OR #hillary OR @bbcbreaking'
//    const twitterSearchString = 'from:@brownat1'

    function feedTweets(observer) {
        return rxquery(twitterSearchAPI + '?' + twitterSearchString).then(tweets => {
            observer.next(tweets);
            setTimeout( () => feedTweets(observer), 5000);
        }).catch(error => {
            console.log('AN ERROR ON CALL TO TWITTER')
            setTimeout( () => feedTweets(observer), 5000);
        });
    }

    let rxTweets = () => {

        var myObservable = Rx.Observable.create(observer => {
            feedTweets(observer);
        });

        var lastChecked = new Date();

        myObservable.subscribe(value => {
            var tweets = Rx.Observable.from(value.statuses.sort(function(a,b){
                var first = new Date(a.created_at).getTime();
                var second = new Date(b.created_at).getTime();
                if (first < second) {
                    return -1;
                } else if (first > second) {
                    return 1;
                } else {
                    return 0;
                }
            })).distinct();
            tweets
                .filter(tweet => {
                    var tweetTime = new Date(tweet.created_at);
                    if (tweetTime.getTime() > lastChecked.getTime()) {
                        lastChecked = tweetTime;
                        return true;
                    }
                    return false;
                })
                .subscribe(value =>  {
                    updateSockets({data: value})
                })
        })


        // console.log('rxTweets')
        // var requestStream = Rx.Observable.just(twitterSearchAPI + '?' + twitterSearchString)
        //
        // var responseStream = requestStream
        //     .flatMap(function (requestUrl) {
        //         return Rx.Observable.fromPromise(rxquery(requestUrl))
        //     })
        //
        // responseStream.subscribe(function (response) {
        //     if (connectionsArray.length) {
        //         var pollingTimer = setTimeout(rxTweets, 10000);
        //         console.log(JSON.stringify(response, null, '  '))
        //         updateSockets({
        //             data: response
        //         })
        //     }
        // })
    }

    let rxquery = (requestUrl) => {
        var uri = requestUrl.split('?')
        let searchTweetsReq = {
            'request': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + twitterAuthToken
            },
            'uri': uri[0],
            'qs': {
                'q': uri[1],
                'count': 50
            },
            json: true
        }

        return restClient(searchTweetsReq);

    }

    let handleAuth = (req, res, next) => {
        console.log('handling auth')

        let combinedString = encodeURIComponent(consumerKey) + ':' + encodeURIComponent(consumerSecret)
        let b64Encoded = (new Buffer(combinedString)).toString('base64')
        console.log('b64encoded', b64Encoded)

        let oauthPost = {
            'method': 'POST',
            'uri': twitterAuthAPI,
            'headers': {
                'Authorization': `Basic ${b64Encoded}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            'json': true,
            'body': 'grant_type=client_credentials'
        }

        restClient(oauthPost)
            .then((authResponse) => {
                console.log('successful response', authResponse)
                twitterAuthToken = authResponse.access_token
                res.json({'auth': true, 'data': authResponse})
            })
            .catch((err) => {
                console.log('auth error', err)
                res.status(500).json({'auth': false, 'error': err})
            })

    }


    let connectionsArray = []

    let  updateSockets = (data) => {
        connectionsArray.forEach(function(tmpSocket) {
            tmpSocket.volatile.emit('notification', data);
        })
    }

    let init = () => {

        let app = express()
        let http = require('http').Server(app)
        let io = require('socket.io')(http)

        app.use(express.static('.'))
        app.post('/auth', handleAuth)

        io.on('connection', function(socket){
            console.log('socket io - a user connected')
            connectionsArray.push(socket);
            console.log('Number of connections:' + connectionsArray.length);

            // starting the loop only if at least there is one user connected
            if (connectionsArray.length) {
                rxTweets()
            }
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

