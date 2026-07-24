# 💬 MERN Chat App

A real-time chat application built with the MERN stack and Socket.IO, featuring secure authentication, instant messaging, image sharing, and a modern responsive interface.

## 🚀 Features

* 🔐 JWT Authentication
* 👤 User Registration & Login
* 💬 Real-time Messaging with Socket.IO
* 🟢 Online/Offline User Status
* 🖼️ Image Sharing with Cloudinary
* 🔒 Protected Routes
* 📱 Responsive UI
* ⚡ Instant Message Updates
* 🌙 Modern Chat Interface
* 🍪 Secure HTTP-only Cookie Authentication

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* DaisyUI
* Zustand
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* Cloudinary
* Cookie Parser
* bcrypt

---

## 📂 Project Structure

```text
chat-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-chat-app.git

cd mern-chat-app
```

### 2. Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the **frontend** directory.

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

---

## ▶️ Running the Project

Start the backend

```bash
cd backend
npm run dev
```

Start the frontend

```bash
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Image Storage: Cloudinary

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Signup Page
* Chat Interface
* Image Sharing
* Mobile View

---

## 🔮 Future Improvements

* Group Chats
* Message Reactions
* Read Receipts
* Typing Indicators
* Voice Messages
* Push Notifications
* User Profiles
* Message Search
* Emoji Support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Sawal Pushkarna**

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

⭐ If you found this project useful, consider giving it a star!
