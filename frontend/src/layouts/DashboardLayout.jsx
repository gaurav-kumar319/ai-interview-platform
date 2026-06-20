import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";



function DashboardLayout(){


  return (


    <Box

      sx={{

        display:"flex",

        minHeight:"100vh",

        background:"#f4f6f8"

      }}

    >


      <Sidebar />



      <Box

        component="main"

        sx={{

          flexGrow:1,

          p:3

        }}

      >


        <Outlet />


      </Box>



    </Box>


  );


}


export default DashboardLayout;