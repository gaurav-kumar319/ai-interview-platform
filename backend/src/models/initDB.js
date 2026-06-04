const pool = require("../config/db");

const initDB = async () => {
  try {
    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // INTERVIEWS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS interviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role VARCHAR(100),
        level VARCHAR(50),
        tech_stack TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // RESULTS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
        score INTEGER,
        feedback TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database tables created successfully ✅");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

module.exports = initDB;