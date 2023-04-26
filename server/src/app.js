const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const path = require('path');
const api = require('./routes/api');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { OAuth2Strategy } = require('passport-google-oauth');

require('dotenv').config();

const app = express(); 

const AUTH_CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
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
 
// Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((obj, done) => {
    done(null, id);
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(helmet());

app.use(cookieSession({
    name: 'session',
    keys: [ AUTH_CONFIG.COOKIE_KEY_1, AUTH_CONFIG.COOKIE_KEY_2 ],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html', ));
});

const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = req.isAuthenticated() && req.user; 
    if (!isLoggedIn) {
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
    session: true,
}), (req, res) => {
    console.log('Google called us back!')
});

app.get('/failure', (req, res) => {
    return res.send('Failed to log in!')
});

app.get('/auth/logout', (req, res) => {
    req.logout(); // removes req.user and clears session
    return res.redirect('/');
});

module.exports = app;