const EmergencyIssue = require('../models/emergencyIssueModel');
const mongoose = require('mongoose');


    //get all emergency issues
    const getEmergencyIssues = async(req, res) => {
        const emergencyIssues = await EmergencyIssue.find({}).sort({ createdAt: -1 });

        res.status(200).json(emergencyIssues);

    }

    //get single emergency issue
    const getEmergencyIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        const emergencyIssue = await EmergencyIssue.findById(id);
        if (!emergencyIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(emergencyIssue);
        }

    }


    //create new emergency issue
    const createEmergencyIssue = async(req, res) => {
        const { customer_name, customer_NIC, contact_number, c_location, EM_discription, issue_status, available_emp, maintenance_fee, towing_fee, total_fee } = req.body;
    
        let emptyFields = [];
    
        //validation for empty fields
        if (!customer_name) {
            emptyFields.push('Customer Name');
        }
        if (!customer_NIC) {
            emptyFields.push('Customer NIC');
        }else {
            //NIC validation
            if (!customer_NIC || !/^(\d{9})[vV]$|^\d{12}$/.test(customer_NIC)) {
            emptyFields.push('Please enter a valid NIC number');
            }
        }
        if (!contact_number) {
            emptyFields.push('Contact Number');
        }
        //contact number validation
        if (contact_number.length>10) {
            emptyFields.push("Invalid Contact Number");
          }
        if (!c_location) {
            emptyFields.push('Current Location');
        }
        if (!EM_discription) {
            emptyFields.push('Description');
        }
        if (!issue_status) {
            emptyFields.push('Issue Status');
        }
        if (!available_emp) {
            emptyFields.push('Available Employees');
        }
        if (!maintenance_fee) {
            emptyFields.push('Maintenance Fee');
        }
        if (!total_fee) {
            emptyFields.push('Total Fee');
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
        }
    
        //add to db
        try {
            const emergencyIssue = await EmergencyIssue.create({ customer_name, customer_NIC, contact_number, c_location, EM_discription, issue_status, available_emp, maintenance_fee, towing_fee, total_fee });
            res.status(200).json({ emergencyIssue: emergencyIssue });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    
    }

    //delete an emergency issue
    const deleteEmergencyIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const emergencyIssue = await EmergencyIssue.findOneAndDelete({ _id: id });
        if (!emergencyIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(emergencyIssue);

        }
    }


     //update an emergency issue
    const updateEmergencyIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const emergencyIssue = await EmergencyIssue.findOneAndUpdate({ _id: id }, {
            ...req.body
        });
        if (!emergencyIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(emergencyIssue);
        }
    }

    module.exports = {
        createEmergencyIssue: createEmergencyIssue,
        getEmergencyIssues: getEmergencyIssues,
        getEmergencyIssue: getEmergencyIssue,
        deleteEmergencyIssue: deleteEmergencyIssue,
        updateEmergencyIssue: updateEmergencyIssue
    }