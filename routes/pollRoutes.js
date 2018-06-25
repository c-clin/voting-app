const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Poll = mongoose.model('poll');
const User = mongoose.model('users');

module.exports = app => {
  // @route   Post api/polls/create
  // @desc    Create a new poll
  // access   Private
  app.post('/api/polls/create', requireLogin, (req, res) => {
    const { question, answers } = req.body;

    User.findOne({ id: _user })
      .then(user => {
        if (user) {
          const poll = new Poll({
            _user: req.user.id,
            question,
            answers
          });

          try {
            poll.save();
            res.send('new poll saved');
          } catch (err) {
            res.status(422).send(err);
          }
        }
      })
      .catch(err => console.log(err));
  });
};
