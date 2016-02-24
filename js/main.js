'use strict'


$(document).ready(function () {
    console.log('ready!')

    const consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc'
    // todo, this isn't secure
    const consumerSecret = 'OQmDIdT3xRtvVyolAUmuqzCj8xAVrNiskk0LgRrYZ08yqSXHHU'

    // do twitter auth
    $.ajax({
        method: 'POST',
        url: 'https://api.twitter.com/oauth2/token',
        data: {}
    })
        .done(function (result) {
            console.log('success', result);
        })
        .fail(function (error) {
            console.log('error', error);
        })


})