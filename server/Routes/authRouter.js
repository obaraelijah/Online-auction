import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import authenticate from"../middleware/authenticate.js"
import User from "../model/userSchema.js";

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    res.send('Router js is called');
});


export default authRouter;