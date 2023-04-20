const DamageValuation = require('../models/damageValuationModel');
const mongoose = require('mongoose');


    //get all repair jobs
    const getDamageValuations = async(req, res) => {
        const damageValuation = await DamageValuation.find({}).sort({ createdAt: -1 });

        res.status(200).json(damageValuation);

    }

    //get single repair job
    const getDamageValuation = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Repair job not found' });
        }

        const damageValuation = await DamageValuation.findById(id);
        if (!damageValuation) {
            return res.status(404).json({ error: 'Repair job not found' });
        } else {
            res.status(200).json(damageValuation);
        }

    }


    //create new repair job
    const createDamageValuation = async(req, res) => {
        const { customer_id, customer_name, vehicle_Number, vehicle_Model, customer_email, estimated_cost, required_parts, damage_picture_url } = req.body;
    
        let emptyFields = [];
    
        //validation for empty fields
        if (!customer_id) {
            emptyFields.push('customer_id');
        }
        if (!customer_name) {
            emptyFields.push('customer_name');
        }
        if (!vehicle_Number) {
            emptyFields.push('vehicle_Number');
        }
        if (!vehicle_Model) {
            emptyFields.push('vehicle_Model');
        }
        if (!customer_email) {
            emptyFields.push('customer_email');
        }
        if (!estimated_cost) {
            emptyFields.push('estimated_cost');
        }
        if (!damage_picture_url) {
            emptyFields.push('damage_picture_url');
        }
       
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
        }
    
        //add to db
        try {
            const damageValuation = await DamageValuation.create({ customer_id, customer_name, vehicle_Number, vehicle_Model, customer_email, estimated_cost, required_parts, damage_picture_url });
            res.status(200).json({ damageValuation });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    
    }

    //delete a repair job
    const deleteDamageValuation = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Repair job not found' });
        }
        const damageValuation = await DamageValuation.findOneAndDelete({ _id: id });
        if (!damageValuation) {
            return res.status(404).json({ error: 'Repair job not found' });
        } else {
            res.status(200).json(damageValuation);

        }
    }


     //update a repair job
    const updateDamageValuation = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Repair job not found' });
        }
        const damageValuation = await DamageValuation.findOneAndUpdate({ _id: id }, {
            ...req.body
        });
        if (!damageValuation) {
            return res.status(404).json({ error: 'Repair job not found' });
        } else {
            res.status(200).json(damageValuation);
        }
    }

    module.exports = {
        createDamageValuation,
        getDamageValuations,
        getDamageValuation,
        deleteDamageValuation,
        updateDamageValuation
    }