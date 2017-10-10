var xhr = require('xhr');

xhr({ uri: '/api/oauth/authurl' }, function (err, resp, body) {
  document.getElementById('login').setAttribute('href', JSON.parse(body).auth_url);
});
