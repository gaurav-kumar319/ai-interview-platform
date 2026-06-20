const pool = require("../config/db");



// GET INTERVIEW HISTORY

exports.getInterviewHistory = async (req, res) => {

  try {

    const userId = req.user.id;


    const result = await pool.query(

      `
      SELECT 
        i.id,
        i.role,
        i.level,
        i.tech_stack,
        i.created_at,
        r.score,
        r.feedback

      FROM interviews i

      LEFT JOIN results r

      ON i.id = r.interview_id


      WHERE i.user_id=$1


      ORDER BY i.created_at DESC

      `,

      [userId]

    );


    res.json(result.rows);


  }

  catch(error){

    console.log(error);


    res.status(500).json({

      message:"Failed to fetch interview history"

    });

  }

};









// SAVE INTERVIEW ANSWERS

exports.saveAnswers = async (req,res)=>{


  try{


    const {

      interviewId,

      answers

    } = req.body;




    if(!interviewId || !answers){

      return res.status(400).json({

        message:"Interview ID and answers required"

      });

    }






    for(const item of answers){



      await pool.query(

        `

        INSERT INTO answers

        (

          interview_id,

          question,

          answer,

          speaking_time,

          filler_words,

          confidence

        )


        VALUES

        (

          $1,

          $2,

          $3,

          $4,

          $5,

          $6

        )


        `,


        [

          interviewId,

          item.question,

          item.answer,

          item.speakingTime || 0,

          item.fillerWords || 0,

          item.confidence || "Unknown"

        ]


      );


    }






    res.json({

      message:"Answers saved successfully"

    });




  }


  catch(error){


    console.log(error);


    res.status(500).json({

      message:"Failed to save answers"

    });


  }


};