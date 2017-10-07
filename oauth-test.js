require('dotenv').config();

var { OAuth2 } = require('oauth');

const TWITTER_KEY = process.env.TWITTER_KEY;
const TWITTER_SECRET = process.env.TWITTER_SECRET;

var oauth2 = new OAuth2(TWITTER_KEY, TWITTER_SECRET,
  'https://api.twitter.com/',
  null,
  'oauth2/token',
  null);

oauth2.getOAuthAccessToken(
  '',
  {'grant_type': 'client_credentials'},
  function(e, access_token, refresh_token, results) {
    console.log('bearer: ', access_token);
  }
)
