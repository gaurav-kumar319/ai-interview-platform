import {
Container,
Card,
CardContent,
Typography,
Box,
Chip
}
from "@mui/material";


import {
useEffect,
useState
}
from "react";


import {
useParams
}
from "react-router-dom";


import API from "../api/axios";




function Report(){


const {id}=useParams();


const [data,setData]=useState(null);





const fetchReport=async()=>{


try{


const res =
await API.get(
`/result/${id}`
);


setData(res.data);


}

catch(error){

console.log(error);

}


};




useEffect(()=>{

fetchReport();

},[]);







if(!data){

return(

<Typography sx={{p:5}}>

Loading Report...

</Typography>

)

}







return(


<Container sx={{mt:5}}>



<Typography

variant="h4"

fontWeight="bold"

>

AI Interview Report 🎯

</Typography>







<Card

sx={{

mt:4,

borderRadius:4

}}

>


<CardContent>


<Typography

variant="h5"

>

{data.result.role}

</Typography>



<Typography>

Level:
{data.result.level}

</Typography>



<Typography

sx={{mt:3}}

variant="h3"

fontWeight="bold"

>

{data.result.score}/10

</Typography>



<Chip

label="AI Evaluated"

color="success"

/>




</CardContent>


</Card>









<Card

sx={{mt:3}}

>


<CardContent>


<Typography

variant="h5"

fontWeight="bold"

>

AI Feedback

</Typography>


<Typography

sx={{mt:2}}

>

{data.result.feedback}

</Typography>


</CardContent>


</Card>









<Card

sx={{mt:3}}

>


<CardContent>


<Typography

variant="h5"

fontWeight="bold"

>

Answer Analysis

</Typography>





{
data.answers.map(
(item,index)=>(


<Box

key={index}

sx={{

mt:3,

p:2,

background:"#f1f5f9",

borderRadius:3

}}

>


<Typography

fontWeight="bold"

>

Question {index+1}

</Typography>



<Typography>

{item.question}

</Typography>



<Typography

sx={{mt:2}}

>

Your Answer:

{item.answer}

</Typography>




<Typography>

Speaking Time:
{item.speaking_time}s

</Typography>




<Typography>

Filler Words:
{item.filler_words}

</Typography>




<Typography>

Confidence:
{item.confidence}

</Typography>



</Box>


)

)

}



</CardContent>


</Card>





</Container>


);


}



export default Report;