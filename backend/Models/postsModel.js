const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Attachment schema for media (videos/images)
const attachmentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"], // can be extended if needed
      required: true,
    },
    fileName: {
      type: String,
      required: true, // URL or file path to the media
    },
  },
  { timestamps: true }
);

// Post schema
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the User model (matches your usersModel.js)
      required: true,
    },
    content: {
      type: String,
      required: true, // Text content of the post
    },
    attachments: [attachmentSchema], // Array of attachments
    visibility: {
      type: String,
      enum: ["public", "private", "friends-only"],
      default: "public", // visibility of the post
    },
    likes: {
      type: Number,
      default: 0, // Number of likes
    },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "users" }, // Fixed to match "users"
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
