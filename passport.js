var queries = require('./db/queries.js');
var passport = require('passport')
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var knex = require('./db/knex_config')
require('dotenv').config()

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

var GOOGLE_CLIENT_ID = "846943741871-q6ec50gbaeav9qhlfig6npoi0kcjrf5h.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET = "Z65eW_mtGO7kJngEYEJ6z5T7";

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      return knex('users').where('id', profile.id)
            .then(function(user) {
                if (user.length > 0) {
                    console.log('It worked and didnt add a new user')
                    return done(null, user)
                } else {
                    console.log("it added a new user", user.length)
                    return knex('users').insert({
                            id: profile.id,
                            token: accessToken,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            photo: profile.photos[0].value
                        })
                        .then((noflexzone) => {
                            return done (null, profile)
                        })
                    //console.log(profile)
                }
            })

        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        // return done(null, profile);

    }
));

module.exports = {
  passport: passport,

  //route middleware to ensure user is authenticated
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('user is authenticated')
        return next();
    } else {
        console.log('ensure authenticated didnt work')
        res.redirect('/login');
    }
}
}
