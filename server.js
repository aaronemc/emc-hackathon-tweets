#!/usr/bin/env node
'use strict'

const express = require('express')
const restClient = require('request-promise')
const Rx = require('bower/lib/node_modules/rx-lite/rx.lite')


module.exports = (() => {
    const consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc'

    // todo it would be better to read this in from a file that isn't checked in
    const consumerSecret = 'OQmDIdT3xRtvVyolAUmuqzCj8xAVrNiskk0LgRrYZ08yqSXHHU'
    const twitterAuthAPI = 'https://api.twitter.com/oauth2/token'
    const twitterSearchAPI = 'https://api.twitter.com/1.1/search/tweets.json'
    let twitterAuthToken = 'AAAAAAAAAAAAAAAAAAAAAA9LtwAAAAAAeihb7UwP%2B6hq8GZBlS0HKH%2Bu1qs%3DWAzj5p8Aq67HPskRnFi6ydvN0nogHIyH8Vg4znGo2dDiruNncC'

    let port = 5000

    const twitterSearchString = 'from:guychurchward OR @emc OR #emc'


    let getTweets = (req, res, next) => {

        console.log('getTweet')
        rxTweets()
        res.json('Hack')

    }

    let rxTweets = () => {
        console.log('rxTweet')
        var requestStream = Rx.Observable.just(twitterSearchAPI + '?' + twitterSearchString)
        //requestStream.subscribe(function(requestUrl) {

        var responseStream = requestStream
            .flatMap(function (requestUrl) {
                return Rx.Observable.fromPromise(rxquery(requestUrl))
            })

        responseStream.subscribe(function (response) {
            console.log('Response HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK HACK')
            console.log(JSON.stringify(response, null, '  '))
        })
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

    let init = () => {
        let app = express()
        app.use(express.static('.'))

        app.post('/auth', handleAuth)
        app.get('/tweets', getTweets)

        console.log(`listening on ${port}`)
        app.listen(port)
    }

    init()

})()

