import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress
} from "@mui/material";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


import {
  useEffect,
  useState
} from "react";


import API from "../api/axios";





function Analytics(){



const [analytics,setAnalytics] = useState(null);





const fetchAnalytics = async()=>{


try{


const res = await API.get("/analytics");


setAnalytics(res.data);


}


catch(error){


console.log(error);


}


};





useEffect(()=>{


fetchAnalytics();


},[]);






if(!analytics){


return (

<Box sx={{p:5}}>


<Typography>

Loading analytics...

</Typography>


</Box>

);


}







return(


<Container sx={{mt:5}}>




<Typography

variant="h4"

fontWeight="bold"

mb={4}

>

Analytics Dashboard 📊

</Typography>






<Grid container spacing={3}>


{/* Total Interviews */}


<Grid item xs={12} md={4}>


<Card

sx={{

borderRadius:4,

boxShadow:3

}}

>


<CardContent>


<Typography color="text.secondary">

Total Interviews

</Typography>



<Typography

variant="h3"

fontWeight="bold"

>

{analytics.totalInterviews}

</Typography>



</CardContent>


</Card>


</Grid>








{/* Average Score */}


<Grid item xs={12} md={4}>


<Card

sx={{

borderRadius:4,

boxShadow:3

}}

>


<CardContent>


<Typography color="text.secondary">

Average Score

</Typography>



<Typography

variant="h3"

fontWeight="bold"

>

{analytics.averageScore}/10

</Typography>



</CardContent>


</Card>


</Grid>








{/* Best Score */}


<Grid item xs={12} md={4}>


<Card

sx={{

borderRadius:4,

boxShadow:3

}}

>


<CardContent>


<Typography color="text.secondary">

Best Score

</Typography>



<Typography

variant="h3"

fontWeight="bold"

>

{analytics.bestScore}/10

</Typography>



</CardContent>


</Card>


</Grid>



</Grid>









{/* Performance Chart */}



<Card

sx={{

mt:5,

borderRadius:4,

boxShadow:3

}}

>


<CardContent>



<Typography

variant="h5"

fontWeight="bold"

mb={3}

>

Performance Trend

</Typography>





<Box

sx={{

height:350

}}

>



<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={analytics.scores}

>


<CartesianGrid />


<XAxis

dataKey="created_at"

/>


<YAxis

domain={[0,10]}

/>


<Tooltip />



<Line

type="monotone"

dataKey="score"

strokeWidth={3}

/>



</LineChart>



</ResponsiveContainer>



</Box>


</CardContent>


</Card>









{/* Voice Analytics */}



<Card

sx={{

mt:5,

borderRadius:4,

boxShadow:3

}}

>


<CardContent>



<Typography

variant="h5"

fontWeight="bold"

mb={3}

>

Voice Performance 🎤

</Typography>





<Grid container spacing={3}>





<Grid item xs={12} md={4}>


<Typography>

Speaking Time

</Typography>


<Typography

variant="h4"

fontWeight="bold"

>

{

analytics.voice?.averageSpeakingTime || 0

}

s

</Typography>



<LinearProgress

variant="determinate"

value={

Math.min(

analytics.voice?.averageSpeakingTime || 0,

100

)

}


/>


</Grid>







<Grid item xs={12} md={4}>


<Typography>

Filler Words

</Typography>


<Typography

variant="h4"

fontWeight="bold"

>

{

analytics.voice?.averageFillerWords || 0

}

</Typography>


</Grid>







<Grid item xs={12} md={4}>


<Typography>

Confidence

</Typography>


<Typography

variant="h4"

fontWeight="bold"

>

{

analytics.voice?.goodConfidence || 0

}

</Typography>


</Grid>





</Grid>




</CardContent>


</Card>







</Container>


);


}



export default Analytics;