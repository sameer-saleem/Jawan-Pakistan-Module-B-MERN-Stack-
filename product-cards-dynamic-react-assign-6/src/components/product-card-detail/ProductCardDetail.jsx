import { Box, Card, CardMedia, Typography, Button, Divider } from "@mui/material";

const ProductDetailPage = (props) => {
  const { image, title, price, category, description } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 4,
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Card
        sx={{
          flex: 1,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: { xs: 300, md: 500 },
            objectFit: "cover",
          }}
        />
      </Card>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Category: {category}
        </Typography>

        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          ${price}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;