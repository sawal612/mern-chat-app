import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req, res) => {
    // Handle user signup logic here
    const { fullName, email, password } = req.body;
    try {
        // password validation
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        // Check if the user already exists
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        if(newUser) {
            // now we can generate a token and send it to the user for authentication.
            const token = generateToken(newUser._id, res);
            await newUser.save();
            // Send a response to the client
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token: token
             });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    // Handle user login logic here
    const { email , password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'User does not exist'});
        }
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        // it compares the password entered by the user with the hashed password stored in the database. If the passwords match, it generates a token and sends it to the user for authentication.
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        // Generate a token and send it to the user for authentication
        const token = generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token: token
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    // Handle user logout logic here
    try {
        res.cookie('jwt', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: "internal error " });
    }
}

export const updateProfile = async (req,res) => {
    const {profilePic} = req.body;
    const userId = req.user._id;
    try {
        // Upload the profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }).select('-password');
        // secure_url is the URL of the uploaded image on Cloudinary. The updated user object is returned with the new profile picture URL.
        
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    }catch (error) {
        res.status(500).json({ message: "internal error " });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);        
    } catch (error) {
        res.status(500).json({ message: "internal error " });
    }
}