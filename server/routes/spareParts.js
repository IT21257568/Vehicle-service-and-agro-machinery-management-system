const express = require('express');
const router = express.Router();
const { 
    createSparePart,
    getAllSpareParts,
    getSparePart,
    deleteSparePart,
    updateSparePart
 } = require('../controllers/sparePartsController')

//GET all SpareParts
router.get('/', getAllSpareParts)

//GET a single SparePart
router.get('/:id', getSparePart)

//POST a new SparePart
router.post('/', createSparePart)

//DELETE a SparePart
router.delete('/:id', deleteSparePart)

//UPDATE a SparePart
router.patch('/:id', updateSparePart)

module.exports = router;