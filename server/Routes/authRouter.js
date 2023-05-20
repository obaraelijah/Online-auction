import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import authenticate from"../middleware/authenticate.js"
import User from "../model/userSchema.js";

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    res.send('Router js is called');
});

//Register
authRouter.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(400).json({ error: 'Fill all required fields properly' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password should be a minimum of 8 characters' });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ error: 'Email already exists' });
        } else if (password !== cpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        } else {
            const user = new User({ name, email, phone, password, cpassword });

            // Hashing is Used

            await user.save();

            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//signin


export default authRouter;