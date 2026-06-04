const axios = require("axios");
const pool = require("../config/db");

// Generate Interview Questions
const generateQuestions = async (req, res) => {
  const { role, level, techstack } = req.body;

  try {
    const prompt = `
Generate 5 interview questions for:
Role: ${role}
Level: ${level}
Tech Stack: ${techstack}

Return ONLY a valid JSON array like:
[
  { "question": "..." }
]

No explanation.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;

    let parsed;

    try {
      let jsonData = JSON.parse(text);

      if (typeof jsonData === "string") {
        jsonData = JSON.parse(jsonData);
      }

      if (Array.isArray(jsonData)) {
        parsed = jsonData.map((q) => q.question || q);
      } else if (jsonData.questions) {
        parsed = jsonData.questions.map((q) => q.question || q);
      } else {
        parsed = [text];
      }
    } catch (err) {
      parsed = [text];
    }

    // 🔥 SAVE INTERVIEW IN DATABASE
    const newInterview = await pool.query(
      `INSERT INTO interviews (user_id, role, level, tech_stack)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, role, level, techstack]
    );

    res.json({
      interview: newInterview.rows[0],
      questions: parsed,
    });

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  generateQuestions,
};