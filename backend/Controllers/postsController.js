const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Post = require("../Models/postsModel");
const catchAsync = require("../utils/catchAsync");
const dotenv = require("dotenv");
const crypto = require("crypto");
const User = require("../Models/usersModel");

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// Function to generate a random file name
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

exports.addPost = catchAsync(async (req, res, next) => {
  console.log("HELLO");
  const content = req.body.content;
  const userId = req.body.userId;
  const files = req.files; // Get uploaded files

  const attachments = [];

  if (files && files.length > 0) {
    // Create an array of promises for file uploads
    const uploadPromises = files.map((file) => {
      const fileBuffer = file.buffer;
      const fileName = randomImageName();
      const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: file.mimetype,
      };

      // Return the promise for file upload
      return s3Client
        .send(new PutObjectCommand(uploadParams))
        .then(() => {
          attachments.push({ fileName, type: "image" });
          console.log(`File uploaded successfully: ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error uploading file: ${fileName}`, error);
          throw new Error("File upload failed");
        });
    });

    // Wait for all file uploads to complete
    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      return next(new Error("One or more file uploads failed"));
    }
  }

  // Save post content and attachments (if any) in the database
  try {
    const post = await Post.create({
      content,
      user: userId,
      attachments,
    });

    res.send(post); // Send the response after post creation
  } catch (error) {
    console.error("Error saving post:", error);
    next(new Error("Post creation failed"));
  }
});

// In your postsController.js
// In your postsController.js
exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ visibility: "public" })
    .sort({ createdAt: -1 })
    .populate("user", "fname sname email");

  const postsWithImageUrls = await Promise.all(
    posts.map(async (post) => {
      const postObject = post.toObject(); // Convert Mongoose document to plain JS object

      if (post.attachments.length > 0) {
        // Generate an array of promises to get signed URLs for all attachments
        const imageUrls = await Promise.all(
          post.attachments.map(async (attachment) => {
            const getObjectParams = {
              Bucket: bucketName,
              Key: attachment.fileName,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, command, {
              expiresIn: 3600,
            });
            return url;
          })
        );
        postObject.imageURLs = imageUrls; // Add the array of image URLs to the post object
      } else {
        postObject.imageURLs = []; // Handle posts without attachments
      }

      return postObject;
    })
  );

  res.send(postsWithImageUrls); // Send the updated array
});
