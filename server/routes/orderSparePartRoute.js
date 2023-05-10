const express = require('express');
const router = express.Router();
const { 
    getAllOrderedSpareParts,
    getOrderedSparePart,
    createOrderSparePart,
    deleteOrderedSparePart,
    updateOrderedSparePart,
 } = require('../controllers/orderSparePartController');

//GET all SpareParts
router.get('/', getAllOrderedSpareParts)

//GET a single SparePart
router.get('/:id',getOrderedSparePart)

//POST a new SparePart
router.post('/',  createOrderSparePart)

//DELETE a SparePart
router.delete('/:id', deleteOrderedSparePart)

//UPDATE a SparePart
router.patch('/:id', updateOrderedSparePart)

module.exports = router;