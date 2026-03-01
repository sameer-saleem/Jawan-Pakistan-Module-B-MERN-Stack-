import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MoodIcon from '@mui/icons-material/Mood';
import { Link } from 'react-router-dom';
import { Box, colors } from '@mui/material';

const Header = () => {

    const AppBar = styled(MuiAppBar)(() => ({
        backgroundColor: 'var(--primary)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--border-default)',
        top:"0"
    }));

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                <Typography variant="h5" noWrap component="div">
                   <Link to="/products"> <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>Welcome to Dashboard <MoodIcon /></Box></Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;