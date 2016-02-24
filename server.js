#!/usr/bin/env node
'use strict'

const express = require('express')


module.exports = (() => {
    let port = 9876


    let init = () => {
        let app = express()
        app.use(express.static('.'))
        console.log(`listening on ${port}`)
        app.listen(port)
    }

    init()

})()

