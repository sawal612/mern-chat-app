import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getReceiverSocketId } from '../lib/socket.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        const fileredUsers = await User.find({_id: { $ne: loggedInUserId } }).select('fullName email profilePic'); // Exclude the logged-in user from the results
        // ne stands for "not equal" in MongoDB queries. It is used to filter out the logged-in user from the list of users returned by the query. The select method is used to specify which fields should be included in the results. In this case, we are only including the fullName, email, and profilePic fields of each user.
        res.status(200).json(fileredUsers);
    } catch(error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// The getMessages controller 
export const getMessages = async(req, res) => {
    try{
        const {id:userToChatId} = req.params; // Get the user ID from the request parameters
    const senderId = req.user._id; // Get the logged-in user's ID from the request object

    const messages = await Message.find({
        // The $or operator is used to find messages where either the sender is the logged-in user and the receiver is the user to chat with, or vice versa. This allows us to retrieve all messages exchanged between the two users, regardless of who sent them.
        $or: [
            { senderId: senderId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: senderId }
        ]
        //userToChatId is the ID of the user that the logged-in user wants to chat with. The messages are retrieved from the Message collection in the database, which stores all messages exchanged between users.
    })
    res.status(200).json(messages);
    }catch(error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
}

// The sendMessages controller
export const sendMessages = async (req, res) => {
    try{
        const {text, image} = req.body; // Get the message text and image from the request body
    const {id:receiverId} = req.params; // Get the receiver's ID from the request parameters
    const senderId = req.user._id; // Get the logged-in user's ID from the request object
    
    let imageUrl = null;
    //if user has sent an image, we will upload it to cloudinary and get the url of the image. We will then save the url in the database.
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
        senderId: senderId,
        receiverId: receiverId,
        text: text,
        image: imageUrl
    })
    await newMessage.save(); // Save the new message to the database
    
    // implementing socket.io to send the message in real-time to the receiver. We will use socket.io to emit the message to the receiver. The receiver will then receive the message in real-time without having to refresh the page.
    const receiverSocketId = getReceiverSocketId(receiverId); // Get the socket ID of the receiver using the getReceiverSocketId function from socket.js
    if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage', newMessage); // Emit the new message to the receiver's socket ID using the 'newMessage' event. The receiver will then receive the message in real-time without having to refresh the page.
    }
    res.status(201).json(newMessage); // Return the newly created message as a response
    } catch(error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    // todo : implement socket.io to send the message in real-time to the receiver. We will use socket.io to emit the message to the receiver. The receiver will then receive the message in real-time without having to refresh the page.
}