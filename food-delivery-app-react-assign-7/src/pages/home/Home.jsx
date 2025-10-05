import { Box, Typography, Container, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import BannerBg from "../../assets/banner-bg.webp";

const BannerBox = styled(Box)(() => ({
  backgroundImage: `url(${BannerBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    inset: '0',
    zIndex: '0',
    backgroundColor: 'rgba(248, 243, 233, 60%)'
  }
}));

function HomePage() {
  return (
    <Box>
      <BannerBox>
        <Typography variant="h3" component="h1" sx={{ zIndex: '1', color: '#5c3c2bff' }}>
          Taste the Comfort of Homemade
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, zIndex: '1', color: '#5C3C2B' }} >
          Freshly prepared meals, delivered to your doorstep.
        </Typography>
        <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} size="large">
          Order Now
        </Button>
      </BannerBox>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" align="center" sx={{ mb: 4 }}>
          We are Offering
        </Typography>
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                src='https://images.deliveryhero.io/image/fd-pk/Products/31866964.jpg?width=%s'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Paratha
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} fullWidth>
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                src='https://images.deliveryhero.io/image/fd-pk/Products/34359142.jpg?width=%s'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Chicken Karahi
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} fullWidth>
                   Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                src='https://images.deliveryhero.io/image/fd-pk/Products/39196259.jpg?width=%s'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Mutter Pulao
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} fullWidth>
                   Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                src='https://images.deliveryhero.io/image/fd-pk/Products/5637305.jpg?width=%s'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Salad
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} fullWidth>
                   Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                src='https://images.deliveryhero.io/image/fd-pk/Products/5537209.jpg?width=%s'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Daal Mash
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" sx={{backgroundColor: 'rgba(92, 60, 43, 75%)'}} fullWidth>
                   Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;