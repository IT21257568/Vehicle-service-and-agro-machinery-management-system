const CvForm = require("../models/cvSubmissionModel");
const mongoose = require("mongoose");

//get all Team Details
const getCvs = async (req, res) => {
  const appCvs = await CvForm.find({}).sort({ createdAt: -1 });

  res.status(200).json(appCvs);
};

//get single Member Details
const getCv = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Applicant not found" });
  }

  const appCvs = await CvForm.findById(id);
  if (!appCvs) {
    return res.status(404).json({ error: "Applicant not found" });
  } else {
    res.status(200).json(appCvs);
  }
};
//Add new submission
const createmCVSubmission = async (req, res) => {
  const {
    applicant_name,
    applicant_age,
    applicant_gender,
    applicant_contact,
    applicant_email,
    applicant_CVFile_url,
    vacancy_name,
    vacancy_id,
  } = req.body;

  let emptyFields = [];

  //validation for empty fields
  if (!applicant_name) {
    emptyFields.push("Name");
  }
  if (!applicant_age) {
    emptyFields.push("Age");
  } else if(applicant_age < 18 || applicant_age > 60){
    
      emptyFields.push("Age must be between 18 and 60");
  }
  if (!applicant_gender) {
    emptyFields.push("Gender");
  }
  if (!applicant_contact) {
    emptyFields.push("Contact Number");
  } else {
    const phoneRegex = /^\d{10}$/; // regular expression for 10-digit phone number
    if (!phoneRegex.test(applicant_contact)) {
      emptyFields.push("Invalid phone number format");
    }
  }
  if (!applicant_email) {
    emptyFields.push("Email");
  } else {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicant_email)) {
      emptyFields.push("Invalid Email Address");
    }
  }
  if (!applicant_CVFile_url) {
    emptyFields.push("CV File");
  }
  if (!vacancy_name) {
    emptyFields.push("vacancy_name");
  } 
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields:", emptyFields });
  }

  //add to db
  try {
    const appCvs = await CvForm.create({
      applicant_name,
      applicant_age,
      applicant_gender,
      applicant_contact,
      applicant_email,
      applicant_CVFile_url,
      vacancy_name,
      vacancy_id,
    });
    res.status(200).json({ appCvs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a vacancy
const deletemSubmission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Submission not found" });
  }
  const appCvs = await CvForm.findOneAndDelete({ _id: id });
  if (!appCvs) {
    return res.status(404).json({ error: "Submission not found" });
  } else {
    res.status(200).json(appCvs);
  }
};
/* //update 
const updatemTeam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Technician not found" });
  }
  const mTeam = await Mteam.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!mTeam) {
    return res.status(404).json({ error: "Technician not found" });
  } else {
    res.status(200).json(mTeam);
  }
}; */

module.exports = {
  getCvs,
  getCv,
  createmCVSubmission,
  deletemSubmission,
  //updatemTeam,
};
