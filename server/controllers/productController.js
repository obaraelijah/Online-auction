import Product from "../model/productModel";
import ErrorHandler from "../utils/errorHander";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ApiFeatures from "../utils/apifeatures";
import cloudinary from "cloudinary";

import jwt from "jsonwebtoken";
import User from "../model/userSchema";

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    console.log(`Create Product Function from Route Called`);
  
    try {
      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!rootUser) {
        throw new Error("User Not Found");
      }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
    } catch (err) {
      console.log(`error token verification`);
      return res.status(401).send("Unauthorized: No token provided");
    }
  
    let images = [];
  
    if (typeof req.body.images === "string") {
      // Single Image received
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLink = [];
  
    for (let i = 0; i < images.length; i++) {
      try {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (err) {
        console.log(`Error uploading image: ${err}`);
        return res.status(500).send("Internal Server Error");
      }
    }
  
    req.body.images = imagesLink;
  
    try {
      let product = new Product(req.body);
      product.seller = req.userID;
      await product.save();
  
      res.status(201).json({
        success: true,
        product,
      });
    } catch (err) {
      console.log(`Error creating product: ${err}`);
      return res.status(500).send("Internal Server Error");
    }
  });

  //getting all products
  exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 9;
    const productCount = await Product.countDocuments({ bidEnd: { $gt: new Date() } });
  
    const apiFeature = new ApiFeatures(
      Product.find({ bidEnd: { $gt: new Date() } })
        .populate("seller", "_id name phone email")
        .populate("bids.bidder", "_id name"),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage);
  
    const products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
    });
  });
    
  exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
  
    // Check if new images are provided
    if (req.body.images) {
      // Delete existing images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLink = [];
      const images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
  
      // Upload new images to Cloudinary
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLink;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

