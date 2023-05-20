import mongoose from "mongoose";
import  bcrypt from "bcryptjs";
import { Jwt } from "jsonwebtoken";


const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    messages: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    fmessages: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  });
  
  // Hashing Password
  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
  });
  
  // Generating Token
  userSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (err) {
      throw new Error(`Failed to generate authentication token: ${err}`);
    }
  };
  
  // SAVE CONTACT DATA
  userSchema.methods.addMessage = async function (name, email, subject, message) {
    try {
      this.messages = this.messages.concat({ name, email, subject, message });
      await this.save();
      return this.messages;
    } catch (error) {
      throw new Error(`Failed to save contact data: ${error}`);
    }
  };
  
// SAVE FEEDBACK DATA
userSchema.methods.addFeedback = async function (name, email, subject, message) {
    try {
    this.fmessages = this.fmessages.concat({ name, email, subject, message });
    await this.save();
    return this.fmessages;
    } catch (error) {
    throw new Error(`Failed to save feedback data: ${error}`);
    }
    };
    
const User = mongoose.model('User', userSchema);
    
module.exports = User;

