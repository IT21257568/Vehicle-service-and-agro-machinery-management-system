const express = require("express");
const router = express.Router();
const {
    getVacancies,
    getVacancy,
    ceateVacancy,
    deleteVacancy,
    updateVacancy,
} = require("../controllers/vacanciesController");

//Get all of the workouts (1)
router.get("/", getVacancies);

//Get single workout (2)
router.get("/:id", getVacancy);

//Post a new workout (3)
router.post("/", ceateVacancy);

//Delete a workout (4)
router.delete("/:id", deleteVacancy);

//Update workout (5)
router.patch("/:id", updateVacancy);

module.exports = router;