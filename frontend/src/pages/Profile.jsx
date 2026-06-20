import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
} from "@mui/material";


import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


import { useEffect, useState } from "react";

import API from "../api/axios";



function Profile(){


  const [user,setUser] = useState(null);



  const fetchProfile = async()=>{


    try{


      const res = await API.get("/user/profile");


      setUser(res.data);


    }

    catch(error){


      console.log(error);


    }


  };




  useEffect(()=>{

    fetchProfile();

  },[]);




  if(!user){

    return (

      <Typography>

        Loading profile...

      </Typography>

    );

  }





  return(


    <Container maxWidth="md" sx={{mt:5}}>


      <Card

        sx={{

          borderRadius:5,

          overflow:"hidden",

          boxShadow:5

        }}

      >


        {/* Header */}

        <Box

          sx={{

            height:150,

            background:
            "linear-gradient(135deg,#2563eb,#7c3aed)"

          }}

        />




        <CardContent

          sx={{

            textAlign:"center",

            mt:-8

          }}

        >


          <Avatar

            sx={{

              width:120,

              height:120,

              margin:"auto",

              fontSize:50,

              background:"#2563eb",

              border:"5px solid white"

            }}

          >

            {user.name
            .charAt(0)
            .toUpperCase()}


          </Avatar>




          <Typography

            variant="h4"

            fontWeight="bold"

            sx={{mt:2}}

          >

            {user.name}

          </Typography>




          <Typography

            color="text.secondary"

          >

            AI Interview Platform User

          </Typography>



          <Divider sx={{my:4}} />




          <Grid container spacing={3}>


            <Grid item xs={12} md={4}>


              <Paper

                sx={{

                  p:3,

                  borderRadius:3

                }}

              >

                <EmailIcon color="primary"/>


                <Typography
                fontWeight="bold"
                >

                  Email

                </Typography>


                <Typography
                color="text.secondary"
                >

                  {user.email}

                </Typography>


              </Paper>


            </Grid>







            <Grid item xs={12} md={4}>


              <Paper

                sx={{

                  p:3,

                  borderRadius:3

                }}

              >


                <BadgeIcon color="primary"/>


                <Typography
                fontWeight="bold"
                >

                  User ID

                </Typography>


                <Typography
                color="text.secondary"
                >

                  {user.id}

                </Typography>


              </Paper>


            </Grid>








            <Grid item xs={12} md={4}>


              <Paper

                sx={{

                  p:3,

                  borderRadius:3

                }}

              >


                <CalendarMonthIcon color="primary"/>


                <Typography
                fontWeight="bold"
                >

                  Joined

                </Typography>


                <Typography
                color="text.secondary"
                >

                {
                new Date(
                user.created_at
                )
                .toLocaleDateString()
                }


                </Typography>


              </Paper>


            </Grid>



          </Grid>




        </CardContent>


      </Card>


    </Container>


  );


}



export default Profile;