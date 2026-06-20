const axios = require("axios");
const pool = require("../config/db");



// AI Evaluate Interview

exports.evaluateInterview = async (req, res) => {


  try {


    const {
      interviewId
    } = req.body;



    if (!interviewId) {


      return res.status(400).json({

        message: "Interview ID required"

      });

    }





    // Get interview answers

    const answers = await pool.query(

      `
      SELECT 
      question,
      answer

      FROM answers

      WHERE interview_id=$1

      `,
      [
        interviewId
      ]

    );





    if (answers.rows.length === 0) {


      return res.status(400).json({

        message: "No answers found for this interview"

      });


    }







    let prompt = `


You are an expert technical interviewer.


Analyze the candidate's interview answers.


Give:

1. Overall score out of 10
2. Detailed feedback
3. Strengths
4. Weaknesses
5. Improvement suggestions


Return ONLY valid JSON.


Format:


{
 "score":8,
 "feedback":"Candidate explanation is good...",
 "strengths":[
   "Good React knowledge"
 ],
 "weaknesses":[
   "Needs better examples"
 ],
 "suggestions":[
   "Practice system design"
 ]
}


Interview Answers:


`;








    answers.rows.forEach((item,index)=>{


      prompt += `


Question ${index+1}:

${item.question}



Candidate Answer:

${item.answer}



`;

    });









    // OpenRouter AI Request


    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {


        model:
        "openai/gpt-3.5-turbo",



        messages:[


          {

            role:"user",

            content:prompt

          }


        ]


      },



      {

        headers:{


          Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,



          "Content-Type":
          "application/json"


        }


      }


    );








    let text =
    response.data
    .choices[0]
    .message
    .content;







    let evaluation;



    try{


      text =
      text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



      evaluation =
      JSON.parse(text);



    }

    catch(error){


      console.log(
        "JSON parsing failed"
      );



      evaluation={


        score:5,


        feedback:text,


        strengths:[],


        weaknesses:[],


        suggestions:[]


      };


    }









    // Validate score


    if(
      !evaluation.score ||
      evaluation.score > 10
    ){

      evaluation.score=5;

    }









    // Remove old result if exists


    await pool.query(

      `

      DELETE FROM results

      WHERE interview_id=$1

      `,

      [
        interviewId
      ]

    );









    // Save new result


    const result = await pool.query(

      `

      INSERT INTO results

      (

      interview_id,

      score,

      feedback

      )


      VALUES

      ($1,$2,$3)


      RETURNING *


      `,


      [

        interviewId,

        evaluation.score,

        JSON.stringify({

          feedback:
          evaluation.feedback,


          strengths:
          evaluation.strengths,


          weaknesses:
          evaluation.weaknesses,


          suggestions:
          evaluation.suggestions


        })

      ]


    );










    res.json({


      message:
      "Evaluation completed successfully",



      result:
      result.rows[0]


    });





  }



  catch(error){


    console.log(

      error.response?.data ||
      error.message

    );



    res.status(500).json({


      message:
      "AI evaluation failed"


    });



  }


};