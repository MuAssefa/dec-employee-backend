const router = require("express").Router();
const SignUp = require("../models/sign-up");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/* 
name;
username,
email,
password
*/

/**
 * C = Create (post)
 * R = Read (get)
 * U = Update (put)
 * D = Delete (delete)
 */

/*  User Sign up */
router.post("/sign-up", async (req, res) => {
  const newSignUpUserData = new SignUp({
    fullName: req.body.fullName,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  // saving the user info into the mongodb Database
  try {
    const savedSignUpData = await newSignUpUserData.save();
    const token = jwt.sign(
      { userName: savedSignUpData.userName },
      process.env.PASS_SECRET,
      { expiresIn: "2m" }
    );
    console.log("token", token);
    res.status(201).json({ ...savedSignUpData, token });
  } catch (err) {
    res.status(400).json(err);
  }
});

// /*  Getting all users */
// router.get("/users", async (req, res) => {
//   try {
//     const getAllUsers = await User.find({});
//     res.status(200).json(getAllUsers);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// /* Getting one user */
// router.get("/:id", async (req, res) => {
//   try {
//     const findUser = await User.findById(req.params.id);
//     res.status(200).json(findUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// /* Delete a user */
// router.delete("/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete({ _id: req.params.id });
//     res.status(200).json("The user has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// /* Update user info */
// router.put("/:id", async (req, res) => {
//   try {
//     const query = { _id: req.params.id };
//     const updatedUser = await User.findOneAndUpdate(
//       query,
//       {
//         $set: req.body,
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// LOGIN END POINT

router.post("/login", async (req, res) => {
  try {
    const user = await SignUp.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong email");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );

    const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log("orginal password", orginalPassword);

    if (orginalPassword !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json("User is Authenticated");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// JWT  TOKEN

module.exports = router;
