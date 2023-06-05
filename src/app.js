const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const api = require("./api");
const app = express();
const { errorHandler } = require("./utils/error");
require("./auth/passport");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
<<<<<<< HEAD
app.use(
  cors({
=======
app.use(cors({
>>>>>>> 1b32db30ebad22545e68ee2378f9d4e4486cd422
    origin: "*", // <-- the react app
    credentials: true,
  })
);

// routes
app.use("/api/v1", api);
app.get("/", (req, res) => {
  res.json({
    message: "Alger",
  });
});

app.use(errorHandler);

module.exports = app;
