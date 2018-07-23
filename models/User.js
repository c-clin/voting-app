const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  name: String,
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  }
});

mongoose.model('users', UserSchema);
