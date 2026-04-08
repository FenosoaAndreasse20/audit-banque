const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/",(req,res)=>{
db.query("SELECT * FROM audit_retrait",(err,result)=>{
if(err) res.send(err)
else res.json(result)
})
})

module.exports = router