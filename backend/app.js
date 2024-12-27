const express = require("express");
const userRouter = require("./Routes/userRoutes.js");
const cors = require("cors");

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

module.exports = app;
