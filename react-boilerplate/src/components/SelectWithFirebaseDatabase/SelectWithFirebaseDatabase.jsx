import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// Note: Firebase needs to be installed and configured
// import { db } from '../../firebase'; // Assuming firebase config

const SelectWithFirebaseDatabase = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    // Fetch data from Firebase
    // const fetchData = async () => {
    //   const data = await db.collection('options').get();
    //   setOptions(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    // };
    // fetchData();
    // Placeholder data
    setOptions([
      { id: 1, name: 'Firebase Option 1' },
      { id: 2, name: 'Firebase Option 2' },
    ]);
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select with Firebase</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectWithFirebaseDatabase;
