const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByNIC,
} = require("../controllers/userController");

//GET all users
router.get("/", getAllUsers);

//GET a single user
router.get("/:nic", getUserByNIC);

//POST a new user
router.post("/", createUser);

module.exports = router;
