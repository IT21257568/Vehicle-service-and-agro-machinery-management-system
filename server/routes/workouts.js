const express = require('express')
const Workout = require('../models/workoutsModel')
const router = express.Router()
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

//Get all of the workouts (1)
router.get('/', getWorkouts)

//Get single workout (2)
router.get('/:id', getWorkout)

//Post a new workout (3)
router.post('/', createWorkout)

//Delete a workout (4)
router.delete('/:id', deleteWorkout)

//Update workout (5)
router.patch('/:id', updateWorkout)



module.exports = router