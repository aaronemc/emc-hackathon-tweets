# EMC Hackathon Tweets

## Tag: badass-step-09

This is the **final project**.  This step adds:
* the use of [SASS](http://sass-lang.com/) to make writing css even more fun
* the use of [grunt](http://gruntjs.com/), a javascript build tool for automating things
* the user of [bower])(https://bower.io/), a package manager for client-side dependencies



1. index.html - Displays authenticated status true | false
2. app.js - When the controller loads (when the page loads), it calls /auth, which does authentication with twitter to get a key, then responds with JSON containing  `{auth : true}`
3. server.js - Adds the /auth endpoint, which will call the twitter auth API to get a key.  If you're feeling brave, read more about twitter [twitter oauth here](https://dev.twitter.com/oauth/application-only)
4. This step includes the /tweets API which uses the [twitter search API](https://dev.twitter.com/rest/public/search) to search twitter for specific keywords and return a list of tweets
5. In **app.js** we're using the main controller to first call `/auth` then call `/tweets` and stick the data on $scope so it can be displayed in index.html
6. For reference : **An example tweet JSON record** is in example-tweet.json, and the full definition of each a tweet JSON record is [available here](https://dev.twitter.com/rest/reference/get/search/tweets)
7. Here we've added **main.css** and included it at the top of index.html


Ensure all the packages in package.json are installed by running `npm install`

**>>>NEW** Ensure all your client-side dependencies are installed by running `bower install`

**>>>NEW** Start your server with
`grunt`

Then point your browser to `http://localhost:5000`

**grunt** has taken control of running server.js.  Grunt is also handling the conversion of `*.scss` to `*.css` files, which the browser can understand.  Try changing one of the .scss files and watch what happens.


The server APIs look like this:

```
GET /tweets

{
    "search_metadata": {
        "completed_in": 0.007,
        "count": 50,
        "max_id": 726174093180018700,
        "max_id_str": "726174093180018688",
        "next_results": "?max_id=726146153826373631&q=from%3Aguychurchward%20OR%20%40emc%20OR%20%23emc&count=50&include_entities=1",
        "query": "from%3Aguychurchward+OR+%40emc+OR+%23emc",
        "refresh_url": "?since_id=726174093180018688&q=from%3Aguychurchward%20OR%20%40emc%20OR%20%23emc&include_entities=1",
        "since_id": 0,
        "since_id_str": "0"
    },
    "statuses": [
        {
            "contributors": null,
            "coordinates": null,
            "created_at": "Fri Apr 29 22:19:30 +0000 2016",
            "entities": {
                "hashtags": [
                    {
                        "indices": [
                            61,

 ...
```

```
POST /auth

response
{
    "auth": true,
    "data": {
        "access_token": "AAAAAAAAAAAAAAAAAAAAAA9LtwAAAAAAeihb7UwP%2B6hq8GZBlS0HKH%2Bu1qs%3DWAzj5p8Aq67HPskRnFi6ydvN0nogHIyH8Vg4znGo2dDiruNncC",
        "token_type": "bearer"
    }
}
```

```
GET /foo
curl http://localhost:5000/foo
{"hello":"world"}
```


```
PUT /bar
curl --request PUT --data '{"a": 1}' http://localhost:5000/bar
{"status":"OK"}
```

### The rest is up to you.  Get busy!
