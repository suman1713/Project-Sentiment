var request = require('request');
var qs = require('querystring');
require('dotenv').config();

var oauth = {
  callback: 'oob',
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET
};

module.exports.getAuthUrl = function getAuthUrl(cb) {
  request.post({ url: 'https://api.twitter.com/oauth/request_token', oauth }, (err, res, body) => {
    if (err) console.error(err);
    var reqData = qs.parse(body);
    var authUri = `https://api.twitter.com/oauth/authenticate?${qs.stringify({oauth_token: reqData.oauth_token})}`;
    cb(authUri, reqData);
  });
};

module.exports.getAccessToken = function getAccessToken(verify, cb) {
  request.post({ url: 'https://api.twitter.com/oauth/access_token', oauth: Object.assign({}, oauth, verify) }, (err, res, body) => {
    if (err) console.error(err);
    var reqData = qs.parse(body);
    cb(reqData);
  });
};

module.exports.sendRequest = function sendRequest(method, path, query, user_auth, cb) {
  request[method]({
    url: `https://api.twitter.com/1.1/${path}`,
    oauth: Object.assign({}, oauth, user_auth),
    qs: query, json: true
  }, (err, res, body) => {
    if (err) console.error(err);
    cb(body);
  });
};
