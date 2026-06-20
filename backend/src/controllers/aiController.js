const axios = require("axios");
const pool = require("../config/db");


// Generate AI Interview Questions

const generateQuestions = async (req, res) => {


  const {
    role,
    level,
    techstack
  } = req.body;



  try {


    // Validation

    if (!role || !level || !techstack) {

      return res.status(400).json({

        message: "Role, level and tech stack are required"

      });

    }



    const prompt = `

Generate 5 interview questions for an AI interview.


Role:
${role}


Experience Level:
${level}


Technology:
${techstack}


Return ONLY JSON format:


[
 {
  "question":"question here"
 }
]


Do not add explanations.

`;




    // OpenRouter API call

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",


      {

        model: "openai/gpt-3.5-turbo",


        messages: [

          {

            role: "user",

            content: prompt

          }

        ]

      },


      {

        headers: {

          Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,


          "Content-Type":
          "application/json"

        }

      }


    );





    const aiResponse =
      response.data
      ?.choices?.[0]
      ?.message
      ?.content;



    if(!aiResponse){


      return res.status(500).json({

        message:"AI response empty"

      });


    }





    // Convert AI response into array


    let questions=[];


    try{


      let cleanText =
      aiResponse
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



      const jsonData =
      JSON.parse(cleanText);



      if(Array.isArray(jsonData)){


        questions =
        jsonData.map(
          item=>item.question || item
        );


      }

      else if(jsonData.questions){


        questions =
        jsonData.questions.map(
          item=>item.question || item
        );


      }



    }

    catch(error){


      questions=[aiResponse];


    }





    // Save interview


    const interview = await pool.query(


      `

      INSERT INTO interviews
      (
        user_id,
        role,
        level,
        tech_stack
      )

      VALUES
      ($1,$2,$3,$4)

      RETURNING *

      `,


      [

        req.user.id,

        role,

        level,

        techstack

      ]


    );





    res.status(200).json({


      message:
      "Interview generated successfully",


      interview:
      interview.rows[0],


      questions


    });





  }

  catch(error){


    console.error(

      "AI ERROR:",

      error.response?.data ||
      error.message

    );



    res.status(500).json({

      message:
      "AI generation failed",

      error:
      error.response?.data ||
      error.message

    });


  }


};




module.exports = {

  generateQuestions

};