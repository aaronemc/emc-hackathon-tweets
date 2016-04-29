EMC Hackathon Tweets!
-----

## Tag: badass-step-02

You have a minimal working angular client and server:

1. index.html - You have an index.html page that calls a rest API and displays the data with angular
2. app.js - You have a controller that calls a REST API and puts data on $scope
3. server.js - You have an express.js HTTP server with two endpoints: GET /foo and PUT /bar

Install packages with `npm install`

Start your server with
`node server.js`

Then point your browser to `http://localhost:5000`

The APIs look like this:

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
