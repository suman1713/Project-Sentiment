# twitter-request flow

Use the twitter-request methods like this:

```js

var twitter = require('./oauth/twitter-request');

twitter.getAuthUrl(function(url, reqData) {
  // Give url to the user
  // Use the secret and other credentials in reqData for getAccessToken
});
```
### Later, after the user grants access
```js
twitter.getAccessToken(
  verification, // Pass in the secret and other credentials from the reqData object, as well as the user's verification code
  function(reqData) {
    // We now have the credentials to perform API calls on the users behalf
  }
);
```
### After gaining the accessToken
```js
twitter.sendRequest(
  'get', // or post
  'statuses/home_timeline.json', // path
  { count: 5 }, // query object
  { access_token: 'blah' }, // user auth object
  function(body) {
    console.log(body); // JSON of the api call 
  }
);
```
