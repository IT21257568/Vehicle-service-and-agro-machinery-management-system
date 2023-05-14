const Employee = require("../models/employeeModel");
const mongoose = require("mongoose");

//get all Team Details
const getEmployees = async (req, res) => {
  const employees = await Employee.find({}).sort({ createdAt: -1 });

  res.status(200).json(employees);
};

//get single Member Details
const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  } else {
    res.status(200).json(employee);
  }
};
//create new Member Profile
const createEmployee = async (req, res) => {
  const { name, empCode, email, phone, profileImg } = req.body;

  let emptyFields = [];

  //validation for empty fields
  if (!name) {
    emptyFields.push("Name");
  }
  if (!empCode) {
    emptyFields.push("Code");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!phone) {
    emptyFields.push("phone");
  }
  if (!profileImg) {
    emptyFields.push("image");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  //add to db
  try {
    const employee = await Employee.create({
      name,
      empCode,
      email,
      phone,
      profileImg,
    });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a vacancy
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Employee not found" });
  }
  const employee = await Employee.findOneAndDelete({ _id: id });
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  } else {
    res.status(200).json(employee);
  }
};
//update a vacancy
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Employee not found" });
  }
  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  } else {
    res.status(200).json(employee);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
