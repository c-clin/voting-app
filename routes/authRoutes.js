const passport = require('passport');

module.exports = app => {
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
      res.redirect('/');
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
};
