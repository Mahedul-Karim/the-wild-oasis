const catchAsync = require("../util/catchAsync");
const Bookings = require("../models/bookingModel");
const Cabins = require("../models/cabinsModel");

exports.createBooking = catchAsync(async (req, res, next) => {
  const bookings = await Bookings.create({
    ...req.body,
    status: "unconfirmed",
  });

  res.status(201).json({
    success: true,
    bookings,
  });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Bookings.find()
    .populate("cabinId", "name regularPrice")
    .populate("guestId", "fullName email country countryFlag");

  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getSingleBooking = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Bookings.findById(bookingId)
    .populate("cabinId", "name regularPrice")
    .populate("guestId", "fullName email country countryFlag nationalID");

  res.status(200).json({
    success: true,
    booking,
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Bookings.findByIdAndUpdate(bookingId, {
    status: "checked-in",
    isPaid: true,
  });

  res.status(200).json({
    success: true,
  });
});
exports.checkoutBooking = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Bookings.findByIdAndUpdate(bookingId, {
    status: "checked-out",
  });

  res.status(200).json({
    success: true,
  });
});

exports.getRecentBooking = catchAsync(async (req, res, next) => {
  const recentBooking = await Bookings.find({
    $and: [
      {
        createdAt: { $gte: req.params.date },
      },
      {
        createdAt: { $lte: new Date().toISOString() },
      },
    ],
  })
    .populate("cabinId", "name regularPrice")
    .populate("guestId", "fullName email country countryFlag nationalID");

  res.status(200).json({
    success: true,
    recentBooking,
  });
});
exports.getRecentStays = catchAsync(async (req, res, next) => {
  const recentStays = await Bookings.find({
    $and: [
      {
        startDate: { $gte: req.params.stays },
      },
      {
        startDate: { $lte: new Date().toISOString() },
      },
    ],
  })
    .populate("cabinId", "name regularPrice")
    .populate("guestId", "fullName email country countryFlag nationalID");

  res.status(200).json({
    success: true,
    recentStays,
  });
});
