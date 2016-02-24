'use strict'


$(document).ready(function () {
    console.log('ready!')


    // do twitter auth
    $.ajax({
        method: 'GET',
        url: '/tweets',
        data: {}
    })
        .done(function (result) {
            console.log('success', result);
        })
        .fail(function (error) {
            console.log('error', error);
        })


})