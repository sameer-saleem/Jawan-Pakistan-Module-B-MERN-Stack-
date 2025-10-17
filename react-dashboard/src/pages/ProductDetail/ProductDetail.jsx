import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";

const ProductDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setData(data));
        console.log(data)
    }, [id]);

    if (!data) return <Typography color="white">Loading...</Typography>;
    const { image, title, description, price } = data;

    return (

        <Card sx={{ border: "1px solid var(--white)", backgroundColor: 'transparent', width: '100%', height: '100%', borderRadius: '10px', display: 'flex' }}>
            <CardMedia component="img" image={image} alt={title} sx={{ textAlign: 'center', background: 'var(--white)', height: '600px', width: '600px', padding: '1rem' }} />
            <Box sx={{ padding: '1rem', color: 'var(--white)' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography variant="body1">{description}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    ${price}
                </Typography>
            </Box>
        </Card>
    );
};

export default ProductDetail;
