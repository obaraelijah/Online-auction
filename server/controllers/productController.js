import Product from "../model/productModel.js";
import ErrorHandler from "../utils/errorHander.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";

import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
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
  export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
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
    
  export const updateProduct = catchAsyncErrors(async (req, res, next) => {
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

// Deleting a product
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  });

  //get a specific product
  export const getMyProducts = catchAsyncErrors(async (req, res) => {
    try {
      // Get current token from JWT token
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
      res.status(401).send("Unauthorized: No token provided");
    }
  
    let sellerproducts = await Product.find({ seller: req.userID })
      .populate("seller", "_id name phone")
      .populate("bids.bidder", "_id name phone");
  
    console.log(`myProduct page Called`);
    res.status(200).json({
      success: true,
      sellerproducts,
    });
  });

  // get bidded product --> bid status
  export const getBiddedProduct = catchAsyncErrors(async (req, res) => {
    console.log(`get Bidded product Page called`);
    try {
      // Get current token from JWT token
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
      res.status(401).send("Unauthorized: No token provided");
    }
  
    let myproducts = await Product.find({ "bids.bidder": req.userID })
      .populate("seller", "_id name phone")
      .populate("bids.bidder", "_id name phone");
  
    res.status(200).json({
      success: true,
      myproducts,
    });
  });
  
  
//get product details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
      .populate("seller", "_id name phone email")
      .populate("bids.bidder", "_id name phone email");
    const sellerDetails = product.seller;
  
    const bidWinner = product.bids.reduce((prev, current) => {
      return prev.bid > current.bid ? prev : current;
    });
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
      sellerDetails,
      winStatus: bidWinner,
    });
  });

//place bid on products
export const placeBidOnProduct = catchAsyncErrors(async (req, res, next) => {
    console.log(`Place Bid On Product Function from Route Called`);
  
    try {
      // Get current token from JWT token
      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
      if (!rootUser) {
        throw new Error('User Not Found');
      }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
    } catch (err) {
      console.log(`Error token verification`);
      res.status(401).send('Unauthorized: No token provided');
    }
  
    console.log(req.body);
    // This body contains Product Id and bid Amount
  
    const bid = {
      bidder: req.userID,
      bid: req.body.bidAmount,
      time: Date.now(),
    };
  
    console.log(bid);
  
    let product = await Product.findById(req.body.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
  
    // Update bid on product
    product.bids.push(bid);
    product = await product.save();
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  