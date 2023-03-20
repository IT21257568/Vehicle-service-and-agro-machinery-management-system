const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vacancySchema = new Schema({
    vacncy_title: {
        type: String,
        required: true,

    },
    vacncy_type: {
        type: String,
        required: true,

    },
    vacancy_count: {
        type: Number,
        required: true,
    },
    vacncy_requirements: {
        type: String,
        required: true,

    },
}, { timestamps: true })

//const Vacancy = mongoose.model('Workout', workoutSchema)

module.exports = mongoose.model('Vacancy', vacancySchema)