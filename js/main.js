'use strict'


$(document).ready(function () {
    console.log('ready!')

    const minutesBetweenTweetFetch = 10
    const msBetweenTweets = 15000
    let saveTweets = []
    let lastTweetFetchMom


    let getTweets = () => {
        let def = Q.defer()

        // let's only fetch new tweets every 10 minutes or so
        if (!lastTweetFetchMom || moment().diff(lastTweetFetchMom, 'minutes') >= minutesBetweenTweetFetch) {
            console.log('fetching new tweets')
            $.ajax({
                method: 'GET',
                url: '/tweets',
                data: {}
            })
                .done(function (tweets) {
                    console.log(`found ${tweets.statuses.length} twerts`)
                    saveTweets = tweets.statuses
                    def.resolve(tweets.statuses)
                    lastTweetFetchMom = moment()
                })
                .fail(function (error) {
                    console.log('error', error);
                    def.reject(error)
                })
        } else {
            console.log('not time to fetch new twerts yet')
            def.resolve(saveTweets)
        }

        return def.promise
    }


    let rotateTweets = () => {
        return getTweets()
            .then((tweets) => {
                let count = 0
                let numberedTweets = _.map(tweets, (tweet) => {
                    tweet.emcIndex = count++
                    return tweet
                })
                let promiseFunctions = _.map(numberedTweets, (tweet) => {
                    return () => {
                        return Q()
                            .then(() => {
                                // decide which one needs updating
                                let prefix = tweet.emcIndex % 2 == 0 ? '.second' : '.first'
                                console.log('prefix', prefix)
                                let timeStr = moment(Date.parse(tweet.created_at)).fromNow()
                                $(`${prefix} .text`).html(tweet.text)
                                $(`${prefix} .name`).html(tweet.user.name)
                                $(`${prefix} .image`).attr('src', tweet.user.profile_image_url)
                                $(`${prefix} .time`).html(timeStr)
                            })
                            .then(() => {
                                // now hide the shown one, and show the hidden one
                                console.log('count', tweet.emcIndex)
                                if (tweet.emcIndex % 2 == 0) {
                                    console.log('one')
                                    $('.first').css('opacity', 0)
                                    $('.second').css('opacity', 1)
                                } else {
                                    console.log('two')
                                    $('.second').css('opacity', 0)
                                    $('.first').css('opacity', 1)
                                }
                                return Q.delay(msBetweenTweets)
                            })
                            .then(() => {

                            })
                            .catch((err) => {
                                console.log('error', err)
                            })
                    }
                })

                return promiseFunctions.reduce(Q.when, Q())
            })
    }


    var cycleForever = () => {
        return rotateTweets()
            .then(() => {
                return Q.delay(1000)
            })
            .then(() => {
                return cycleForever()
            })
    }

    cycleForever()


})