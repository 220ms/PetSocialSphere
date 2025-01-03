const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected succesfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
