const GeneralIssue = require('../models/generalIssueModel');
const mongoose = require('mongoose');


    //get all general issues
    const getGeneralIssues = async(req, res) => {
        const generalIssues = await GeneralIssue.find({}).sort({ createdAt: -1 });

        res.status(200).json(generalIssues);

    }

    //get single general issue
    const getGeneralIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        const generalIssue = await GeneralIssue.findById(id);
        if (!generalIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(generalIssue);
        }

    }


    //create new general issue
    const createGeneralIssue = async(req, res) => {
        const { customer_name, customer_NIC, contact_number, GN_discription, issue_status } = req.body;
    
        let emptyFields = [];
    
        //validation for empty fields
        if (!customer_name) {
            emptyFields.push('customer_name');
        }
        if (!customer_NIC) {
            emptyFields.push('customer_NIC');
        }
        if (!contact_number) {
            emptyFields.push('contact_number');
        }
        if (!GN_discription) {
            emptyFields.push('GN_discription');
        }
        if (!issue_status) {
            emptyFields.push('issue_status');
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
        }
    
        //add to db
        try {
            const generalIssue = await GeneralIssue.create({ customer_name, customer_NIC, contact_number, GN_discription, issue_status });
            res.status(200).json({ generalIssue: generalIssue });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    
    }

    //delete a general issue
    const deleteGeneralIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const generalIssue = await GeneralIssue.findOneAndDelete({ _id: id });
        if (!generalIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(generalIssue);

        }
    }


     //update a general issue
    const updateGeneralIssue = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const generalIssue = await GeneralIssue.findOneAndUpdate({ _id: id }, {
            ...req.body
        });
        if (!generalIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        } else {
            res.status(200).json(generalIssue);
        }
    }

    module.exports = {
        createGeneralIssue,
        getGeneralIssues,
        getGeneralIssue,
        deleteGeneralIssue,
        updateGeneralIssue
    }