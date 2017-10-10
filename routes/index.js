module.exports = function(app, express) {
  app.use('/api', require('./api')(express));
}
