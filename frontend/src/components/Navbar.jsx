import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";


import {
  useState,
} from "react";


import {
  useNavigate
} from "react-router-dom";


import AccountCircleIcon from "@mui/icons-material/AccountCircle";



function Navbar(){


const navigate = useNavigate();


const [anchorEl,setAnchorEl] = useState(null);



const user = JSON.parse(
  localStorage.getItem("user")
);



const handleMenu = (event)=>{

  setAnchorEl(event.currentTarget);

};



const handleClose = ()=>{

  setAnchorEl(null);

};



const handleLogout = ()=>{


  localStorage.removeItem("token");

  localStorage.removeItem("user");


  navigate("/login");


};



return (


<AppBar

position="fixed"


sx={{

background:"#ffffff",

color:"#111827",

boxShadow:"0 2px 10px rgba(0,0,0,0.08)"

}}


>


<Toolbar>



<Typography

variant="h6"

sx={{

flexGrow:1,

fontWeight:"bold"

}}

>

AI Interview Platform

</Typography>





<Box

sx={{

display:"flex",

alignItems:"center",

gap:2

}}

>


<Typography>

{

user?.name || "User"

}

</Typography>



<IconButton

onClick={handleMenu}

>


<Avatar>


{

user?.name

?

user.name.charAt(0).toUpperCase()

:

<AccountCircleIcon/>

}


</Avatar>


</IconButton>



</Box>






<Menu


anchorEl={anchorEl}


open={Boolean(anchorEl)}


onClose={handleClose}



>



<MenuItem

onClick={()=>navigate("/profile")}

>

Profile

</MenuItem>



<MenuItem

onClick={()=>navigate("/settings")}

>

Settings

</MenuItem>



<MenuItem

onClick={handleLogout}

>

Logout

</MenuItem>



</Menu>



</Toolbar>


</AppBar>


)


}



export default Navbar;