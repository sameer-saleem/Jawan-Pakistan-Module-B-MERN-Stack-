const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

// HTTP server for socket.io
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
app.use('/api/messages', messagesRoute); // all message APIs under /api/messages

// =====================
// Socket.io
// =====================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Track online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (email) => {
    onlineUsers.set(email, socket.id);
    console.log(`User ${email} joined`);
  });

  socket.on('sendMessage', async ({ sender, receiver, text }) => {
    try {
      // Save message to DB
      const message = await Message.create({ sender, receiver, text });

      // Emit to receiver if online
      const receiverSocket = onlineUsers.get(receiver);
      if (receiverSocket) io.to(receiverSocket).emit('receiveMessage', message);

      // Emit to sender to update UI
      const senderSocket = onlineUsers.get(sender);
      if (senderSocket) io.to(senderSocket).emit('receiveMessage', message);

    } catch (err) {
      console.log("Error saving message:", err);
    }
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

server.listen(5000, () => console.log('Server running on port 5000'));
