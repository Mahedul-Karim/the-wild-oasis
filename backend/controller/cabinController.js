const catchAsync = require("../util/catchAsync");
const Cabins = require("../models/cabinsModel");
const cloudinary = require("cloudinary");

exports.createCabins = catchAsync(async (req, res, next) => {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    req.body;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "cabins",
  });

  const cabins = await Cabins.create({
    name,
    maxCapacity,
    regularPrice,
    discount,
    image: result.url,
    description,
  });

  res.status(201).json({
    success: true,
    cabins,
  });
});

exports.getCabins = catchAsync(async (req, res, next) => {
  const cabins = await Cabins.find();

  res.status(200).json({
    success: true,
    cabins,
  });
});

exports.updateCabins = catchAsync(async (req, res, next) => {
  if (!req.body.image.startsWith("https")) {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "cabins",
    });
    req.body.image = result.url;
  }

  const cabins = await Cabins.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    cabins,
  });
});
