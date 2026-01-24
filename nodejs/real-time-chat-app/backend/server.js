const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server for socket.io
const server = http.createServer(app);

// Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const messagesRoute = require('./routes/messages');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/messages', messagesRoute); // keep all messages APIs under /api/messages

// =====================
// Socket.io setup
// =====================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"]
  }
});

// Track connected users (email -> socket.id)
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join', (email) => {
    onlineUsers.set(email, socket.id);
    console.log(`User ${email} joined with socket id ${socket.id}`);
  });

  // Send message to specific receiver
  socket.on('sendMessage', ({ sender, receiver, text }) => {
    const receiverSocket = onlineUsers.get(receiver);
    const message = { sender, receiver, text, createdAt: new Date() };

    // Only send to receiver
    if (receiverSocket) {
      io.to(receiverSocket).emit('receiveMessage', message);
    }

    // Sender adds message locally in client, no need to emit back
  });

  socket.on('disconnect', () => {
    for (let [email, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(email);
        console.log(`User ${email} disconnected`);
        break;
      }
    }
  });
});

// =====================
// Start server
// =====================
server.listen(5000, () => {
  console.log('Server running on port 5000');
});
