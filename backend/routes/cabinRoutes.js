const express = require("express");

const {
  createCabins,
  getCabins,
  updateCabins,
} = require("../controller/cabinController");

const router = express.Router();

router.route("/").post(createCabins).get(getCabins).patch(updateCabins);

module.exports = router;
