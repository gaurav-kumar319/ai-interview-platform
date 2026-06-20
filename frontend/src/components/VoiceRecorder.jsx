import {
  useState,
  useRef,
  useEffect
} from "react";


import {
  Button,
  Box,
  Typography
} from "@mui/material";





function VoiceRecorder({
  setAnswer,
  setVoiceData
}) {



  const [listening,setListening] = useState(false);


  const [time,setTime] = useState(0);


  const [filler,setFiller] = useState(0);



  const recognitionRef = useRef(null);


  const timerRef = useRef(null);


  const secondsRef = useRef(0);









  const startListening = ()=>{



    const SpeechRecognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;





    if(!SpeechRecognition){


      alert(
        "Speech recognition is not supported in this browser"
      );


      return;


    }





    const recognition = new SpeechRecognition();




    recognition.lang="en-US";


    recognition.continuous=true;


    recognition.interimResults=false;





    recognitionRef.current = recognition;






    recognition.start();



    setListening(true);



    setTime(0);


    secondsRef.current=0;







    timerRef.current = setInterval(()=>{


      secondsRef.current +=1;


      setTime(
        secondsRef.current
      );


    },1000);









    recognition.onresult=(event)=>{



      const transcript =

      event.results

      [event.results.length-1]

      [0]

      .transcript;






      // append answer

      setAnswer(prev=>{


        if(prev){

          return prev+" "+transcript;

        }


        return transcript;


      });









      // filler word detection


      const words =

      transcript

      .toLowerCase()

      .split(" ");





      const fillerWords = [

        "um",

        "uh",

        "like",

        "actually",

        "basically",

        "you know"

      ];





      const count = words.filter(

        word =>

        fillerWords.includes(word)

      ).length;






      setFiller(count);





      if(setVoiceData){



        setVoiceData({


          speakingTime:

          secondsRef.current,



          fillerWords:

          count,



          confidence:


          count < 3

          ?

          "Good"

          :

          "Needs Improvement"



        });



      }




    };










    recognition.onerror=(error)=>{


      console.log(
        "Speech error:",
        error
      );


      stopListening();


    };










    recognition.onend=()=>{


      clearInterval(
        timerRef.current
      );


      setListening(false);


    };




  };









  const stopListening=()=>{



    if(recognitionRef.current){


      recognitionRef.current.stop();


    }



    clearInterval(
      timerRef.current
    );



    setListening(false);



  };









  useEffect(()=>{


    return ()=>{


      clearInterval(
        timerRef.current
      );


      if(recognitionRef.current){

        recognitionRef.current.stop();

      }


    };


  },[]);









  return(



    <Box>



      <Button


        variant="contained"


        color={

          listening

          ?

          "error"

          :

          "primary"

        }



        onClick={

          listening

          ?

          stopListening

          :

          startListening

        }



      >



      {


        listening

        ?

        "🔴 Stop Recording"

        :

        "🎤 Start Recording"


      }



      </Button>










      {


        listening &&



        <Typography

          sx={{mt:2}}

        >


          Recording:

          {time}

          seconds


        </Typography>



      }









      {


        !listening && time>0 &&



        <Box sx={{mt:2}}>



          <Typography>


          Speaking Duration:

          {time}

          seconds


          </Typography>





          <Typography>


          Filler Words:

          {filler}


          </Typography>





          <Typography>


          Confidence:


          {

            filler < 3

            ?

            "Good 👍"

            :

            "Needs Improvement ⚠️"


          }



          </Typography>



        </Box>



      }



    </Box>



  );



}



export default VoiceRecorder;