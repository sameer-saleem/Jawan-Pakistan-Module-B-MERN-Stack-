import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Link to="/" className='link'>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'white',
                                textDecoration: 'none'
                                
                            }}
                        >
                            Dynamic Products
                        </Typography>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;