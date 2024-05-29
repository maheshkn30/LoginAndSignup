const mongoose = require("mongoose");

// Signup page
const login = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", login);
module.exports = Login;
