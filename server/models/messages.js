const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: String,   
  senderId: String,
  receiverId: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);