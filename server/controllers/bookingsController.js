const Booking = require('../models/bookingsModel');
const mongoose = require('mongoose');


//get all vacancies 
const getBookings = async(req, res) => {
    const bookings = await Booking.find({}).sort({ createdAt: -1})

    res.status(200).json(bookings);
}

//get single booking
const getBooking = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Booking not found'});
    }

    const booking = await Booking.findById(id);
    if(!booking){
        return res.status(404).json({error: 'Booking not found'});
    }else{
        res.status(200).json(booking);
    }
}

//create new booking
const createBooking = async(req, res) => {
    const { location, service_type, client_name, email, phone, special_note} = req.body;

    let emptyFields = [];

    //validation for empty fields
    if(!location){
        emptyFields.push('location');
    }
    if(!service_type){
        emptyFields.push('service_type');
    }
    if(!client_name){
        emptyFields.push('client_name');
    }
    if(!email){
        emptyFields.push('email');
    }
    if(!phone){
        emptyFields.push('phone');
    }
    if(!special_note){
        emptyFields.push('special_note');
    }
    if(emptyFields.length > 0 ){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields});
    }

    //add to db
    try{
        const booking = await Booking.create({location, service_type, client_name, email, phone, special_note});
        res.status(200).json({ booking });
    } catch (error) {
        res.status(400).json({error: error.message});

    }

}

//delete vacancy
const deleteBooking = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Booking not found'});
    }
    const booking = await Booking.findOneAndDelete( {_id: id});
    if(!booking) {
        return res.status(404).json({error: 'Booking not found'});
    }else{
        res.status(200).json(booking);
    }

}

//update a booking
const updateBooking = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error : 'Booking not found'});
    }
    const booking = await Booking.findOneAndUpdate({_id :id},{
        ...req.body
    });
    if(!booking){
        return res.status(404).json({ error: 'Booking not found'});
    }else{
        res.status(200).json(booking);
    }
}


module.exports ={
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
}