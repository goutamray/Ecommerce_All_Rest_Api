import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    try {
        // get cookie 
       const accessToken = req.cookies.accessToken;
       
      // check token
      if (!accessToken) {
        return res.status(400).json({  message : "Unauthorized"}); 
      }; 

        jwt.verify(accessToken, process.env.USER_LOGIN_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.status(403).json({ message: 'Invalid or Expired Token' });
            }

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                console.error('User not found for token:', decoded.id);
                return res.status(404).json({ message: 'User Not Found' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Server Error in verifyAccessToken:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default verifyAccessToken;

















