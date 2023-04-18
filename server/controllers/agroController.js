const AgroProduct = require('../models/agroModel')
const mongoose = require('mongoose')

//get all AgroProducts
const getAllAgroProducts = async (req, res) => {
    const agroProducts = await AgroProduct.find({}).sort({createdAt: -1})

    res.status(200).json(agroProducts)
}

//get a single AgroProduct
const getAgroProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such agroProduct'})
    }
    const agroProduct = await AgroProduct.findById(id)
        
    if(!agroProduct) {
            return res.status(404).json({error: 'No such agroProduct'})
    }

    res.status(200).json(agroProduct)
   
}

//create a new AgroProduct
const createAgroProduct = async (req, res) => {
    const{p_name, p_image, p_price, p_discount, p_description, p_status} = req.body

    //add doc to db
    try{
        const agroProduct = await AgroProduct.create(p_name, p_image, p_price, p_discount, p_description, p_status)
        res.status(200).json(agroProduct)
    }catch(error){
        res.status(400).json({error: error.message})
 }}

//delete a agroProduct
const deleteAgroProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such agroProduct'})
    }
    const agroProduct = await AgroProduct.findOneAndDelete({_id: id})
        
    if(!agroProduct) {
            return res.status(404).json({error: 'No such agroProduct'})
    }

    res.status(200).json(agroProduct)
}



//update a agroProduct
const updateAgroProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such agroProduct'})
    }

    const agroProduct = await AgroProduct.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!agroProduct) {
        return res.status(404).json({error: 'No such agroProduct'})
    }

    res.status(200).json(agroProduct)

}

module.exports = {
    getAllAgroProducts,
    getAgroProduct,
    createAgroProduct,
    deleteAgroProduct,
    updateAgroProduct
}