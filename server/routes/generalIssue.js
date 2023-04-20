const express = require("express");
const router = express.Router();
const {
    getGeneralIssues,
    getGeneralIssue,
    createGeneralIssue,
    deleteGeneralIssue,
    updateGeneralIssue,

} = require("../controllers/generalIssueController");

//Get all the geberal issues
router.get("/", getGeneralIssues);

//Get single general issue
router.get("/:id", getGeneralIssue);

//Post a new general issue
router.post("/", createGeneralIssue);

//Delete a general issue
router.delete("/:id", deleteGeneralIssue);

//Update a general issue
router.patch("/:id", updateGeneralIssue);

module.exports = router;