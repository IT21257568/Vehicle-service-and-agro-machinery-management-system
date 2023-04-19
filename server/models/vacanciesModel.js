const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vacancySchema = new Schema(
  {
    vacancy_title: {
      type: String,
      required: true,
    },
    vacancy_type: {
      type: String,
      required: true,
    },
    vacancy_count: {
      type: Number,
      required: true,
    },
    vacancy_requirements: {
      type: String,
      required: true,
    },
    vacancy_applicants: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//const Vacancy = mongoose.model('Workout', workoutSchema)

module.exports = mongoose.model("Vacancy", vacancySchema);
