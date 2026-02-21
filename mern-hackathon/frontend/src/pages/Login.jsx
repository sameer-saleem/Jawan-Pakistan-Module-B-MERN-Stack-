import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      console.log(res.data);
      localStorage.setItem("token", res.data.token); // save JWT token
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
}