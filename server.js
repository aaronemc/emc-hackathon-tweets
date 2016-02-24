#!/usr/bin/env node
'use strict'

const express = require('express')
const restClient = require('request-promise')


module.exports = (() => {
    const consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc'

    // todo it would be better to read this in from a file that isn't checked in
    const consumerSecret = 'OQmDIdT3xRtvVyolAUmuqzCj8xAVrNiskk0LgRrYZ08yqSXHHU'
    const twitterAuthAPI = 'https://api.twitter.com/oauth2/token'

    let port = 9000

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
        console.log(`listening on ${port}`)
        app.listen(port)
    }

    init()

})()

