const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  cabinId: {
    type: mongoose.Schema.ObjectId,
    ref: "Cabins",
  },
  guestId: {
    type: mongoose.Schema.ObjectId,
    ref:"Guests"
  },
  status:{
    type:String
  },
  numNights:{
    type:Number
  },
  hasBreakfast: {
    type: Boolean,
  },
  observations: {
    type: String,
  },
  isPaid: {
    type: Boolean,
  },
  numGuests: {
    type: Number,
  },
},{
  timestamps:true
});

const Bookings = mongoose.model("Bookings", bookingSchema);

module.exports = Bookings;
