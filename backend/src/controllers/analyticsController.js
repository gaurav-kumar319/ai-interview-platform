const pool = require("../config/db");



// GET USER ANALYTICS

exports.getAnalytics = async (req, res) => {


  try {


    const userId = req.user.id;



    // TOTAL INTERVIEWS

    const totalQuery = await pool.query(

      `
      SELECT COUNT(*)

      FROM interviews

      WHERE user_id=$1

      `,

      [userId]

    );





    // SCORE HISTORY

    const scoreQuery = await pool.query(

      `
      SELECT 

        r.score,

        r.created_at


      FROM results r


      JOIN interviews i

      ON r.interview_id = i.id


      WHERE i.user_id=$1


      ORDER BY r.created_at ASC

      `,

      [userId]

    );





    const scores = scoreQuery.rows.map(

      item => Number(item.score)

    );





    // AVERAGE SCORE

    const averageScore = scores.length

      ?

      Math.round(

        scores.reduce(
          (a,b)=>a+b,
          0
        )
        /
        scores.length

      )

      :

      0;





    // BEST SCORE

    const bestScore = scores.length

      ?

      Math.max(...scores)

      :

      0;









    // VOICE ANALYTICS

    const voiceQuery = await pool.query(

      `
      SELECT


      AVG(a.speaking_time)
      AS average_speaking_time,


      AVG(a.filler_words)
      AS average_filler_words,


      COUNT(*)
      FILTER(
        WHERE a.confidence='Good'
      )
      AS good_confidence



      FROM answers a



      JOIN interviews i

      ON a.interview_id=i.id



      WHERE i.user_id=$1


      `,

      [userId]

    );







    res.json({


      totalInterviews:

      Number(
        totalQuery.rows[0].count
      ),



      averageScore,



      bestScore,



      scores:
      scoreQuery.rows,



      voice:

      {

        averageSpeakingTime:

        Math.round(
          voiceQuery.rows[0]
          .average_speaking_time || 0
        ),



        averageFillerWords:

        Math.round(
          voiceQuery.rows[0]
          .average_filler_words || 0
        ),



        goodConfidence:

        Number(
          voiceQuery.rows[0]
          .good_confidence || 0
        )


      }


    });



  }


  catch(error){


    console.log(error);



    res.status(500).json({

      message:"Analytics failed"

    });


  }


};