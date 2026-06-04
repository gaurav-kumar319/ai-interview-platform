import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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
      const res = await API.post("/auth/login", formData);

      login(res.data.token, res.data.user);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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
              AI Interview Prep
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mb={4}
            >
              Welcome back 👋
            </Typography>

            <form onSubmit={handleSubmit}>

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
                Login
              </Button>

            </form>

            <Typography
              mt={3}
              textAlign="center"
            >
              Don&apos;t have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </Typography>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;