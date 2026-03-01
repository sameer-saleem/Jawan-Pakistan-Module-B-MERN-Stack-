import { Grid, Box, Typography, Paper } from '@mui/material';
import popular1 from "../../assets/popular-1.webp";
import popular2 from "../../assets/popular-2.webp";
import popular3 from "../../assets/popular-3.webp";

const promoData = [
  {
    bgColor: '#f0d9d9',
    title: 'UP TO 30% OFF',
    subtitle: 'For all hand purses',
    image: popular1,
  },
  {
    bgColor: '#e2e2e2',
    title: 'EXPLORE THE BIGGEST DISCOUNT',
    subtitle: 'Time Zone',
    image: popular2,
  },
  {
    bgColor: '#d5e8dd',
    title: "DON'T MISS THE YEAR END SELL",
    subtitle: '7 days left',
    image: popular3,
  },
];

const PopularCards = () => {
  return (
    <Grid container spacing={2}>
      {promoData.map((item, index) => (
        <Grid item size={{md: 4}} key={index}>
          <Paper
            elevation={1}
            sx={{
              backgroundColor: item.bgColor,
              backgroundImage: `url('${item.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'left top',
              backgroundRepeat: 'no-repeat',
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 220,
              width: '100%'
            }}
          >

            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                {item.subtitle}
              </Typography>
              {item.brand && (
                <Typography variant="h6" fontWeight="bold">
                  {item.brand}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularCards;