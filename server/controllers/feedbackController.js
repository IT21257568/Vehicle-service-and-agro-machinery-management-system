const Feedback = require("../models/feedbackModel");
const mongoose = require("mongoose");

//get all Feedbacks
const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

  res.status(200).json(feedbacks);
};

//get single Feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Feedback not found" });
  }

  const feedback = await Feedback.findById(id);
  if (!feedback) {
    return res.status(404).json({ error: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
};

//create new Feedback
const createFeedback = async (req, res) => {
  const { feedback, rating, fd_date } = req.body;

  let emptyFields = [];

  //validation for empty fields
  if (!feedback) {
    emptyFields.push("feedback");
  }
  if (!rating) {
    emptyFields.push("rating");
  }
  if (!fd_date) {
    emptyFields.push("serviceDate");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  //add to db
  try {
    const feedbackData = await Feedback.create({ feedback, rating, fd_date });
    res.status(200).json({ feedbackData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a FAQ
const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Feedback not found" });
  }
  const feedback = await Feedback.findOneAndDelete({ _id: id });
  if (!feedback) {
    return res.status(404).json({ error: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
};
//update a FAQ
const updateFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Feedback not found" });
  }
  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!feedback) {
    return res.status(404).json({ error: "Feedback not found" });
  } else {
    res.status(200).json(feedback);
  }
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  deleteFeedback,
  updateFeedback,
};
