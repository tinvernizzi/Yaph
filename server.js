const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

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

app.use(express.static(__dirname + '/www'));

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
        username: Sequelize.STRING,
        password: Sequelize.STRING
    })

User.sync();

var user = User.create({ username: "admin", password: "bolognese" });


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).success(function(user){
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
        console.log('Logging in :' + profile.displayName)
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