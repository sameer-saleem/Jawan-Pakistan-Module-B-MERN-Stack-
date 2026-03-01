import React from 'react';
import { Typography, Box } from '@mui/material';

const PageHeader = () => {
  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="h4" component="h1">
        Page Header
      </Typography>
    </Box>
  );
};

export default PageHeader;
