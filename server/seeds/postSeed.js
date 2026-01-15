const mongoose = require("mongoose");
const Post = require("../models/posts");

// 👉 CHANGE THIS
const MONGO_URI = "mongodb://localhost:27017/LFG";

// 👉 put a REAL user id from your users collection
const USER_ID = new mongoose.Types.ObjectId('6939405deac019da2a5b8778');

const seedPosts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Post.deleteMany();
    console.log("Old posts removed");

    const posts = [
      {
        title: "Looking for Valorant Duo",
        description: "Gold rank player, chill games only. Mic required.",
        game: "VALORANT",
        author: USER_ID,
        tags: ["PC", "18+"],
        likes: []
      },
      {
        title: "BGMI squad needed",
        description: "Need aggressive players for classic matches.",
        game: "PUBG",
        author: USER_ID,
        tags: ["MOBILE"],
        likes: []
      },
      {
        title: "Terraria co-op world",
        description: "Starting a fresh world, beginners welcome.",
        game: "TERRARIA",
        author: USER_ID,
        tags: ["PC"],
        likes: []
      },
      {
        title: "Late night Valorant grind",
        description: "Playing after 11 PM IST, ranked only.",
        game: "VALORANT",
        author: USER_ID,
        tags: ["PC", "18+"],
        likes: []
      }
    ];

    await Post.insertMany(posts);
    console.log("Posts seeded successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedPosts();
