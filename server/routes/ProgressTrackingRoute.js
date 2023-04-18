const express = require("express");
const router = express.Router();
const {
  createprogress,
  getAllProgresses,
  getProgressByVID,
} = require("../controllers/ProgressController");

//GET all progress
router.get("/", getAllProgresses);

//GET a single progress
router.get("/:nic", getProgressByVID);

//POST a new progress
router.post("/", createprogress);

module.exports = router;
