import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Primary"
      />
    </FormGroup>
  );
};

export default CustomCheckbox;
