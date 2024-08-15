const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const DB = require("./DB.js");
const users = require("./models/users.js");
const posts = require("./models/Post.js");
const post = mongoose.model("Post", posts.PostSchema);
const user = mongoose.model("User", users.UserSchema);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const JWTsecret = process.env.JWT_SECRET;
const fs = require("fs");
// const socket = require("socket.io");
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());

// Entering data in DB

// login form

// profile photo
// likes

// post.create({
//   UserID: "Vishal",
//   PlaceName : "Kaneri Forts",
//   PlaceAddress : "Mumbai",
//   PlaceDescription : "Located in Boriwali Of mumbai.",
//   Imagepath : "#",
//   ContactNumber : "Int number ",
//   PlaceImage : "#",
//   PlaceRating : 5,
//   PlaceReview : "good place",
// })

fs.writeFileSync("")


app.get("/users", async (req, res) => {
  try {
    const result = await user.find().lean();
    res.send(result);
  } catch (error) {
    res.send("Error occured.");
    console.log(error);
  }
});

app.get("/update", async (req, res) => {
  try {
    const result = await user.updateOne({ username: "world" });
    res.send(result);
    console.log(result);
  } catch (error) {
    res.send("Error occured.");
    console.log(error);
  }
});

app.get("/deletion", async (req, res) => {
  try {
    user.deleteOne({ username: "world" });
    console.log("done");
  } catch (error) {
    res.send("Error occured.");
    console.log(error);
  }
});

app.get("/", function (req, res) {
  res.send("Hello ");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await user
    .findOne({
      username: username,
    })
    .lean();
  console.log(result);
  // res.send(result)

  if (result === null) {
    res.send({
      "success" : false,
      "message" : "User does not exists"
    });
    return;

  }

  const isMatch = await bcrypt.compare(password, result.password);
  console.log(isMatch);

  const token = await jwt.sign({ userID: result._id }, JWTsecret);
  console.log(token);

  if (isMatch) {
    res.send({
      token: token,
      username: result.username,
      userID: result._id,
      success: true,
    });
    return;
  } else {
    res.send({
      "success" : false,
      "message" : "Password is incorrect"
    });
  }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.status(400).send("invalid request");
  }

  user.create({
    username: username,
    password: hash,
  });

  console.log(hash);
  console.log(username);
  console.log(password);
  res.send("succesfully");
});

app.post("/verify" , (req, res) =>{
  const token = req.headers.authorization.split(' ')[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, JWTsecret);
    // console.log(decoded);
    res.send({
      "valid" : true,
      "message" : "valid",
      "user_id": decoded
    })
  } catch (error) {
    res.send({
      "valid" : false,
      "message" : "invalid token."
    })

  }
})

app.post("/get-user-data", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  

  try {
    const data = await userData.findOne({ _id: userId });
    console.log(data);

    if (data) {
      res.send({
        "userData": true,
        "username": data.username,
        "message": "User Found"
      });
    } else {
      res.send({
        "userData": false,
        "message": "User not found"
      });
    }
  } catch (err) {
    res.send({
      "userData": false,
      "message": "Error in fetching user data"
    });
  }
});


var token = jwt.sign({ foo: "bar" }, JWTsecret);
console.log(token);

const port = process.env.PORT;
console.log("Server is Running on port : ", port);
app.listen(port);

// NOTE
// app can be any variable doesn't have to do anything from file name
// express variable can be anything but it has to be same as function i.e.express()
// cors is cross origin resourse sharing and it is used to transfer file from one location to other eg:
// localhost:3000 and localhost:5000 will be connected to eachother by cors
// body-parser is used to parse the body of the request and it is used to get the data from the request
