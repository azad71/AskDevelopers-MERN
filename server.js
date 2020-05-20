// import dependencies
// load libraries
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// initiate app
const app = express();

// importing endpoints
const authAPIs = require("./endpoints/auth");
const postAPIs = require("./endpoints/post");
const profileAPIs = require("./endpoints/profile");

// environment variable config
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// app config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require("./config/auth")(passport);

// db config
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

app.use("/api", authAPIs);
app.use("/api/posts", postAPIs);
app.use("/api/profile", profileAPIs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
