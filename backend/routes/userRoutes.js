const {
  createUser,
  loginUser,
  updateUser,
} = require("../controller/userController");
const express = require("express");

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/update").patch(updateUser);

module.exports = router;
