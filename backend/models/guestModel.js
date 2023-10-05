const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  nationality: {
    type: String,
  },
  nationalId: {
    type: String,
  },
  countryFlag: {
    type: String,
  },
  password: {
    type: String,
  },
});

guestSchema.pre("save",async function (next) {
  if(!this.isModified('password')){
    return next()
  }
  await bcrypt.hash(this.password, 10);
});

const Guests = mongoose.model('Guests',guestSchema);

module.exports = Guests;
