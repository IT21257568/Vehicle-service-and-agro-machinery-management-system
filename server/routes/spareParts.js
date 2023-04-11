const express = require('express');
const router = express.Router();
const { 
    createSparePart,
    getAllSpareParts,
    getSparePart,
    deleteSparePart,
    updateSparePart
 } = require('../controllers/sparePartsController')

//GET all workouts
router.get('/', getAllSpareParts)

//GET a single workout
router.get('/:id', getSparePart)

//POST a new workout
router.post('/', createSparePart)

//DELETE a workout
router.delete('/:id', deleteSparePart)

//UPDATE a workout
router.patch('/:id', updateSparePart)

module.exports = router;