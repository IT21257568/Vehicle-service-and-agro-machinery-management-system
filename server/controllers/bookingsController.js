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
    const {
      location,
      service_type,
      client_name,
      email,
      phone,
      special_note,
      date_time,
      bookinguser_id,
    } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if(!location){
        emptyFields.push('Location');
    }
    if(!service_type){
        emptyFields.push('Service type');
    }
    if(!client_name){
        emptyFields.push('Client name');
    }
    if(!email){
        emptyFields.push('Email');
    } else {
        // Email validation // abc   @ gmail  .com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          emptyFields.push("Invalid Email Address");
        }
    }
    if(!date_time){
        emptyFields.push('Date & time');
    }
    if(!phone){
        emptyFields.push('Phone Number');
    }
    else if(phone.length>10 || phone.length<10){
        emptyFields.push('Invalid Contact Number');
    }
    if(!special_note){
        emptyFields.push('Special note');
    }
    
    
    if(emptyFields.length > 0 ){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields});
    }

    //add to db
    try{
        const booking = await Booking.create({
          location,
          service_type,
          client_name,
          email,
          phone,
          date_time,
          special_note,
          bookinguser_id,
        });
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