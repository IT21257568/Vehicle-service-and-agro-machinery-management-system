const express = require("express");
const router = express.Router();
const {
  getAllProgresses,
  getProgress,
  ceateProgress,
  deleteProgress,
  updateProgress,
} = require("../controllers/ProgressController");

//Get all of the workouts (1)
router.get("/", getAllProgresses);

//Get single workout (2)
router.get("/:id", getProgress);

//Post a new workout (3)
router.post("/", ceateProgress);

//Delete a workout (4)
router.delete("/:id", deleteProgress);

//Update workout (5)
router.patch("/:id", updateProgress);

module.exports = router;