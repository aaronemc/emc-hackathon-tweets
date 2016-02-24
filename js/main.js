'use strict'


$(document).ready(function () {
    console.log('ready!')


    // do twitter auth
    $.ajax({
        method: 'POST',
        url: '/auth',
        data: {}
    })
        .done(function (result) {
            console.log('success', result);
        })
        .fail(function (error) {
            console.log('error', error);
        })


})