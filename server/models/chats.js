
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  members: [String], // [user1, user2]
  lastMessage: String
}, { timestamps: true });


module.exports = mongoose.model("Chat", chatSchema);