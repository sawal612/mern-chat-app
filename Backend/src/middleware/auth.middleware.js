//middleware to validate token
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt; //get the token from the cookie
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token
        if(!decoded){
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
        const user = await User.findById(decoded.id).select('-password'); //get the user from the database 
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = user; //attach the user to the request object
        next(); //call the next middleware
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}