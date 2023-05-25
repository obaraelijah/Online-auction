import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

/*THIS FILE IS FOR AUTHENTICATION TOKE VERIFICATION -> AT ANI TIME USER ID MUSTR BE VERIFY WITH CURRENT TOKE  ID THEN ONLY WE CAN RETRAIN INFORMATION FROM CURRRENT USER ID*/
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error('User Not Found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    console.log('error token verification');
    res.status(401).send('Unauthorised: No token provided');
  }
};

export default authenticate;