const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ai_interview_db",
  password: "Gaurav@123",
  port: 5432,
});

module.exports = pool;