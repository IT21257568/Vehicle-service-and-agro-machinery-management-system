const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mTeamSchema = new Schema({
    member_name: {
        type: String,
        required: true,

    },
    member_age: {
        type: Number,
        required: true,

    },
    member_experiences: {
        type: Number,
        required: true,
    },
    member_expertise: {
        type: String,
        required: true,

    },
}, { timestamps: true })

//const Vacancy = mongoose.model('Workout', workoutSchema)

module.exports = mongoose.model('MTeam', mTeamSchema)