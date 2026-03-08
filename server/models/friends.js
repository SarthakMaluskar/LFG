const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
    user1 : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    user2 : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('Friend', friendsSchema);