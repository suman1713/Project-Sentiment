var { sequelize, User } = require('./models');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var store = new SequelizeStore({ db: sequelize });

store.sync().then(() => {
  User.sync().then(() => {
    sequelize.close(); process.exit();
  });
});
