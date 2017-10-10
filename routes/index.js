const path = require('path');

module.exports = function (app, express) {
  app.use('/', express.static(path.join(appRoot, 'public')));
  app.use('/', require('./views')(express));
  app.use('/api', require('./api')(express));
};
