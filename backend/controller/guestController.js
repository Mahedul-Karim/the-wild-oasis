const Guests = require('../models/guestModel');
const catchAsync = require('../util/catchAsync');

 
exports.createGuest = catchAsync(async (req,res,next)=>{

    const guest = await Guests.create(req.body);

    res.status(201).json({
        success:true,
        guest
    })

})