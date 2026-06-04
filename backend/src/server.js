require("dotenv").config();
const app = require("./app");
const initDB = require("./models/initDB");

const PORT = process.env.PORT || 5000;

// Initialize DB
initDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});