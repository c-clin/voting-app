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

  // @route   Post api/polls/user
  // @desc    Get all polls made by the current user
  // access   Private
  app.get('/api/polls/user', (req, res) => {
    Poll.find({ _user: req.user.id }).then(polls => {
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

  // @route   Post api/polls/vote
  // @desc    Vote on a poll
  // access   Private
  app.post('/api/polls/vote', requireLogin, (req, res) => {
    const { index, _id } = req.body;

    Poll.findOne({ _id }).then(poll => {
      if (poll) {
        if (poll.votedBy.includes(req.user.id)) {
          res.status(422).send({ error: 'You already voted!' });
        } else {
          poll.answers[index].votes++;
          console.log(poll.answers[index]);
          poll.votedBy.push(req.user.id);

          try {
            poll.save();
            res.send(poll);
          } catch (err) {
            res.status(422).send(err);
          }
        }
      }
    });
  });

  // @route   Post api/polls/delete
  // @desc    Delete an existing poll
  // access   Private

  app.post('/api/polls/delete', requireLogin, (req, res) => {
    const { _id } = req.body;

    Poll.findOneAndRemove({ _id }, (err, doc) => {
      if (err) console.log(err);
      res.redirect(200, '/dashboard');
    });
  });
};
