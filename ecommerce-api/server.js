const express = require("express");
const connectDB = require("./src/config/database");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
