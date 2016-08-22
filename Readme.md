EMC Hackathon Tweets!
-----

## Step 3

This step adds the server-side code to deal with twitter authentication

1. index.html - Displays authenticated status true | false
2. app.js - When the controller loads (when the page loads), it calls /auth, which does authentication with twitter to get a key, then responds with JSON containing  `{auth : true}`
3. server.js - Adds the /auth endpoint, which will call the twitter auth API to get a key.  If you're feeling brave, read more about twitter [twitter oauth here](https://dev.twitter.com/oauth/application-only)
Install packages with `npm install`

4. Next, add an API to server.js called /tweets, that calls the twitter search HTTP API and returns tweets

Start your server with
`node server.js`

Then point your browser to `http://localhost:5000`

## Whats happening here?
1. index.html loads in the browser and pulls in the `<script>` tags one by one and executes them
2. When **app.js** is loaded, the angular app initializes
3. The **main-controller** initializes and uses `$http` to send a **POST** `/auth` to our node server listening on port **5000**
4. Our node server handles the `/auth` **POST**.  It then does a separate POST to the twitter authentication API, and handles the response.
5. The node server handles the auth response from twitter, and responds to the browser
6. The angular app handles the response from our node server and sets the `hasAuthenticated` variable on scope
7. The UI displays hasAuthenticated
8. Detailed overview of twitter oauth [here](https://dev.twitter.com/oauth/application-only)

The server APIs look like this:

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
