const mongoose = require("mongoose");
const verificationCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes"
);
module.exports = VerificationCodeModel;
