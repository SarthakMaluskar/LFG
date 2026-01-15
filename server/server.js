//all package imports

const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const User = require('./models/users')
const Post = require('./models/posts')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");


//all func imports

const requireAuth = require("./middleware/authMiddleware");

// all app.use
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}));
app.use(express.json());




mongoose.connect('mongodb://localhost:27017/LFG')
    .then(() => {
        console.log('✅ Mongoose connected successfully');
    })
    .catch((error) => {  // Always catch the error parameter!
        console.log('❌ Mongoose connection error:', error.message);
    });

app.listen(5000, () => {
    console.log("server running on port 5000")
})

app.get('/api', (req, res) => {
    res.json({ users: ["user1", "user2", "user3", "user4"] })
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    
    if (!user) {
    return res.status(401).json({ msg: "Invalid credentials" });
    }

    if(password == user.password){
        console.log("logged in")
    }
    //user creds checked

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
    
    res.cookie("token", token, {httpOnly : true, sameSite : "strict"});
    res.json({succress : true})
})

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({
        username: username,
        password: password
    })
    const savedUser = await newUser.save()
})

app.get('/api/posts', async (req, res) => {
    const { game } = req.query;
    const filter = game === "All Games" ? {} : { game };
    const posts = await Post.find(filter).populate("author", "username");
    
    res.json(posts)

})

app.post('/api/posts', requireAuth ,async (req, res) => {
    console.log(req.userId);

    const {title,description,selectedGame,tags} = req.body;
    const newPost = new Post({
        title : title,
        description : description,
        game : selectedGame,
        tags : tags,
        author : req.userId
    })

    await newPost.save();
})

app.delete('/api/posts/:id', requireAuth ,async (req,res)=>{
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if(!post){
        return res.status(400).json({message : "post to be deleted not found"});
    }

    console.log("POST AUTHOR:", post.author.toString());
    console.log("REQ USER ID:", req.userId);

    if(post.author.toString() !== req.userId){
        return res.status(401).json({message : "unauthorized"});
    }

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({
      message: "Post deleted successfully",
      postId,
    });

})