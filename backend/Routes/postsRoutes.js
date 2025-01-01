const express = require("express");
const multer = require("multer");

const postsController = require("../Controllers/postsController.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() }); // Ensure this is correctly set up

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("File upload middleware is being executed");
    next();
  },
  upload.array("images"),
  postsController.addPost
);

router.get("/", postsController.getPosts);

module.exports = router;
