const express = require("express");

const {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  checkoutBooking,
  getRecentBooking,
  getRecentStays
} = require("../controller/bookingController");

const router = express.Router();

router.route("/").post(createBooking).get(getBookings);
router
  .route("/:bookingId")
  .get(getSingleBooking)
  .patch(updateBooking)
  .put(checkoutBooking);
router.route('/recent/:date').get(getRecentBooking)
router.route('/stays/:stays').get(getRecentStays)
module.exports = router;
