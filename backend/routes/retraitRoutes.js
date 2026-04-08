const express = require("express")
const router = express.Router()
const db = require("../db")

// afficher retraits
router.get("/",(req,res)=>{
db.query("SELECT * FROM retrait",(err,result)=>{
if(err) res.send(err)
else res.json(result)
})
})

// ajouter retrait
router.post("/", (req, res) => {

const { num_cheque, num_compte, montant } = req.body;

const montantRetrait = parseFloat(montant);

db.query(
"SELECT solde FROM client WHERE num_compte=?",
[num_compte],
(err, result) => {

if (err) return res.send(err);

if (result.length === 0) {
return res.status(404).json({ message: "Client introuvable" });
}

const solde = parseFloat(result[0].solde);

// vérification du solde
if (montantRetrait > solde) {
return res.status(400).json({
message: "Solde insuffisant pour effectuer ce retrait"
});
}

// insertion si OK
db.query(
"INSERT INTO retrait (num_cheque,num_compte,montant) VALUES (?,?,?)",
[num_cheque, num_compte, montantRetrait],
(err, result) => {
if (err) return res.status(500).send(err)

res.json({
message:"Retrait effectué avec succès",
data:result
})

}
)

})

})

// modifier retrait
router.put("/:id",(req,res)=>{
const {montant} = req.body

db.query(
"UPDATE retrait SET montant=? WHERE num_retrait=?",
[montant,req.params.id],
(err,result)=>{
if(err) res.send(err)
else res.json(result)
}
)
})

// supprimer retrait
router.delete("/:id",(req,res)=>{
db.query(
"DELETE FROM retrait WHERE num_retrait=?",
[req.params.id],
(err,result)=>{
if(err) res.send(err)
else res.json(result)
}
)
})

module.exports = router