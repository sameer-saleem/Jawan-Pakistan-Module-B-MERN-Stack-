import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';

const categories = [
  "Traditional Wear",
  "Western Wear",
  "Swim & Beachwear",
  "Winter & Seasonal Wear",
  "Beauty & Groomng",
  "Juwellery",
  "Personal care Appliances",
  "International Brands",
  "Foot Wear",
  "Watches",
  "Accessories"
];

const CategoryList = () => {
  return (
    <Paper elevation={2} sx={{ width: '100%' }}>
      <List disablePadding>
        {categories.map((category, index) => (
          <React.Fragment key={category}>
            <ListItemButton>
              <ListItemText primary={category} />
            </ListItemButton>
            {index < categories.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;