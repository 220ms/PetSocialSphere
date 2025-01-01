const express = require("express");
const userRouter = require("./Routes/userRoutes.js");
const postRouter = require("./Routes/postsRoutes.js");
const cors = require("cors");
const globalErrorHandler = require("./Controllers/errorController.js");
const app = express();
app.use(express.json());
app.use(
  cors({
    orgin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use(globalErrorHandler);
module.exports = app;
