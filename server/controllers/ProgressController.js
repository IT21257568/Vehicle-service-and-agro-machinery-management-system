const Progress = require("../models/ProgressTrackingModel");
const mongoose = require('mongoose');

//get all progresses
const getAllProgresses = async(req, res) => {
    const progress = await Progress.find({}).sort({ createdAt: -1 });

    res.status(200).json(progress);
}

//get single progress
const getProgress = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Progress not found' });
        }

        const progress = await Progress.findById(id);
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        } else {
            res.status(200).json(progress);
        }

    }
    //create new progress
const ceateProgress = async(req, res) => {
    const { name, vehi_number, status, description } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!name) {
        emptyFields.push('name');
    }
    if (!vehi_number) {
        emptyFields.push('vehi_number');
    }
    if (!status) {
        emptyFields.push('status');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    }

    //add to db
    try {
        const progress = await Progress.create({ name, vehi_number, status, description });
        res.status(200).json({ progress: progress });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//delete a progress
const deleteProgress = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Progress not found' });
        }
        const progress = await Progress.findOneAndDelete({ _id: id });
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        } else {
            res.status(200).json(progress);

        }
    }
    //update a progress
const updateProgress = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Progress not found' });
    }
    const progress = await Progress.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!progress) {
        return res.status(404).json({ error: 'Progress not found' });
    } else {
        res.status(200).json(progress);
    }
}


module.exports = {
    ceateProgress,
    getAllProgresses,
    getProgress,
    deleteProgress,
    updateProgress

}