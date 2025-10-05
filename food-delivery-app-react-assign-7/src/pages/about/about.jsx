import { Box, Typography, Container } from '@mui/material';

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h1">
          About Ansari's Homemade Food
        </Typography>
      </Box>

      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repellendus eligendi hic deleniti facere alias ex quidem, iure porro laborum accusantium, debitis recusandae dolorem et maxime, explicabo error a praesentium?
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repellendus eligendi hic deleniti facere alias ex quidem, iure porro laborum accusantium, debitis recusandae dolorem et maxime, explicabo error a praesentium?
      </Typography>

      <Typography variant="h5" component="h2" sx={{ mt: 4 }} gutterBottom>
        Our Commitment
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repellendus eligendi hic deleniti facere alias ex quidem, iure porro laborum accusantium, debitis recusandae dolorem et maxime, explicabo error a praesentium?
      </Typography>
    </Container>
  );
}

export default AboutPage;