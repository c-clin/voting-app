const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  answers: [String],
  votedBy: [String]
});

mongoose.model('poll', PollSchema);
