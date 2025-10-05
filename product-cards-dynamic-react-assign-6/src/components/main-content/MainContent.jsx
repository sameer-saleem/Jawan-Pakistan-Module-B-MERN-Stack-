import { useEffect, useState } from "react"
import ProductCard from "../product-card/ProductCard"
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import ProductDetailPage from "../product-card-detail/ProductCardDetail";

const MainContent = () => {
    const [productsData, setProductsData] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProductsData(data));
    }, []);

    return (
        <main className="main-content">
            <Container>
                <Grid container spacing={2}>
                    {productsData && productsData.map((item, i) => {
                        const { id, image, title, price, category, description } = item;
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                                <ProductCard id={id} image={image} title={title} price={price} category={category} description={description} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </main>
    )
}

export default MainContent