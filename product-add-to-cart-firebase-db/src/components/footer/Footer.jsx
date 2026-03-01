import { Box, Typography, Container} from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#5C3C2B',
        color: 'white',
        p: 1.38,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          © Ansari's Homemade Food, All rights reservered 
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;