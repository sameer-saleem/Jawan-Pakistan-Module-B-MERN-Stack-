import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { logout } from '../features/auth/authSlice';
import { ChatBubbleOutline, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const drawerWidth = 260;

const Sidebar = ({ setChatWith, chatWith }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [users, setUsers] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    };

    // Fetch users from backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                // Exclude logged-in user
                setUsers(res.data.filter(u => u.email !== user.email));
            })
            .catch(err => console.log(err));
    }, [user]);

    return (
        <Box sx={{ width: drawerWidth, borderRight: '1px solid #e0e0e0', bgcolor: 'white', p: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', margin: '0 auto', mb: 1.5 }}>
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="subtitle1">{user?.email?.split('@')[0]}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Users</Typography>
            <List>
                {users.map(u => (
                    <ListItem key={u.email} disablePadding>
                        <ListItemButton
                            selected={chatWith === u.email}
                            onClick={() => setChatWith(u.email)}
                        >
                            <ListItemIcon><ChatBubbleOutline /></ListItemIcon>
                            <ListItemText primary={u.email.split('@')[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><ExitToApp color="error" /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
