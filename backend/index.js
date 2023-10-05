const express = require("express");
const cors = require("cors");

const cabinRouter = require("./routes/cabinRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const guestRouter = require('./routes/guestRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/guest", guestRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;
