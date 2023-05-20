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