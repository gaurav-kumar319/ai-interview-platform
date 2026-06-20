import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";


import {
  useNavigate,
  useLocation
} from "react-router-dom";


import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LogoutIcon from "@mui/icons-material/Logout";



const drawerWidth = 260;



function Sidebar() {


  const navigate = useNavigate();

  const location = useLocation();



  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };




  const items = [

    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard"
    },

    {
      text: "Interviews",
      icon: <AssignmentIcon />,
      path: "/history"
    },

    {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics"
    },

    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/profile"
    },

  ];




  return (

    <Drawer

      variant="permanent"

      sx={{

        width: drawerWidth,

        flexShrink: 0,


        "& .MuiDrawer-paper": {

          width: drawerWidth,

          boxSizing:"border-box",

          background:"#111827",

          color:"#ffffff",

          borderRight:"none",

        },

      }}

    >


      <Toolbar />



      {/* Logo */}

      <Box

        sx={{

          display:"flex",

          alignItems:"center",

          gap:1,

          px:3,

          py:2

        }}

      >

        <SmartToyIcon

          sx={{

            fontSize:35,

            color:"#60a5fa"

          }}

        />


        <Typography

          variant="h6"

          fontWeight="bold"

        >

          AI Interview

        </Typography>


      </Box>




      {/* Menu Items */}

      <List

        sx={{

          px:2,

          mt:2,

          flexGrow:1

        }}

      >


        {

          items.map((item)=>(


            <ListItem

              key={item.text}

              disablePadding

              sx={{mb:1}}

            >


              <ListItemButton


                onClick={()=>navigate(item.path)}


                sx={{


                  borderRadius:3,


                  background:

                  location.pathname === item.path

                  ? "#2563eb"

                  : "transparent",



                  "&:hover":{

                    background:"#1f2937"

                  }


                }}


              >


                <ListItemIcon

                  sx={{

                    color:"#ffffff",

                    minWidth:45

                  }}

                >

                  {item.icon}


                </ListItemIcon>



                <ListItemText

                  primary={item.text}

                  primaryTypographyProps={{

                    fontWeight:500

                  }}

                />


              </ListItemButton>


            </ListItem>


          ))

        }


      </List>




      {/* Logout */}

      <Divider

        sx={{

          background:"#374151"

        }}

      />



      <List sx={{px:2,mb:2}}>


        <ListItem disablePadding>


          <ListItemButton


            onClick={handleLogout}


            sx={{


              borderRadius:3,


              "&:hover":{

                background:"#1f2937"

              }


            }}


          >


            <ListItemIcon

              sx={{

                color:"#ffffff",

                minWidth:45

              }}

            >

              <LogoutIcon />

            </ListItemIcon>



            <ListItemText

              primary="Logout"

              primaryTypographyProps={{

                fontWeight:500

              }}

            />


          </ListItemButton>


        </ListItem>


      </List>



    </Drawer>

  );

}


export default Sidebar;