const mongoose = require("mongoose");
const { thirtyDaysFromNow } = require("../utils/date");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true, default: thirtyDaysFromNow },
  },
  { timestamps: true }
);
exports.SessionModel = mongoose.model("Session", sessionSchema);
