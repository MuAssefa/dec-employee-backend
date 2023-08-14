const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
const signUpRouter = require("./routes/sign-up");
const employeeRouter = require("./routes/employee");

const app = express();
const port = process.env.PORT || 5000;

//setup our server
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
//connecting to the mongodb database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Database connection is successful"))
  .catch((err) => console.log(err));

//midlewars

app.use(express.json());
app.use("/api/users", userRouter); //user
app.use("/api/employees", employeeRouter); //employee
app.use("/api/users", signUpRouter); //Sign-up
