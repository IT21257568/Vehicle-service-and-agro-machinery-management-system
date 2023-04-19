const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mTeamSchema = new Schema(
  {
    technician_name: {
      type: String,
      required: true,
    },
    technician_age: {
      type: Number,
      required: true,
    },
    technician_experiences: {
      type: Number,
      required: true,
    },
    technician_expertise: {
      type: String,
      required: true,
    },
    technician_picture_url: {
      type: String,
      required: true,
    },technician_specialize_in: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//const Vacancy = mongoose.model('Workout', workoutSchema)

module.exports = mongoose.model('MTeam', mTeamSchema)