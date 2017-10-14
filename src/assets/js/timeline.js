var Vue = require('vue');
var xhr = require('xhr');

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
    sliders: {
      anger: 1,
      disgust: 1,
      fear: 1,
      joy: 1,
      sadness: 1
    }
  },
  filters: {
      truncate: function(text, stop, clamp) {
          return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
      }
  },
  methods: {
    retrieve: function() {
      xhr({ uri: '/api/timeline' }, function(err, resp, body) {
        timeline.feed = JSON.parse(body);
      });
    },
    matchesSelection: function(tweet) {
      let tones = tweet.tone.document_tone.tone_categories[0].tones;
      for (let t in tones) {
        if (this.sliders[tones[t].tone_id] < tones[t].score) {
          return false;
        }
      }
      return true;
    }
  }
});

timeline.retrieve();
