import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config()

const app = express();



// Handling uncaught exception
process.on("uncaughtException" , err => {
  console.log(`Error: ${err}`);
  console.log(`Server is closing due to Handling Uncaught Error Exception`);

});

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

// UNHANDLED PROMISE REJECTION
process.on("unhandledRejection" , err => {
  console.log(`Error : ${err.message}`);
  console.log(`Config file problem sutting down server due to unhandled promise rejection`);

  server.close(() => {
      process.exit(1);
  });
})