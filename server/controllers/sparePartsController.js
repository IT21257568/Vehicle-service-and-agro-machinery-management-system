const SparePart = require('../models/sparePartsModel');
const mongoose = require('mongoose');

//get all spareParts
const getAllSpareParts = async (req, res) => {
    const spareParts = await SparePart.find({}).sort({createdAt: -1});

    res.status(200).json(spareParts);
}

//get a single sparePart
const getSparePart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'});
    }
    const sparePart = await SparePart.findById(id);
        
    if(!sparePart) {
            return res.status(404).json({error: 'No such sparePart'});
    }

    res.status(200).json(sparePart);
   
}

//create a SparePart
const createSparePart = async (req, res) => {
    const{sp_name, sp_image,sp_price, sp_discount, sp_description, sp_status} = req.body;

    //check if all fields are filled
    let emptyFields = [];

    if(!sp_name) {
        emptyFields.push('Spare Part Name');
    }
    if(!sp_image) {
        emptyFields.push('Spare Part image');
    }
    if(!sp_price) {
        emptyFields.push('Spare Part price');
    }
    if(!sp_discount) {
        emptyFields.push('Spare Part discount');
    }
    if(!sp_description) {
        emptyFields.push('Spare Part description');
    }
    if(!sp_status) {
        emptyFields.push('Spare Part status');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "The following fields are empty: ", emptyFields});
    }

    //add doc to db
    try{
        const sparePart = await SparePart.create({sp_name, sp_image,sp_price, sp_discount, sp_description, sp_status,});
        res.status(200).json({sparePart});
    }catch(error){
        res.status(400).json({error: error.message});
 }};

//delete a sparePart
const deleteSparePart = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'});
    }
    const sparePart = await SparePart.findOneAndDelete({_id: id});
        
    if(!sparePart) {
            return res.status(404).json({error: 'No such sparePart'});
    }

    res.status(200).json(sparePart);
}



//update a sparePart
const updateSparePart = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sparePart'});
    }

    const sparePart = await SparePart.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!sparePart) {
        return res.status(404).json({error: 'No such sparePart'});
    }

    res.status(200).json(sparePart);

}

module.exports = {
    getAllSpareParts,
    getSparePart,
    createSparePart,
    deleteSparePart,
    updateSparePart
}