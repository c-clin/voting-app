const passport = require('passport');
const randomString = require('randomstring');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = app => {
  /*

  // @route   Get auth/facebook
  // @desc    Login User
  // access   Private
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // @route   Get auth/facebook/callback
  // @desc    Login User
  // access   Private
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      console.log('logged in, ', req.user);
      res.redirect('/dashboard');
    }
  );

  // @route   Get api/logout
  // @desc    Logout current user
  // access   Private
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // @route   Get api/current_user
  // @desc    Get Current User Info
  // access   Private
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  // Google

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  */

  // Jwt Passport

  app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
          req.user.id = user.id;
        } else {
          res.status(400).json({ error: 'Password incorrect' });
        }
      });
    });
  });

  app.post('/api/register', (req, res) => {
    const userID = randomString.generate();

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      } else {
        const newUser = new User({
          name: req.body.name,
          userID,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw error;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
};
