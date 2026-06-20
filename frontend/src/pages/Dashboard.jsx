import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Chip,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";


import { useState } from "react";

import API from "../api/axios";

import StatCard from "../components/StatCard";



function Dashboard(){



const [formData,setFormData]=useState({

role:"",
level:"",
techstack:""

});
const navigate = useNavigate();


const [questions,setQuestions]=useState([]);

const [loading,setLoading]=useState(false);




const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};





const generateQuestions=async()=>{


try{


setLoading(true);


const res=await API.post(

"/ai/questions",

formData

);


setQuestions(res.data.questions);


navigate(
`/interview/${res.data.interview.id}`,
{
state:{
questions:res.data.questions
}
}
);


}

catch(error){


console.log(error);


alert("Failed to generate questions");


}

finally{

setLoading(false);

}


};





return(


<Box

sx={{

minHeight:"100vh",

background:"#020617",

color:"white",

p:3

}}

>



{/* Header */}


<Box

sx={{

mb:5

}}

>


<Typography

variant="h3"

fontWeight="bold"

>

Good Morning 👋

</Typography>



<Typography

sx={{

color:"#94a3b8",

mt:1

}}

>

Prepare yourself for your next AI powered interview

</Typography>


</Box>






{/* Stats */}


<Grid

container

spacing={3}

>



<Grid

item

xs={12}

md={4}

>


<StatCard

title="Total Interviews"

value="12"

icon={<AssignmentIcon/>}

gradient="linear-gradient(135deg,#2563eb,#1e40af)"

/>


</Grid>





<Grid

item

xs={12}

md={4}

>


<StatCard

title="Average Score"

value="8.5/10"

icon={<StarIcon/>}

gradient="linear-gradient(135deg,#7c3aed,#4c1d95)"

/>


</Grid>






<Grid

item

xs={12}

md={4}

>


<StatCard

title="Performance"

value="+20%"

icon={<TrendingUpIcon/>}

gradient="linear-gradient(135deg,#059669,#065f46)"

/>


</Grid>



</Grid>







{/* Generate Interview */}



<Card

sx={{

mt:5,

borderRadius:5,

background:"#0f172a",

color:"white"

}}

>


<CardContent

sx={{

p:4

}}

>



<Box

sx={{

display:"flex",

alignItems:"center",

gap:2,

mb:3

}}

>


<Avatar

sx={{

background:"#2563eb"

}}

>


<PsychologyIcon/>


</Avatar>



<Typography

variant="h5"

fontWeight="bold"

>

Create AI Interview

</Typography>


</Box>




<Grid

container

spacing={3}

>



<Grid

item

xs={12}

md={4}

>


<TextField


fullWidth


label="Role"


name="role"


value={formData.role}


onChange={handleChange}


sx={{

background:"white",

borderRadius:2

}}


/>


</Grid>







<Grid

item

xs={12}

md={4}

>


<TextField


select


fullWidth


label="Experience Level"


name="level"


value={formData.level}


onChange={handleChange}


sx={{

background:"white",

borderRadius:2

}}


>


<MenuItem value="Beginner">

Beginner

</MenuItem>


<MenuItem value="Intermediate">

Intermediate

</MenuItem>



<MenuItem value="Advanced">

Advanced

</MenuItem>



</TextField>


</Grid>








<Grid

item

xs={12}

md={4}

>


<TextField


fullWidth


label="Tech Stack"


name="techstack"


value={formData.techstack}


onChange={handleChange}


sx={{

background:"white",

borderRadius:2

}}


/>


</Grid>



</Grid>






<Button


variant="contained"


startIcon={<RocketLaunchIcon/>}


onClick={generateQuestions}


disabled={loading}


sx={{

mt:4,

px:5,

py:1.5,

borderRadius:3,

background:"#2563eb",

fontWeight:"bold",


"&:hover":{

background:"#1d4ed8"

}


}}



>


{

loading

?

"Generating..."

:

"Generate Interview"

}



</Button>





</CardContent>


</Card>








{/* Questions */}



{

questions.length>0 &&


<Card

sx={{

mt:5,

borderRadius:5,

background:"#0f172a",

color:"white"

}}

>


<CardContent>


<Typography

variant="h5"

fontWeight="bold"

>

Generated Questions

</Typography>




{

questions.map((q,index)=>(


<Box

key={index}

sx={{

mt:3,

p:2,

background:"#1e293b",

borderRadius:3

}}

>


<Chip

label={`Question ${index+1}`}

color="primary"

/>



<Typography

mt={2}

>

{q}

</Typography>



</Box>



))


}



</CardContent>


</Card>


}






{/* Recent Interviews */}



<Card

sx={{

mt:5,

borderRadius:5,

background:"#0f172a",

color:"white"

}}

>


<CardContent>


<Typography

variant="h5"

fontWeight="bold"

mb={3}

>

Recent Interviews

</Typography>



<Box

sx={{

display:"flex",

justifyContent:"space-between",

p:2,

background:"#1e293b",

borderRadius:3,

mb:2

}}

>


<Typography>

Frontend Developer

</Typography>


<Chip

label="8/10"

color="success"

/>


</Box>





<Box

sx={{

display:"flex",

justifyContent:"space-between",

p:2,

background:"#1e293b",

borderRadius:3

}}

>


<Typography>

Backend Developer

</Typography>


<Chip

label="9/10"

color="success"

/>


</Box>



</CardContent>


</Card>





</Box>


);


}



export default Dashboard;