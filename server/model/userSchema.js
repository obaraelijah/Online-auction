import mongoose from "mongoose";
import  bcrypt from "bcryptjs";
import { Jwt } from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cpassword: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    messages: [{
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }],
    fmessages: [{
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }],
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  });

  