const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
  title: String,
  description : String,
  game : {
    type : String,
    enum : ["PUBG","VALORANT","TERRARIA"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tags : [{
    type : String,
    enum : ["PC", "XBOX" , "18+","MOBILE"]
  }],
  likes : [{
    type : mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
