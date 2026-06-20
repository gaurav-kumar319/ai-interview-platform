import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  CircularProgress
} from "@mui/material";


import {
  useState
} from "react";


import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";


import API from "../api/axios";


import VoiceRecorder from "../components/VoiceRecorder";





function Interview(){



  const { id } = useParams();


  const location = useLocation();


  const navigate = useNavigate();




  const questions =
    location.state?.questions || [];




  const [current,setCurrent] = useState(0);



  const [answer,setAnswer] = useState("");



  const [answers,setAnswers] = useState({});



  const [loading,setLoading] = useState(false);




  const [voiceData,setVoiceData] = useState({

    speakingTime:0,

    fillerWords:0,

    confidence:"Unknown"

  });









  const saveCurrentAnswer = ()=>{


    setAnswers(prev=>({

      ...prev,


      [current]:{

        answer,


        speakingTime:
        voiceData.speakingTime,


        fillerWords:
        voiceData.fillerWords,


        confidence:
        voiceData.confidence

      }


    }));


  };









  const nextQuestion = ()=>{


    saveCurrentAnswer();



    if(current < questions.length-1){



      const next=current+1;



      setCurrent(next);



      setAnswer(

        answers[next]?.answer || ""

      );



    }


  };











  const previousQuestion = ()=>{


    saveCurrentAnswer();



    if(current>0){



      const previous=current-1;



      setCurrent(previous);



      setAnswer(

        answers[previous]?.answer || ""

      );



    }


  };









  const speakQuestion = ()=>{


    const speech =
    new SpeechSynthesisUtterance(
      questions[current]
    );


    speech.lang="en-US";


    window.speechSynthesis.speak(
      speech
    );


  };









  const submitInterview = async()=>{


    setLoading(true);




    saveCurrentAnswer();





    const finalAnswers = questions.map(
      (question,index)=>{


        const data =
        answers[index] || {};



        return {


          question,



          answer:

          index===current

          ?

          answer

          :

          data.answer || "",




          speakingTime:

          data.speakingTime ||

          voiceData.speakingTime,




          fillerWords:

          data.fillerWords ||

          voiceData.fillerWords,




          confidence:

          data.confidence ||

          voiceData.confidence



        };


      }

    );








    try{



      await API.post(

        "/interview/answers",

        {

          interviewId:id,

          answers:finalAnswers

        }

      );







      await API.post(

        "/result/evaluate",

        {

          interviewId:id

        }

      );






      alert(
        "Interview evaluated successfully"
      );



      navigate(`/report/${id}`);



    }


    catch(error){


      console.log(error);


      alert(
        "Submission failed"
      );


    }


    finally{


      setLoading(false);


    }



  };









  if(!questions.length){


    return(

      <Box sx={{p:5}}>


        <Typography>

          No questions found. Generate interview again.

        </Typography>


      </Box>

    );


  }









  return(



    <Box


      sx={{


        minHeight:"100vh",


        background:"#020617",


        p:5


      }}


    >







      <Card


        sx={{


          maxWidth:900,


          mx:"auto",


          background:"#0f172a",


          color:"white",


          borderRadius:4


        }}


      >





        <CardContent sx={{p:5}}>





          <Typography


            variant="h4"


            fontWeight="bold"


          >


            AI Voice Interview 🎤


          </Typography>







          <Typography


            sx={{mt:1,color:"#94a3b8"}}


          >


            Question {current+1} of {questions.length}


          </Typography>









          <LinearProgress


            variant="determinate"


            value={

              ((current+1)/questions.length)*100

            }


            sx={{


              mt:2,


              height:8,


              borderRadius:5


            }}


          />











          <Button


            sx={{mt:3}}


            variant="outlined"


            onClick={speakQuestion}


          >


            🔊 Listen Question


          </Button>









          <Card


            sx={{


              mt:3,


              background:"#1e293b",


              color:"white"


            }}


          >



            <CardContent>


              <Typography variant="h6">


                {questions[current]}


              </Typography>



            </CardContent>



          </Card>









          <Box sx={{mt:4}}>




            <Typography


              fontWeight="bold"


              mb={1}


            >


              Your Answer


            </Typography>







            <textarea


              value={answer}



              onChange={(e)=>

                setAnswer(e.target.value)

              }



              placeholder="Speak or type your answer..."



              style={{



                width:"100%",



                height:"180px",



                padding:"15px",



                fontSize:"16px",



                borderRadius:"10px",



                resize:"none"



              }}



            />









            <Box sx={{mt:2}}>



              <VoiceRecorder


                setAnswer={setAnswer}



                setVoiceData={setVoiceData}


              />



            </Box>






          </Box>









          <Box


            sx={{


              display:"flex",


              justifyContent:"space-between",


              mt:4


            }}


          >





            <Button


              variant="outlined"


              disabled={current===0}


              onClick={previousQuestion}


            >


              Previous


            </Button>









            {

            current===questions.length-1

            ?


            <Button


              variant="contained"


              onClick={submitInterview}


              disabled={loading}


            >


            {


              loading

              ?

              <CircularProgress size={25}/>

              :

              "Submit Interview"


            }


            </Button>



            :



            <Button


              variant="contained"


              onClick={nextQuestion}


            >


              Next


            </Button>



            }





          </Box>







        </CardContent>





      </Card>






    </Box>



  );


}



export default Interview;