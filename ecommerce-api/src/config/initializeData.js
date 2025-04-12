const bcrypt = require("bcryptjs");
const User = require("../models/user");
const databaseErrorHandler = require("../middlewares/databaseErrorHandler");

async function initializeData() {
  try {
    // Check if there are any users in the database
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // No users found, create default users
      const defaultUsers = [
        {
          userName: "admin",
          userDisplayName: "Admin User",
          email: "admin@crm.com",
          password: await bcrypt.hash("adminpassword", 10),
          role: "Admin",
        },
        {
          userName: "commonUser",
          userDisplayName: "Common User",
          email: "common@crm.com",
          password: await bcrypt.hash("commonpassword", 10),
          role: "User",
        },
        // Add more default users as needed
      ];

      await User.insertMany(defaultUsers);
      console.log("Default users created");
    } else {
      console.log("Users already exist in the database");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
    databaseErrorHandler(error);
    process.exit(1);
  }
}

module.exports = initializeData;
