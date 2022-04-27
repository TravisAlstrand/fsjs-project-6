// variables
const express = require('express');
const res = require('express/lib/response');
const data = require('./data');
const app = express();

// view engine setup
app.set('view engine', 'pug');

// middleware for accessing the req.body 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static middleware setup
app.use('/static', express.static('public'));

// home page route passing json data as locals
app.get('/', (req, res) => {
    res.render('index', {data});
});

// route to about page
app.get('/about', (req, res) => {
    res.render('about');
});

// dynamic routes to project pages
app.get('/project/:id', (req, res) => {

    // variable for project with id of the one requested in url
    const projectData = data.projects[req.params.id];

    // check if a project with this id doesn't exist
    if (projectData === undefined) {
        // if so, construct new error
        const err = new Error();
        // give page not found error status
        err.status = 404;
        // give user friendly message
        err.message = "I'm sorry, this project doesn't seem to exist!";
        // render 404 page, passing error
        res.render('page-not-found', {err});
    } else {
        // if it does exist, render the page passing data at id's index
        res.render('project', {projectData});
    }
});

// 404 handler
app.use((req, res) => {
    const err = new Error();
    err.status = 404;
    err.message = "I'm sorry, this page doesn't seem to exist!";
    res.render('page-not-found', {err});
})

// global error handler
app.use((err, req, res) => {
    if (err.status === 404) {
        next(err);
    } else {
        err.status = 500;
        err.message = "I'm sorry, something went wrong with the server!"
        res.render('error', {err});
    }
})

// app will listen on port 3000 and send message to the console
app.listen(3000, () => {
    console.log('The app is listening on port 3000');
});