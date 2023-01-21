const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routers/users");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const isAuth = require("./controller/isAuth");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next()
});

app.use(bodyParser.json());
const upload = multer({ dest: "images/" });


const PORT = process.env.PORT || 8000;
app.use(upload.single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(userRoutes);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jv9eo4u.mongodb.net/TharapyApp?retryWrites=true&w=majority`
);

app.listen(PORT, () => {
  console.log("server running at port ");
});
