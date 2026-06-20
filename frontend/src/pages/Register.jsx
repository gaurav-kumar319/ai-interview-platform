import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
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


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      await API.post(
        "/auth/register",
        formData
      );


      alert("Registration successful");


      navigate("/login");


    } catch (error) {


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );


    } finally {

      setLoading(false);

    }

  };





  return (

    <Box

      sx={{

        minHeight:"100vh",

        background:
          "linear-gradient(to right,#141e30,#243b55)",

        display:"flex",

        alignItems:"center",

      }}

    >



      <Container maxWidth="sm">


        <Card

          sx={{

            borderRadius:4,

            boxShadow:10,

          }}

        >


          <CardContent

            sx={{

              p:5

            }}

          >



            <Typography

              variant="h4"

              fontWeight="bold"

              gutterBottom

              sx={{

                textAlign:"center"

              }}

            >

              Create Account

            </Typography>





            <Typography

              color="text.secondary"

              sx={{

                textAlign:"center",

                mb:4

              }}

            >

              Start your AI interview journey 🚀

            </Typography>





            <form onSubmit={handleSubmit}>


              <TextField

                fullWidth

                label="Name"

                name="name"

                margin="normal"

                required

                value={formData.name}

                onChange={handleChange}

              />





              <TextField

                fullWidth

                label="Email"

                name="email"

                type="email"

                margin="normal"

                required

                value={formData.email}

                onChange={handleChange}

              />





              <TextField

                fullWidth

                type="password"

                label="Password"

                name="password"

                margin="normal"

                required

                value={formData.password}

                onChange={handleChange}

              />







              <Button


                type="submit"

                fullWidth


                variant="contained"


                size="large"


                disabled={loading}


                sx={{

                  mt:3,

                  py:1.5,

                  borderRadius:3,

                  fontWeight:"bold",

                }}


              >

                {

                  loading ?

                  <CircularProgress size={25}/>

                  :

                  "Register"

                }


              </Button>





            </form>






            <Typography

              sx={{

                mt:3,

                textAlign:"center"

              }}

            >


              Already have an account?{" "}


              <Link

                to="/login"

              >

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