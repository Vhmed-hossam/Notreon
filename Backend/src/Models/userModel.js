import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  myhobby: {
    type: String,
    default: "",
    enum: [
      "",
      "art_crafts",
      "software_developer",
      "video_games",
      "reading",
      "music",
      "photography",
      "writing_blogging",
      "penetration_testing",
      "designer"
    ],
  },
  knewaboutusby: {
    type: String,
    default: "",
    enum: [
      "",
      "search_engine",
      "social_media",
      "friend_family",
      "online_ad",
      "blog_article",
      "youtube_video",
      "event",
      "review_site",
      "email_newsletter",
      "other"
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
