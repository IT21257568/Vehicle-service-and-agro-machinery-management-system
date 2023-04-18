const express = require("express");
const router = express.Router();

const {

    getPromotions,
    getPromotion,
    createPromotion,
    deletePromotion,
    updatePromotion 

} = require("../controllers/promotionController");

//Get all of the promotions
router.get("/", getPromotions);

//Get single Promotion
router.get("/:id", getPromotion);

//Post a new Promotion
router.post("/", createPromotion);

//Delete a Promotion
router.delete("/:id", deletePromotion);

//Update a Promotion
router.patch("/:id", updatePromotion);

module.exports = router;