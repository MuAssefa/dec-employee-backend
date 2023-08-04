const mongoose = require("mongoose");

//creat our schema
const SignUpSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created_At",
      updatedAt: "updated_At",
    },
  }
);

// creating our model and export it
module.exports = mongoose.model("SignUp", SignUpSchema);
