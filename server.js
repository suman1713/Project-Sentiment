const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Sequelize, sequelize } = require('./models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

global.appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || '4cf661da78514080ad314c3160a127eb';

var app = express();

app.use(session({
  secret: COOKIE_SECRET,
  store: new SequelizeStore({ db: sequelize }),
  resave: false,
  saveUninitialized: false
}));

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app, express);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
