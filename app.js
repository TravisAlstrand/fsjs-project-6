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
    res.render('index', data.projects);
});

// route to about page
app.get('/about', (req, res) => {
    res.render('about');
});

// dynamic routes to project pages
app.get('/project/:id', (req, res, next) => {
    // check if a project with this id exists
    if (data[req.params.id]) {
        // if so, render the page passing data at id's index
        res.render('project', data.projects[req.params.id])
    } else {
        // if not construct new error
        const err = new Error();
        // give page not found error status
        err.status = 404;
        // give user friendly message
        err.message = "I'm sorry, this project doesn't seem to exist!";
        // continue, passing error
        next(err);
    }
});

// 404 handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "I'm sorry, this page doesn't seem to exist!";
    next(err);
})

// global error handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        next(err);
    } else {
        err.status = 500;
        err.message = "I'm sorry, something went wrong with the server!"
        next(err);
    }
})

// app will listen on port 3000 and send message to the console
app.listen(3000, () => {
    console.log('The app is listening on port 3000');
});