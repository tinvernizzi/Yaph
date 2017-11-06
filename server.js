const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

app.use(express.static(__dirname + '/src'));

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});


var sequelize = new Sequelize("_databaseName_", "_username_", "_password_", {
    dialect: 'sqlite',
    storage: "database.sqlite"
});

var User = sequelize.define('User',
    {
        key: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING
    })

User.sync();

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.find({where: {key: id}}).then(function(user){
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback"
    },

    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ where: { username: profile.displayName, key: profile.id }},);
        console.log('User : ' + profile.displayName);
        return cb(null, profile);
    })
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/loginError.html'
    })
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/notLoggedIn.html'), // Le paramétre de ensureLoggedIn est l'adresse de redirection si l'user n'est pas connecté
    function(req, res){
        console.log('Loading profile');
        res.redirect('/myProfile.html');
    });
