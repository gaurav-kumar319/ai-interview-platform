const express = require("express");
const cors = require("cors");
require("dotenv").config();

const initDB = require("./config/initDB");


const app = express();


app.use(cors());

app.use(express.json());



// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


app.use(
  "/api/user",
  require("./routes/userRoutes")
);


app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

app.use(
"/api/interviews",
require("./routes/interviewRoutes")
);

app.use(
"/api/analytics",
require("./routes/analyticsRoutes")
);

app.use(
"/api/result",
require("./routes/resultRoutes")
);



// Database

initDB();



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(`Server running on port ${PORT}`);

});