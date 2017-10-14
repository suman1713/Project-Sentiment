var Vue = require('vue');
var xhr = require('xhr');

const NONE = 0, SOME = 1, MORE = 2;

var timeline = new Vue({
  el: '#timeline',
  data: {
    feed: [],
    toneEmojis: {
      anger: '😡',
      disgust: '🤢',
      fear: '😱',
      joy: '😊',
      sadness: '😢'
    },
    controls: {
      anger: 1,
      disgust: 1,
      fear: 1,
      joy: 1,
      sadness: 1
    },
    options: [NONE, SOME, MORE]
  },
  filters: {
      truncate: function(text) {
          return text.slice(0, 20);
      }
  },
  methods: {
    retrieve: function() {
      xhr({ uri: '/api/timeline' }, function(err, resp, body) {
        timeline.feed = JSON.parse(body);
      });
    },
    nextPage: function() {
      let maxId = this.feed[this.feed.length - 1].id_str.replace(/(\d{2})$/, s => parseInt(s) - 1);
      xhr({ uri: '/api/timeline?max_id=' + maxId }, function(err, resp, body) {
        timeline.feed = timeline.feed.concat(JSON.parse(body));
      });
    },
    matchesSelection: function(tweet) {
      let tones = tweet.tone.document_tone.tone_categories[0].tones;
      let greatest = 0;
      let prominent = [];
      for (let t in tones) {
        if (tones[t].score > tones[greatest].score) greatest = t;
        if (tones[t].score > 0.3) {
          prominent.push(tones[t]);
        }
      }
      if (this.controls[tones[greatest].tone_id] == MORE) return true;
      for (let t in prominent) {
        if (this.controls[prominent[t].tone_id] == NONE) {
          return false;
        }
      }
      return true;
    }
  }
});

timeline.retrieve();
