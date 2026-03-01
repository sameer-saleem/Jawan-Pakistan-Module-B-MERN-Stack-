import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CustomIconButton = () => {
  return (
    <IconButton aria-label="favorite">
      <FavoriteIcon />
    </IconButton>
  );
};

export default CustomIconButton;
