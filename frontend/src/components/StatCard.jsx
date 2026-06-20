import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";


function StatCard({title,value,icon,gradient}){


return(

<Card

sx={{

borderRadius:4,

background:gradient,

color:"white",

height:"100%",

transition:"0.3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:8

}

}}

>


<CardContent>


<Box

sx={{

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>


<Box>

<Typography

variant="body2"

sx={{opacity:.8}}

>

{title}

</Typography>


<Typography

variant="h3"

fontWeight="bold"

>

{value}

</Typography>


</Box>


<Box

sx={{

fontSize:45

}}

>

{icon}

</Box>


</Box>


</CardContent>


</Card>


);


}


export default StatCard;