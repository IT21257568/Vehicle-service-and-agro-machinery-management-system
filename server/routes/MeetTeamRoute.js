const express = require("express");
const router = express.Router();
const {
    getmTeams,
    getmTeam,
    ceatemTeam,
    deletemTeam,
    updatemTeam,
} = require("../controllers/MeetTeamController");

//Get all of the Technicians (1)
router.get("/", getmTeams);

//Get single Technician (2)
router.get("/:id", getmTeam);

//Post a new Technician (3)
router.post("/", ceatemTeam);

//Delete a Technician (4)
router.delete("/:id", deletemTeam);

//Update Technician (5)
router.patch("/:id", updatemTeam);

module.exports = router;