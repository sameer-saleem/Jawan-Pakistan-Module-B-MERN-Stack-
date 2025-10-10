import { Box, Typography, Button } from '@mui/material';
import chairImg from "../../assets/main-banner-bg.webp";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#c5e6e4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 6,
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      <Box sx={{ maxWidth: '50%' }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Biggest Offer Revealed
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
          MORE DEALS INSIDE
          <br />
          UP TO 50% OFF
        </Typography>

        <Button
          sx={{
            mt: 2,
            textTransform: 'none',
            color: '#888',
            fontWeight: 'bold',
            '&:hover': { color: 'black' },
          }}
          endIcon={<span>&raquo;</span>}
        >
          Wishlist Now
        </Button>
      </Box>

      <Box
        component="img"
        src={chairImg}
        alt="Chair Banner"
        sx={{
          maxHeight: 180,
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default Banner;