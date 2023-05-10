const express = require("express");
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getMe,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/authMiddleware");

// const { protect } = require("../middleware/authMiddleware");

router
  .get("/", getAllEmployees)
  .post("/", registerEmployee)
  .patch("/:id", updateEmployee)
  .delete("/:id", deleteEmployee);
router.post("/login", loginEmployee);
router.get("/me", getMe);
router.get("/getemployeebyid/:id", getEmployeeById);

module.exports = router;
