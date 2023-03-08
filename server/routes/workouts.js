const express = require('express')
const router = express.Router()

//Get all of the workouts (1)
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts' })
})

//Get single workout (2)
router.get('/:id', (req, res) => {
    res.json({ message: 'Get single workout' })
})

//Post a new workout (3)
router.post('/', (req, res) => {
    res.json({ message: 'Post a new workout' })
})

//Delete a workout (4)
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete a workout' })
})

//Update workout (5)
router.patch('/:id', (req, res) => {
    res.json({ message: 'Update a workout' })
})



module.exports = router