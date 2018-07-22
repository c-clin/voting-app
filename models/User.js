const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  name: String
});

mongoose.model('users', UserSchema);
