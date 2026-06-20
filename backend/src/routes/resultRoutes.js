const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
    evaluateInterview
}
=
require("../controllers/resultController");





router.post(

"/evaluate",

authMiddleware,

evaluateInterview

);





module.exports = router;