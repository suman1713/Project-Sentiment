const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
