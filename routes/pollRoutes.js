const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Poll = mongoose.model('poll');

module.exports = app => {
  // @route   Post api/polls/create
  // @desc    Create a new poll
  // access   Private
  app.post('/api/polls/create', requireLogin, (req, res) => {
    console.log(req.body);
  });
};
