import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This line specifies that the receiverId field is a reference to the User model, indicating that it should store the ObjectId of a user document in the database.
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;