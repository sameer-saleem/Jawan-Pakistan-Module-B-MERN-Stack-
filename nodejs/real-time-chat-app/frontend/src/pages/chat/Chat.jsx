import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Paper, TextField, Button, Typography } from '@mui/material';
import socket from '../../api/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = ({ chatWith }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector(state => state.auth.user?.email);
  const messagesEndRef = useRef(null);

  if (!currentUser || !chatWith) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6">Select a user from the sidebar to start chatting.</Typography>
      </Container>
    );
  }

  // Join socket room
  useEffect(() => {
  if (currentUser) {
    socket.emit('join', currentUser); // join socket room with the current user
  }
}, [currentUser]);

  // Load chat history
  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/${currentUser}/${chatWith}`)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, [currentUser, chatWith]);

  // Listen for messages
  useEffect(() => {
    const handleReceive = (msg) => {
      // Only add message if between currentUser and chatWith
      if (
        (msg.sender === currentUser && msg.receiver === chatWith) ||
        (msg.sender === chatWith && msg.receiver === currentUser)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    };
    socket.on('receiveMessage', handleReceive);
    return () => socket.off('receiveMessage', handleReceive);
  }, [currentUser, chatWith]);

  const handleSend = () => {
    if (!message.trim()) return;

    const msgObj = { sender: currentUser, receiver: chatWith, text: message };
    socket.emit('sendMessage', msgObj); // send to backend
    setMessage('');
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" mb={2}>Chat with {chatWith.split('@')[0]}</Typography>
      <Paper sx={{ p: 2, height: 400, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ mb: 1, textAlign: msg.sender === currentUser ? 'right' : 'left' }}>
            <Typography variant="body1">
              <strong>{msg.sender === currentUser ? 'You' : msg.sender.split('@')[0]}:</strong> {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>Send</Button>
      </Box>
    </Container>
  );
};

export default Chat;
