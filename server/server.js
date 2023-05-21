import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';


import authRouter from './Routes/authRouter.js';
import productsRouter from './Routes/productsRouter.js';

import errorManager from './middleware/error.js';

dotenv.config()

const app = express();

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());


//cloudinary config
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handling uncaught exception
process.on("uncaughtException" , err => {
  console.log(`Error: ${err}`);
  console.log(`Server is closing due to Handling Uncaught Error Exception`);

});

// Routers
app.use(authRouter);
app.use(productsRouter);

//middleware for errors
app.use(errorManager);


//db connection
async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful!!!");
  } catch (error) {
    console.error(error);
  }
}
connect();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at: http://localhost:${port}`);
});

// Unhandle promise rejection
process.on("unhandledRejection" , err => {
  console.log(`Error : ${err.message}`);
  console.log(`Config file problem sutting down server due to unhandled promise rejection`);

  server.close(() => {
      process.exit(1);
  });
})