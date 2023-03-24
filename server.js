const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app.js");

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("Databse connected successfully!");
});

app.listen("3000", () => {
  console.log(`Server is running on port ${port}...`);
});
