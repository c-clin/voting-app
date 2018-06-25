const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String
});

mongoose.model('users', UserSchema);
