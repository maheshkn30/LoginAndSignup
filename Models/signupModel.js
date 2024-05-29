const mongoose = require("mongoose");

// Signup page
const signup = mongoose.Schema(
  {
    firstName: {
      type: String, // defining datatype
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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

const Signup = mongoose.model("Signup", signup);
module.exports = Signup;
