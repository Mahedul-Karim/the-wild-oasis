const Users = require("../models/userModel");
const catchAsync = require("../util/catchAsync");

const cloudinary = require('cloudinary')

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);

  res.status(201).json({
    success: true,
    user,
  });
});
exports.loginUser = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({email:req.body.email});

  if(!user){
    throw new Error('User does not exist!')
  }

  const verify = await user.comparePassword(req.body.password);

  if(!verify){
    throw new Error('Invalid credentials!')
  }

  res.status(201).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsync (async (req,res,next)=>{


  if(req.body.avatar){
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars"
    });
    req.body.avatar = result.url;
  }

  const user = await Users.findByIdAndUpdate(req.body.id,req.body,{
    new:true
  });

  res.status(200).json({
    success:true,
    user
  })

})