const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  question: String,
  answers: [String],
  votedBy: {
    type: [String],
    default: []
  }
});

mongoose.model('poll', PollSchema);
