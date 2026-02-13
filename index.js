const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./Models/signupModel");

//// Middleware
const app = express();
app.use(express.json());

// Routes
app.get("/", function (req, res) {
  res.send("hello  api");
});

//connecting database
mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(function () {
    app.listen(3000, function () {
      console.log("Node Api running sucessfully ");
    });
    console.log("mongoose connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//   Creating signupPage
app.post("/signup", async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExits = await Signup.findOne({ email });
    if (userExits) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newsignup = await Signup.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).json(newsignup);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//

// Delete
app.delete("/signup/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const signup = await Signup.findByIdAndDelete(id);

    if (!signup) {
      return res.status(404).json({ message: "cannot find user by id" });
    } else {
      res.status(200).json(signup);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post("/login", async function (req, res) {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // username and pass matches ,success
    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
