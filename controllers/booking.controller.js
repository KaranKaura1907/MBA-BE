const Booking= require('../models/booking.model');
const User= require('../models/user.model');
const constants= require('../utils/constants')
const getAllBookings = async (req,res)=>{
    try{
        const user= await User.findOne({
            userId: req.userId
        })
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).send("Internal Server Error")
    }
    const queryObj= {};
    if(user.userType == constants.userTypes.admin){}
    else {
        queryObj._id=user._id;
    }
    try{
        const bookings= await Booking.find(queryObj);
        res.status(200).send(bookings);
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while searching for the booking"
        })
    }
}
const getBookingById= async (req,res)=>{
    try{
        const bookings= await Booking.findOne({
            _id:req.params.id
        })
        res.status(200).send(bookings)
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while searching for the booking"
        })
    }
}
const createBooking = async (req,res)=>{
    const user= await User.findOne({
         userId: req.userId
    });
    var bookingObject = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constants.ticketPrice)
    }
    try{
        const booking = await Booking.create(bookingObject);
        res.status(201).send(booking);
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({
            message:"Internal error while creating the Booking"
        })
    }
}
const updateBooking = async (req,res)=>{
    const booking = await Booking.findOne({
        _id:req.params.id
    })
    booking.theatreId= req.body.theatreId?req.body.theatreId:booking.theatreId;
    booking.movieId= req.body.movieId?req.body.movieId:booking.movieId;
    booking.userId= req.body.userId?req.body.userId:booking.userId;
    booking.timing= req.body.timing?req.body.timing:booking.timing;
    booking.noOfSeats= req.body.noOfSeats?req.body.noOfSeats:booking.noOfSeats;
    booking.totalCost= req.body.totalCost?req.body.totalCost:booking.totalCost;
    booking.status= req.body.status?req.body.status:booking.status;
    try{
        const updatedBooking= await booking.save();
        res.status(201).send(updatedBooking);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({
            message:"Internal Error while updating the booking"
        })
    }
}
module.exports={
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking
}