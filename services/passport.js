const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

/*
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'name'],
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ userID: profile.id }).then(user => {
        if (user) {
          return done(null, user);
        } else {
          const name = profile.name.givenName + ' ' + profile.name.familyName;
          new User({ userID: profile.id, name })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ userID: profile.id }).then(user => {
        if (user) {
          return done(null, user);
        } else {
          const name = profile.name.givenName + ' ' + profile.name.familyName;
          new User({ userID: profile.id, name })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opt, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);
