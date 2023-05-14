const express = require("express");
const router = express.Router();

const {
  createAgroProduct,
  getAllAgroProducts,
  getAgroProduct,
  deleteAgroProduct,
  updateAgroProduct,
} = require("../controllers/agroController");

// import auth middleware
const { protect } = require("../middleware/authMiddleware");

//GET all AgroProducts
router.get("/", getAllAgroProducts);

//GET a single AgroProduct
router.get("/:id", getAgroProduct);

//POST a new AgroProduct
router.post("/", createAgroProduct);

//DELETE a AgroProduct
router.delete("/:id", deleteAgroProduct);

//UPDATE a AgroProduct
router.patch("/:id", updateAgroProduct);

module.exports = router;
