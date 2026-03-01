import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Chat from '../chat/Chat';

const Dashboard = () => {
  const [chatWith, setChatWith] = useState(null);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar: pass setChatWith to update selected user */}
      <Sidebar setChatWith={setChatWith} chatWith={chatWith} />

      {/* Main content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {chatWith ? (
          <Chat chatWith={chatWith} />
        ) : (
          <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
            Select a user from the sidebar to start chatting
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
