const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  { strict: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
