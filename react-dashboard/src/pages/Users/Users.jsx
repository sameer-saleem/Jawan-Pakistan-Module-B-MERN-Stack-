import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ color: "var(--white)", mb: 4, pb: 1, borderBottom: '1px solid var(--white)' }}>
                Users List
            </Typography>
            <Table
                sx={{
                    borderCollapse: "collapse",
                    "& td, & th": {
                        color: "var(--white)",
                        borderBottom: "1px solid var(--white)",
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <PersonOutlineOutlinedIcon sx={{ fontSize: 26 }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Users
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <MailOutlinedIcon />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Emails
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <LanguageOutlinedIcon />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Website
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.website}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Users;
