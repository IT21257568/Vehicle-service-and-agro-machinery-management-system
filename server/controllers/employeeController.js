const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

// @desc    Create new employee user
// @route   POST /api/employees
// @access  Private
const registerEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    empCode,
    username,
    empType,
    empDept,
    email,
    password,
    phone,
    profileImg,
  } = req.body;

  if (!name || !email || !password || !phone || !empType || !empDept) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check of user exists
  const employeeExists = await Employee.findOne({ empCode });

  if (employeeExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const employee = await Employee.create({
    name: name,
    empCode: empCode,
    empDept: empDept,
    empType: empType,
    username: username,
    email: email,
    password: hashedPassword,
    phone: phone,
    profileImg: profileImg,
  });

  if (employee) {
    res.status(201).json({
      _id: employee.id,
      name: employee.name,
      empCode: employee.empCode,
      empDept: employee.empDept,
      empType: employee.empType,
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      profileImg: employee.profileImg,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

// @desc    Authenticate employee (login)
// @route   POST /api/employees/login
// @access  Public
const loginEmployee = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  // check for user email
  const employee = await Employee.findOne({ phone });

  if (employee && (await bcrypt.compare(password, employee.password))) {
    res.json({
      _id: employee.id,
      name: employee.name,
      empCode: employee.empCode,
      empDept: employee.empDept,
      empType: employee.empType,
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      profileImg: employee.profileImg,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid phone or password");
  }

  res.json({ message: "Login employee" });
});

// @desc    Get employee data
// @route   GET /api/employees/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, phone, empCode, username, empType, empDept } =
    await Employee.findById(req.employee._id);

  res.status(200).json({
    id: _id,
    name,
    email,
    phone,
    empCode,
    username,
    empType,
    empDept,
    profileImg,
  });
});

// @desc    Get all employee data
// @route   GET /api/users/
// @access  Public
const getAllEmployees = asyncHandler(async (req, res) => {
  const allEmployees = await Employee.find().select("-password"); // omit password when selecting

  res.status(200).json(allEmployees);
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id); // omit password when selecting

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json(employee);
});

// @desc    Get all employee data
// @route   GET /api/users/
// @access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id); // omit password when selecting

  if (!employee) {
    res.status(400);
    throw new Error("No employee found");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEmployee);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id); // omit password when selecting

  if (!employee) {
    res.status(400);
    throw new Error("No employee found");
  }

  await Employee.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Employee deleted successfully" });
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getMe,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
