const express = require("express");
const router = express.Router();

const {

    getFAQs,
    getFAQ,
    createFAQ,
    deleteFAQ,
    updateFAQ

} = require("../controllers/faqController");

//Get all of the promotions
router.get("/", getFAQs);

//Get single Promotion
router.get("/:id", getFAQ);

//Post a new Promotion
router.post("/", createFAQ);

//Delete a Promotion
router.delete("/:id", deleteFAQ);

//Update a Promotion
router.patch("/:id", updateFAQ);

module.exports = router;