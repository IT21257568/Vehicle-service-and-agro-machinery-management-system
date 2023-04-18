const Progress = require("../models/ProgressTrackingModel");
const mongoose = require("mongoose");

//get all progress
const getAllProgresses = async (req, res) => {
  const allProgress = await Progress.find({}).sort({ createdAt: -1 });

  res.status(200).json(allProgress);
};


const getProgressByVID = async (req, res) => {
  const { vid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vid)) {
    return res.status(404).json({ error: "Invalid VID" });
  }

  const progress = await Progress.findOne({ vid: vid });
  if (!progress) {
    return res.status(404).json({ error: "Vehicle not found" });
  } else {
    res.status(200).json(progress);
  }
};

//create new progress
const createprogress = async (req, res) => {
  const { name, vid, status, description } = req.body;

  let emptyFields = [];

  //validation for empty fields
  if (!name) {
    emptyFields.push("Name");
  }
  if (!vid) {
    emptyFields.push("VID");
  }
  if (!status) {
    emptyFields.push("Status");
  }
  if (!description) {
    emptyFields.push("Discription");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  //add to db
  try {
    const progress = await Progress.create({
      name,
      vid,
      status,
      description,
    });
    res.status(200).json({ progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProgresses,
  getProgressByVID,
  createprogress,
};
