const SparePart = require('../models/sparePartsModel')
const mongoose = require('mongoose')

//get all spareParts
const getAllSpareParts = async (req, res) => {
    const spareParts = await SparePart.find({}).sort({createdAt: -1})

    res.status(200).json(spareParts)
}

//get a single sparePart
const getSparePart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'})
    }
    const sparePart = await SparePart.findById(id)
        
    if(!sparePart) {
            return res.status(404).json({error: 'No such sparePart'})
    }

    res.status(200).json(sparePart)
   
}

//create a SparePart
const createSparePart = async (req, res) => {
    const{sp_name, sp_image,sp_price, sp_discount, sp_description, sp_status} = req.body

    //add doc to db
    try{
        const sparePart = await SparePart.create({sp_name, sp_image,sp_price, sp_discount, sp_description, sp_status})
        res.status(200).json(sparePart)
    }catch(error){
        res.status(400).json({error: error.message})
 }}

//delete a sparePart
const deleteSparePart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'})
    }
    const sparePart = await SparePart.findOneAndDelete({_id: id})
        
    if(!sparePart) {
            return res.status(404).json({error: 'No such sparePart'})
    }

    res.status(200).json(sparePart)
}



//update a sparePart
const updateSparePart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'})
    }

    const sparePart = await SparePart.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!sparePart) {
        return res.status(404).json({error: 'No such sparePart'})
    }

    res.status(200).json(sparePart)

}

module.exports = {
    getAllSpareParts,
    getSparePart,
    createSparePart,
    deleteSparePart,
    updateSparePart
}