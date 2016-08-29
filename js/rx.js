/**
 * Created by selvag on 8/29/2016.
 */
var Rx = require('rxjs/Rx')

const consumerKey = 'yYfHaXtb1rHW06TvalYgqHmTc'

const twitterSearchAPI = 'https://api.twitter.com/1.1/search/tweets.json'
const twitterSearchString = 'from:guychurchward OR @emc OR #emc'

let getTweets = (req, res, next) => {
    let searchTweetsReq = {
        'request': 'GET',
        'headers': {
            'Authorization': 'Bearer ' + twitterAuthToken
        },
        'uri': twitterSearchAPI,
        'qs': {
            'q': twitterSearchString,
            'count': 50
        },
        json: true
    }

    restClient(searchTweetsReq)
        .then((tweets) => {
        console.log(JSON.stringify(tweets, null, '  '))
    res.json(tweets)
})
.catch((err) => {
        res.status(500).json({'error': err})
    console.log('error', err)
})

    var requestStream = Rx.Observable.just(twitterSearchAPI + '?' + twitterSearchString)

}
