const express = require('express');
const router = express.Router();
const { 
    getAllOrderedAgroProducts,
    getOrderedAgroProduct,
    createOrderAgroProduct,
    deleteOrderedAgroProduct,
    updateOrderedAgroProduct,
 } = require('../controllers/orderAgroProductController');

//GET all AgroProducts
router.get('/', getAllOrderedAgroProducts)

//GET a single AgroProduct
router.get('/:id',getOrderedAgroProduct)

//POST a new AgroProduct
router.post('/',  createOrderAgroProduct)

//DELETE a AgroProduct
router.delete('/:id', deleteOrderedAgroProduct)

//UPDATE a AgroProduct
router.patch('/:id', updateOrderedAgroProduct)

module.exports = router;