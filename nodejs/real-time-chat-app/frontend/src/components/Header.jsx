import { Typography, AppBar, Toolbar } from '@mui/material';

const Header = () => {
    return (
        <>
            {/* Header */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    borderBottom: '1px solid #e0e0e0',
                    color: 'text.primary',
                    width: 'calc(100% - 260px)',
                    ml: 'auto'
                }}
            >
                <Toolbar>
                    <Typography variant="h6" fontWeight={600}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header