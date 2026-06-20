const pool = require("../config/db");


exports.getProfile = async(req,res)=>{

try{

const userId = req.user.id;


const result = await pool.query(
`
SELECT id,name,email,created_at
FROM users
WHERE id=$1
`,
[userId]
);


if(result.rows.length===0){

return res.status(404).json({
message:"User not found"
});

}


res.json(result.rows[0]);


}
catch(error){

console.log(error);

res.status(500).json({
message:"Failed to fetch profile"
});

}

};