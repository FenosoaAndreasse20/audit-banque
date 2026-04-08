const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req,res)=>{

const sql = `
SELECT
SUM(type_action='INSERT') AS total_insert,
SUM(type_action='UPDATE') AS total_update,
SUM(type_action='DELETE') AS total_delete
FROM audit_retrait
`

db.query(sql,(err,result)=>{

if(err) return res.status(500).send(err)

res.json(result[0])

})

})

module.exports = router