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
authRouter.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log(password.length);
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: 'Invalid credentials' });
            } else {
                token = await userLogin.generateAuthToken();
                console.log(token);

                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.json({ message: 'User signed in successfully' });
            }
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//about
authRouter.get('/about', authenticate, (req, res) => {
    console.log('about us page');
    // req.rootUser -> Sending Currently logged in person profile
    res.send(req.rootUser);
  });

//get userdata
authRouter.get('/getdata', authenticate , (req, res) => {
    console.log(`about us page`);
    // req.rootUser -> Sending Currently logged in person profile 
    res.send(req.rootUser);
});

//change password route
authRouter.put('/password/update', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.userID).select('+password');
  
      const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
  
      if (!isPasswordMatched) {
        res.status(400).json({ error: 'Old password incorrect' });
      }
  
      if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
      }
  
      user.password = req.body.newPassword;
  
      await user.save();
  
      res.status(200).send(req.token);
    } catch (error) {
      console.log(`Password reset error: ${error}`);
    }
  });

 //update user profile
 authRouter.put('/me/update', authenticate, async (req, res) => {
    console.log(req.body.name, req.body.email, req.body.phone);
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };
  
      const user = await User.findByIdAndUpdate(req.userID, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(`Profile Update error: ${error}`);
      res.status(400).json({ error: "Profile Update Error" });
    }
  });
    
 // contact us page route
 authRouter.post('/contact', authenticate, async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    try {
      if (!name || !email || !subject || !message) {
        console.log("Error in contact form at server side");
        return res.json({ error: "All fields must be filled" });
      }
  
      const userContact = await User.findOne({ _id: req.userID });
  
      if (userContact) {
        const userMessage = await userContact.addMessage(name, email, subject, message);
        await userContact.save();
  
        res.status(201).json({ message: "User Contact Form Saved Successfully" });
      }
    } catch (error) {
      console.log(`Contact form error: ${error}`);
    }
  });
  
  //feedback page
  authRouter.post('/feedback', authenticate, async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    try {
      if (!name || !email || !subject || !message) {
        console.log("Error in feedback form at server side");
        return res.json({ error: "All fields must be filled" });
      }
  
      const userContact = await User.findOne({ _id: req.userID });
  
      if (userContact) {
        const userMessage = await userContact.addFeedback(name, email, subject, message);
        await userContact.save();
  
        res.status(201).json({ message: "User Feedback Form Saved Successfully" });
      }
    } catch (error) {
      console.log(`Feedback form error: ${error}`);
    }
  });

 //logout functionality
 authRouter.get('/logout', authenticate, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
      await req.user.save();
      
      res.clearCookie('jwtoken', { path: '/' });
      
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(`Logout error: ${error}`);
      res.status(500).json({ error: "Server error" });
    }
  });

  

export default authRouter;