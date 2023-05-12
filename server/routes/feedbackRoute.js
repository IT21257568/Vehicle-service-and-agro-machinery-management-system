const express = require("express");
const router = express.Router();

const {

  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback

} = require("../controllers/feedbackController");

//Get all of the feedbacks
router.get("/", getFeedbacks);

//Get single feedback
router.get("/:id", getFeedback);

//Post a new feedback
router.post("/", createFeedback);

//Delete a feedback
router.delete("/:id", deleteFeedback);

//Update a feedback
router.patch("/:id", updateFeedback);

module.exports = router;
