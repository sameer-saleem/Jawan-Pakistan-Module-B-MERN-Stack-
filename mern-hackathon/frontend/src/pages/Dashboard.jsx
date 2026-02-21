import React from "react";
import { Typography, Container, Button } from "@mui/material";

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Button onClick={handleLogout} variant="contained" sx={{ mt: 2 }}>Logout</Button>
    </Container>
  );
}