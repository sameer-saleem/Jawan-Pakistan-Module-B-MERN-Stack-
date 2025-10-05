import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const ProductCard = (props) => {
    const { id, image, title, price, category, description } = props;

    return (
        <Card
            id={id}

            sx={{
                maxWidth: {
                    xs: "100%",
                    sm: "320px",
                },
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)"
                }
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    height: 200,
                    objectFit: "cover",
                }}
            />
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: "text.primary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 500,
                        color: "primary.main",
                        mb: 1
                    }}
                >
                    ${price} <span style={{ color: "#777", fontSize: "0.9rem" }}>| {category}</span>
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
                >
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
