const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    cellMobile: {
      type: String,
      required: true,
    },
    cellOffice: {
      type: String,
      required: true,
    },
    sms: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
module.exports = mongoose.model("Employee", EmployeeSchema);
