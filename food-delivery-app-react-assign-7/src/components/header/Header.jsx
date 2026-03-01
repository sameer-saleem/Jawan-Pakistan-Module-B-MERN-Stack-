import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';

function Header() {
  return (
    <AppBar position='sticky' sx={{ backgroundColor: '#F8F3E9' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FastfoodIcon sx={{ mr: 1 , color: '#5C3C2B'}} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: '#5C3C2B' }}
          >
            Ansari's Homemade Food
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button sx={{color:"#5C3C2B", fontWeight: '600'}} component={Link} to="/">Home</Button>
          <Button sx={{color:"#5C3C2B", fontWeight: '600'}} component={Link} to="/about">About Us</Button>
          <Button sx={{color:"#5C3C2B", fontWeight: '600'}} component={Link} to="/contact">Contact Us</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;