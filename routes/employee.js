const router = require("express").Router();
const Employee = require("../models/employee");

//Create an Employee
router.post("/employee", async (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    occupation: req.body.occupation,
    imageUrl: req.body.imageUrl,
    cellMobile: req.body.cellMobile,
    cellOffice: req.body.cellOffice,
    sms: req.body.sms,
    email: req.body.email,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/employees", async (req, res) => {
  try {
    const getAllEmployees = await Employee.find({});
    res.status(200).json(getAllEmployees);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const findEmployee = await Employee.findById(req.params.id);
    res.status(200).json(findEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updatedEmployee = await Employee.findOneAndUpdate(
      query,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/employees", async (req, res) => {
  try {
    const getAllEmployees = await Employee.find({});
    res.status(200).json(getAllEmployees);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("The user has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// updated user info
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updatedEmployee = await Employee.findOneAndUpdate(
      query,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
