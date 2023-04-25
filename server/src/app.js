const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const path = require('path');
const app = express(); 
const api = require('./routes/api');
const passport = require('passport');
const { OAuth2Strategy } = require('passport-google-oauth');

require('dotenv').config();

const AUTH_CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: AUTH_CONFIG.CLIENT_ID,
    clientSecret: AUTH_CONFIG.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('Profile', profile);
    done(null, profile);
}
 
passport.use(new OAuth2Strategy(AUTH_OPTIONS, verifyCallback));

// app.use(helmet());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(passport.initialize());

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html', ));
});

const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = true;
    if (isLoggedIn) {
        return res.status(401).json({
            error: 'You are not logged in'
        });
    }
    next();
}
 
app.get('/secret', checkLoggedIn, (req, res, next) => {
    return res.send('Your personal secret has been sent.')
});


app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false,
}), (req, res) => {
    console.log('Google called us back!')
});

app.get('/failure', (req, res) => {
    return res.send('Failed to log in!')
});

app.get('/auth/logout', (req, res) => {

});

module.exports = app;