var twitter = require('../oauth/twitter-request');

module.exports = function(express) {
  let router = express.Router();

  router.get('/oauth/authurl', (req, res) => {
    twitter.getAuthUrl((url, reqData) => {
      res.json({ auth_url: url });
      console.log(reqData);
    });
  });

  router.get('/oauth/confirm', (req, res) => {

    console.log(req.body);
    console.log(req.query);
  });

  router.post('/oauth/timeline', (req, res) => {
    twitter.sendRequest('get', 'statuses/home_timeline.json', {}, { oauth_token: req.body.oauth_token, oauth_token_secret: req.body.oauth_token_secret }, (timeline) => {
      res.json(timeline);
    });
  });

  return router;
};
