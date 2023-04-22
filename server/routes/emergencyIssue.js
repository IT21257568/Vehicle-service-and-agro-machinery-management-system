const express = require("express");
const router = express.Router();
const {
    getEmergencyIssues,
    getEmergencyIssue,
    createEmergencyIssue,
    deleteEmergencyIssue,
    updateEmergencyIssue,

} = require("../controllers/emergencyIssueController");

//Get all the emergency issues
router.get("/", getEmergencyIssues);

//Get single emergency issue
router.get("/:id", getEmergencyIssue);

//Post a new emergency issue
router.post("/", createEmergencyIssue);

//Delete an emergency issue
router.delete("/:id", deleteEmergencyIssue);

//Update an emergency issue
router.patch("/:id", updateEmergencyIssue);

module.exports = router;