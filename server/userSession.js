const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  startedAt: String,
  type: String,
  duration: String,
  workingOn: String,
});

const userSessionSchema = new mongoose.Schema({
  logs: [logSchema],
}, {collection : "usersessions"});

const UserSession = mongoose.model("UserSession", userSessionSchema);
module.exports = UserSession;
