import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// profile pic route
router.put('/profile-pic', protectRoute , updateProfile);

// check auth route because we want to check if the user is logged in or not. If the user is logged in, we will return the user's data. If the user is not logged in, we will return an error message.
router.get('/check' , protectRoute , checkAuth); 

export default router;
