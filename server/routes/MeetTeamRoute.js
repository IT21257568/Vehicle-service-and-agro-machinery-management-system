const express = require("express");
const router = express.Router();
const {
    getmTeams,
    getmTeam,
    ceatemTeam,
    deletemTeam,
    updatemTeam,
} = require("../controllers/MeetTeamController");

//Get all of the workouts (1)
router.get("/", getmTeams);

//Get single workout (2)
router.get("/:id", getmTeam);

//Post a new workout (3)
router.post("/", ceatemTeam);

//Delete a workout (4)
router.delete("/:id", deletemTeam);

//Update workout (5)
router.patch("/:id", updatemTeam);

module.exports = router;