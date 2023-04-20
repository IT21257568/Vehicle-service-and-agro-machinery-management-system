const express = require("express");
const router = express.Router();
const {
  getCvs,
  getCv,
  createmCVSubmission,
  deletemSubmission,
} = require("../controllers/cvSubmissionController");

//Get all of the applicants (1)
router.get("/", getCvs);

//Get single applicant (2)
router.get("/:id", getCv);

//Post a new applicant (3)
router.post("/", createmCVSubmission);

//Delete a applicant (4)
router.delete("/:id", deletemSubmission);

/* //Update applicant (5)
router.patch("/:id", updatemTeam); */

module.exports = router;
