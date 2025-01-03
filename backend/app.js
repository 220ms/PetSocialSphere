const express = require("express");
const userRouter = require("./Routes/userRoutes.js");
const postRouter = require("./Routes/postsRoutes.js");
const authRouter = require("./Routes/authRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/authenticate.js");
const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
console.log(authenticate);
app.use("/api/v1/users", authenticate, userRouter);
app.use("/api/v1/posts", authenticate, postRouter);

app.use(errorHandler);
module.exports = app;
