import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ color: "var(--white)", mb: 4, pb: 1, borderBottom: '1px solid var(--white)' }}>
                Products List
            </Typography>
            <Grid container spacing={2}>
                {products.map((item, i) => {
                    const { image, title, price, id } = item;
                    return (
                        <Grid size={3} sx={{ display: 'flex', alignSelf: 'stretch' }} key={i}>
                            <Card sx={{ border: "1px solid var(--white)", backgroundColor: 'transparent', width: '100%', height: '100%', borderRadius: '10px' }}>
                                <Box sx={{ textAlign: 'center', background: 'var(--white)' }}>
                                    <img src={image} alt="product img" height="200" />
                                </Box>
                                <Box sx={{ padding: '1rem', color: 'var(--white)' }}>
                                    <Typography variant="body1" sx={{ mb: 1 }}>{title}</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>${price}</Typography>
                                    <Button
                                        onClick={() => navigate(`/products/${id}`)}
                                        variant="outlined" sx={{backgroundColor: 'var(--white)', color: 'var(--primary)', fontWeight: '600'}}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
};

export default Products;
