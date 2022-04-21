// variables
const express = require('express');
const data = require('./data');
const app = express();

// view engine setup
app.set('view engine', 'pug');

/* middleware for accessing the req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static middleware setup
app.use('/static', express.static('public'));

// home page route
app.get('/', (req, res) => {
    res.render('index');
});

// route to about page
app.get('/about', (req, res) => {
    req.redirect('/about');
});

app.listen(3000, () => {
    console.log('The app is listening on port 3000');
});