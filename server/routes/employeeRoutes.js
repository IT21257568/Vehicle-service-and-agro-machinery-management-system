const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

//Get all of the Technicians (1)
router.get("/", getEmployees);

//Get single Technician (2)
router.get("/:id", getEmployee);

//Post a new Technician (3)
router.post("/", createEmployee);

//Delete a Technician (4)
router.delete("/:id", deleteEmployee);

//Update Technician (5)
router.patch("/:id", updateEmployee);

module.exports = router;
