import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 10,
          }}
        >
          <CardContent sx={{ p: 5 }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
            >
              Create Account
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mb={4}
            >
              Start your AI interview journey 🚀
            </Typography>

            <form onSubmit={handleSubmit}>

              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                margin="normal"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                }}
              >
                Register
              </Button>

            </form>

            <Typography
              mt={3}
              textAlign="center"
            >
              Already have an account?{" "}
              <Link to="/">
                Login
              </Link>
            </Typography>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;