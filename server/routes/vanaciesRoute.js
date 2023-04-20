const express = require("express");
const router = express.Router();
const {
    getVacancies,
    getVacancy,
    ceateVacancy,
    deleteVacancy,
    updateVacancy,
} = require("../controllers/vacanciesController");

//Get all of the vacancies (1)
router.get("/", getVacancies);

//Get single vacancy (2)
router.get("/:id", getVacancy);

//Post a new vacancy (3)
router.post("/", ceateVacancy);

//Delete a vacancy (4)
router.delete("/:id", deleteVacancy);

//Update vacancy (5)
router.patch("/:id", updateVacancy);

module.exports = router;