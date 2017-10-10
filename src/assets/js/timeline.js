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
    }
  },
  methods: {
    retrieve: function() {
      xhr({ uri: '/assets/json/timeline.json' }, function(err, resp, body) {
        timeline.feed = JSON.parse(body);
      });
    }
  }
});

timeline.retrieve();
