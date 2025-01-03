const jsonwebtoken = require("jsonwebtoken"); // Import the default export directly

exports.defaults = {
  audience: ["user"],
};
exports.accessTokenSignOptions = {
  expiresIn: "15m",
  secret: process.env.JWT_SECRET,
};
exports.refreshTokenSignOptions = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET,
};

const signToken = (payload, options) => {
  const { secret, ...signOpts } = options || exports.accessTokenSignOptions;
  return jsonwebtoken.sign(payload, secret, {
    // Use jsonwebtoken directly here
    ...exports.defaults,
    ...signOpts,
  });
};
exports.signToken = signToken;

const verifyToken = (token, options) => {
  const { secret = process.env.JWT_SECRET, ...verifyOpts } = options || {}; // Make sure secret is correctly accessed
  try {
    const payload = jsonwebtoken.verify(token, secret, {
      // Use jsonwebtoken directly here
      ...exports.defaults,
      ...verifyOpts,
    });
    return { payload };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
exports.verifyToken = verifyToken;
