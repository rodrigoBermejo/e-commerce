const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const errorHandler = require("./src/middlewares/errorHandler");
const swaggerMiddleware = require("./src/middlewares/swagger");
const routes = require("./src/routes");
const initializeData = require("./src/config/initializeData");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is working");
});

if (process.env.INITIAL_DATA === "development") {
  console.log("Development environment, creating mocking data...");
  initializeData();
}

swaggerMiddleware(app);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
