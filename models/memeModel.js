const mongoose = require("mongoose");
//สร้างโครงสร้างของ Schema ในการเก็บข้อมูล Meme
const MemeSchema = new mongoose.Schema({
  urlname: {
    type: String,
    required: true,
  },

  reachCount: {
    type: Number,
    required: true,
  },

  likeCount: {
    type: Number,
    required: true,
  },

  commentCount: {
    type: Number,
    required: true,
  },

  shareCount: {
    type: Number,
    required: true,
  },

  viral: {
    type: Boolean,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Meme = mongoose.model("Meme", MemeSchema); //สร้าง collection ชื่อ Meme
module.exports = Meme; //export method เพื่อให้ Controller เชื่อมต่อกับ Model ในการสร้าง Function มา trigger
