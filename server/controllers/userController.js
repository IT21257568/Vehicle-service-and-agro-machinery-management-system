const User = require("../models/userModel");
const mongoose = require("mongoose");

//get all users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(allUsers);
};

//get single user by NIC
// path: 'users/:nic'
const getUserByNIC = async (req, res) => {
  const { nic } = req.params;
  if (!mongoose.Types.ObjectId.isValid(nic)) {
    return res.status(404).json({ error: "Invalid NIC" });
  }

  const user = await User.findOne({ nic: nic });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json(user);
  }
};

//create new user
const createUser = async (req, res) => {
  const { nic, email, password, phone, name, pfp_url } = req.body;

  let emptyFields = [];

  //validation for empty fields
  if (!nic) {
    emptyFields.push("NIC");
  }
  if (!email) {
    emptyFields.push("Email");
  }
  if (!password) {
    emptyFields.push("Password");
  }
  if (!phone) {
    emptyFields.push("Phone");
  }
  if (!name) {
    emptyFields.push("Name");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  //add to db
  try {
    const user = await User.create({
      nic,
      email,
      password,
      phone,
      name,
      pfp_url,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByNIC,
  createUser,
};
