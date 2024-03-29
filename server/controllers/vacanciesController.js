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
    const { vacancy_title, vacancy_type, vacancy_count, vacancy_requirements } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!vacancy_title) {
        emptyFields.push('Vacancy Tittle');
    }
    if (!vacancy_type) {
        emptyFields.push('Vacancy Type');
    }
    if (!vacancy_count) {
        emptyFields.push('Vacancy Count');
    }
    if (!vacancy_requirements) {
        emptyFields.push('Vacancy Requirements');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    }

    //add to db
    try {
        const vacancy = await Vacancy.create({ vacancy_title, vacancy_type, vacancy_count, vacancy_requirements });
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