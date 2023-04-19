const express = require("express");
const router = express.Router();
const {
    getDamageValuations,
    getDamageValuation,
    createDamageValuation,
    deleteDamageValuation,
    updateDamageValuation,

} = require("../controllers/damageValuationController");

//Get all of the rapair jobs
router.get("/", getDamageValuations);

//Get single rapair job
router.get("/:id", getDamageValuation);

//Post a new rapair job
router.post("/", createDamageValuation);

//Delete a rapair job
router.delete("/:id", deleteDamageValuation);

//Update a rapair job
router.patch("/:id", updateDamageValuation);

module.exports = router;