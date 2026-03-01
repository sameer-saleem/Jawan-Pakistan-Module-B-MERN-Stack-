import { useState } from "react";
import { Box, TextField, Button, Card, Typography, Grid } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const GithubFinder = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState([]);


    const searchUser = () => {
        if (username !== '') {
            fetch(`https://api.github.com/users/${username}`)
                .then(res => res.json())
                .then(data => setUserData([...userData, data]));
        } else {
            alert('Pls Enter Name')
        }
    };


    return (
        <Box>
            <Typography variant="h5" sx={{ color: "var(--white)", mb: 4, pb: 1, borderBottom: '1px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Git User Finder
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                        placeholder="e.g sameer-saleem"
                        onChange={e => setUsername(e.target.value)}
                        sx={{ backgroundColor: "white", borderRadius: '10px', borderTopRightRadius: '0', borderBottomRightRadius: '0', width: '400px' }}
                        size="small"
                    />
                    <Button variant="outlined" sx={{ backgroundColor: 'var(--white)', color: 'var(--primary)', fontWeight: '600', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }} onClick={searchUser} startIcon={<SearchOutlinedIcon />}></Button>
                </Box>
            </Typography>

            <Typography variant="h5" sx={{ color: "var(--white)", mb: 2 }}>
                Recent Searches
            </Typography>
            <Grid container spacing={2}>
                {userData.map((item, i) => {
                    const { login, name, location, followers, avatar_url } = item;
                    return (

                        <Grid size={3} sx={{ display: 'flex', alignSelf: 'stretch' }} key={i}>
                            <Card sx={{ border: "1px solid var(--white)", backgroundColor: 'transparent', width: '100%', height: '100%', borderRadius: '10px' }}>
                                <Box sx={{ textAlign: 'center', background: 'var(--white)' }}>
                                    <img src={avatar_url} alt="product img" height="200" />
                                </Box>
                                <Box sx={{ padding: '1rem', color: 'var(--white)' }}>
                                    <Typography variant="body1" sx={{ mb: 1 }}>ID: {login}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>Name: {name}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>Location: {location}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}>Followers: {followers}</Typography>
                                </Box>
                            </Card>
                        </Grid>

                    )
                })}
            </Grid>
        </Box>
    );
};

export default GithubFinder;
