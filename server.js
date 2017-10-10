const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

require('./routes')(app, express);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
