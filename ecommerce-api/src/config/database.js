const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  try {
    await mongoose.connect(`${dbURI}/${dbName}`, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
