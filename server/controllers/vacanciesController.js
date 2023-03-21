const Vacancy = require('../models/vacanciesModel');
const mongoose = require('mongoose');

//get all vacancies
const getVacancies = async(req, res) => {
    const vacancies = await Vacancy.find({}).sort({ createdAt: -1 });

    res.status(200).json(vacancies);
}

//get single vacancy
const getVacancy = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Vacancy not found' });
        }

        const vacancy = await Vacancy.findById(id);
        if (!vacancy) {
            return res.status(404).json({ error: 'Vacancy not found' });
        } else {
            res.status(200).json(vacancy);
        }

    }
    //create new vacancy
const ceateVacancy = async(req, res) => {
    const { vacncy_title, vacncy_type, vacancy_count, vacncy_requirements } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!vacncy_title) {
        emptyFields.push('vacncy_title');
    }
    if (!vacncy_type) {
        emptyFields.push('vacncy_type');
    }
    if (!vacancy_count) {
        emptyFields.push('vacancy_count');
    }
    if (!vacncy_requirements) {
        emptyFields.push('vacncy_requirements');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    }

    //add to db
    try {
        const vacancy = await Vacancy.create({ vacncy_title, vacncy_type, vacancy_count, vacncy_requirements });
        res.status(200).json({ vacancy });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//delete a vacancy
const deleteVacancy = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Vacancy not found' });
        }
        const vacancy = await Vacancy.findOneAndDelete({ _id: id });
        if (!vacancy) {
            return res.status(404).json({ error: 'Vacancy not found' });
        } else {
            res.status(200).json(vacancy);

        }
    }
    //update a vacancy
const updateVacancy = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Vacancy not found' });
    }
    const vacancy = await Vacancy.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!vacancy) {
        return res.status(404).json({ error: 'Vacancy not found' });
    } else {
        res.status(200).json(vacancy);
    }
}



module.exports = {
    ceateVacancy,
    getVacancies,
    getVacancy,
    deleteVacancy,
    updateVacancy

}