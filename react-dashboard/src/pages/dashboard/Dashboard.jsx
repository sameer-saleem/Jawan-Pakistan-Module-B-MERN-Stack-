import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Products from "../Products/Products";
import ProductDetail from "../ProductDetail/ProductDetail";
import Users from "../Users/Users";
import GithubFinder from "../Git-Finder/GithubFinder";
import { Routes, Route, NavLink } from "react-router-dom";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

const Container = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "1rem",
}));

const Dashboard = () => {
    return (
        <>
            <Container sx={{ padding: '2rem' }}>
                <NavLink to="/products"><Button variant="outlined" sx={{ borderColor: 'var(--white)', color: 'var(--white)' }}><Inventory2OutlinedIcon />Products</Button></NavLink>
                <NavLink to="/users"><Button variant="outlined" sx={{ borderColor: 'var(--white)', color: 'var(--white)' }}> <GroupOutlinedIcon /> Users</Button></NavLink>
                <NavLink to="/github"><Button variant="outlined" sx={{ borderColor: 'var(--white)', color: 'var(--white)' }}><PersonSearchOutlinedIcon /> GitHub Finder</Button></NavLink>
            </Container>
            <Box sx={{ p: 3 }}>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/github" element={<GithubFinder />} />
                </Routes>
            </Box>
        </>
    );
};

export default Dashboard;