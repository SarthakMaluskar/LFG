//all package imports

const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const User = require('./models/users')
const Post = require('./models/posts')
const Comment = require('./models/comments')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user dissconnected", socket.id);
    });
});

//all func imports

const requireAuth = require("./middleware/authMiddleware");

// all app.use
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());




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

app.get('/api/userInfo/:id',async (req,res)=>{
    const userId = req.params.id;

    const user =await User.findById(userId).select("-password");
    res.json(user);
    console.log(user);
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    //user creds checked
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: "wrong password" })
    }

    //we create a token and create a cookieeeeeeeeeee lets gooooo
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ success: true })
})

app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "lax"
    });

    res.json({ message: "Logged out successfully" });
});

app.post('/api/signup', async (req, res) => {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hello world")
    try {
        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("token generated", token)
        res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
        console.log("res.cookie at /signup", res.cookie);

        return res.status(200).json({ isSignedIn: true });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ isSignedIn: false })
    }


})

app.get('/api/posts', requireAuth, async (req, res) => {
    const { game } = req.query;
    const filter = game === "All Games" ? {} : { game };
    
    // Chained .sort({ createdAt: -1 }) to get newest posts first
    const posts = await Post.find(filter)
        .populate("author", "username")
        .sort({ createdAt: -1 }); 
        
    const id = req.userId;
    const user = await User.findById(id);
    
    res.json({posts : posts, userId : req.userId, username : user.username});
});
// 
app.post('/api/posts', requireAuth, async (req, res) => {
    console.log(req.userId);

    const { title, description, selectedGame, tags } = req.body;
    const newPost = new Post({
        title: title,
        description: description,
        game: selectedGame,
        tags: tags,
        author: req.userId
    })

    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
})

app.delete('/api/posts/:id', requireAuth, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(400).json({ message: "post to be deleted not found" });
    }

    console.log("POST AUTHOR:", post.author.toString());
    console.log("REQ USER ID:", req.userId);

    if (post.author.toString() !== req.userId) {
        return res.status(401).json({ message: "unauthorized" });
    }

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({
        message: "Post deleted successfully",
        postId,
    });

})

app.get('/api/me', (req, res) => {
    const token = req.cookies.token;
    console.log(req.cookie)
    console.log("/me func call", token)
    if (!token) {
        return res.status(401).json({ authenticated: false });
    }
})

app.post('/api/postDetails/:postId/comment', requireAuth, async (req, res) => {
    //api to comment on a post
    const postId = req.params.postId;
    const comment = req.body.comment;
    console.log(comment);
    console.log(req.userId)
    const newComment = new Comment({
        text: comment,
        postId: postId,
        userId: req.userId
    })

    await newComment.save();

    console.log("done saving the commnet to the backend")
    return res.status(201).json({ msg: "success" })

})

//api for details of a single post
app.get('/api/postDetails/:postId', requireAuth , async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    
    // Chained .sort() to get the newest comments first
    const comments = await Comment.find({ postId: postId })
        .populate('userId', 'username')
        .sort({ createdAt: -1 }); 
        
    console.log("got post and comments");
    
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }

    console.log(req.userId);
    res.status(200).json({ post: post, comments: comments, userId : req.userId });
});


app.delete('/api/postDetails/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    console.log(commentId)
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ msg: "comment deleted" });
})