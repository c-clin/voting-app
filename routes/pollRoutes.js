const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Poll = mongoose.model('poll');
const User = mongoose.model('users');

module.exports = app => {
  // @route   Get api/polls/all
  // @desc    Get a list of all polls
  // access   Public
  app.get('/api/polls/all', (req, res) => {
    Poll.find({}).then(polls => {
      res.send(polls);
    });
  });

  // @route   Post api/polls/create
  // @desc    Create a new poll
  // access   Private
  app.post('/api/polls/create', requireLogin, (req, res) => {
    const { question, answers } = req.body;
    const _user = req.user.id;
    console.log(answers);

    User.findOne({ _id: _user })
      .then(user => {
        if (user) {
          const poll = new Poll({
            _user: req.user.id,
            question,
            answers: answers
          });
          try {
            poll.save();
            res.send(poll);
          } catch (err) {
            res.status(422).send(err);
          }
        }
      })
      .catch(err => console.log(err));
  });
};
