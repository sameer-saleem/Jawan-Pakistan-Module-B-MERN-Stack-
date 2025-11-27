import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CustomSelect = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select Option</InputLabel>
      <Select value={value} onChange={handleChange}>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
