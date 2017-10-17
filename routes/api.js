var twitter = require('../oauth/twitter-request');
var { User } = require('../models');
require('dotenv').config();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');

var toneAnalyzer = new ToneAnalyzerV3({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: '2016-05-19'
});

module.exports = function(express) {
  let router = express.Router();

  router.get('/oauth/authurl', (req, res) => {
    twitter.getAuthUrl((url, reqData) => {
      res.redirect(url);
    });
  });

  router.get('/oauth/confirm', (req, res) => {
    twitter.getAccessToken({ token: req.query.oauth_token, verifier: req.query.oauth_verifier },
    (userData) => {
      if (userData.screen_name && userData.user_id) {
        User.upsert({ screenName: userData.screen_name, userId: userData.user_id, oauthToken: userData.oauth_token, oauthTokenSecret: userData.oauth_token_secret }).then((inserted) => {
          req.session.user_id = userData.user_id;
          req.session.save(() => res.redirect('/'));
        });
      }
    });
  });

  router.get('/signout', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

  router.get('/timeline', (req, res) => {
    if (req.session.user_id) {
      if (process.env.DUMMY_DATA) {
        res.json(JSON.parse(fs.readFileSync('./public/assets/json/timeline.json', 'utf-8')));
      } else {
        let options = { count: 5 };
        if (req.query.count) options.count = req.query.count;
        if (req.query.max_id) options.max_id = req.query.max_id;
        User.findOne({ where: { userId: req.session.user_id } }).then((user) => {
          twitter.sendRequest('get', 'statuses/home_timeline.json', options, { token: user.oauthToken, token_secret: user.oauthTokenSecret }, (timeline) => {
            let analyzedTimeline = [];
            for (let t in timeline) {
              toneAnalyzer.tone({ text: timeline[t].text, tones: 'emotion', sentences: false }, (err, response) => {
                analyzedTimeline[t] = {
                  created_at: timeline[t].created_at,
                  id_str: timeline[t].id_str,
                  text: timeline[t].text,
                  retweet_count: timeline[t].retweet_count,
                  favourites_count: timeline[t].favourites_count,
                  user: {
                    id_str: timeline[t].user.id_str,
                    name: timeline[t].user.name,
                    screen_name: timeline[t].user.screen_name,
                    profile_image_url: timeline[t].user.profile_image_url
                  },
                  tone: response
                };
                if (Object.values(analyzedTimeline).length === timeline.length) {
                  res.json(analyzedTimeline);
                }
              })
            }
          });
        });
      }
    } else {
      res.json({ error: 'Not authenticated' });
    }
  });

  return router;
};
