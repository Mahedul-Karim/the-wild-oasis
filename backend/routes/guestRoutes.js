const { createGuest } = require('../controller/guestController');
const express = require("express");


const router = express.Router();

router.route("/").post(createGuest);

module.exports = router;