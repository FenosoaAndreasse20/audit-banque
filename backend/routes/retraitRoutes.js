const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      r.num_retrait,
      r.num_compte,
      c.nomclient,
      c.solde AS solde_initial,
      r.montant,
      (
        SELECT c.solde - IFNULL(SUM(r2.montant),0)
        FROM retrait r2
        WHERE r2.num_compte = r.num_compte AND r2.num_retrait <= r.num_retrait
      ) AS solde_apres
    FROM retrait r
    JOIN client c ON r.num_compte = c.num_compte
    ORDER BY r.num_compte, r.num_retrait
  `;

  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

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
router.put("/:id", (req, res) => {
  const { montant } = req.body;

  // récupérer le retrait actuel
  db.query(
    "SELECT num_compte, montant FROM retrait WHERE num_retrait=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.send(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Retrait introuvable" });
      }

      const num_compte = result[0].num_compte;
      const ancienMontant = parseFloat(result[0].montant);
      const nouveauMontant = parseFloat(montant);

      // récupérer le solde actuel
      db.query(
        "SELECT solde FROM client WHERE num_compte=?",
        [num_compte],
        (err, clientResult) => {
          if (err) return res.send(err);

          const solde = parseFloat(clientResult[0].solde);

          // 🔥 vérification correcte
          const soldeDisponible = solde + ancienMontant;

          if (nouveauMontant > soldeDisponible) {
            return res.status(400).json({
              message: "Solde insuffisant pour modifier ce retrait"
            });
          }

          // update si OK
          db.query(
            "UPDATE retrait SET montant=? WHERE num_retrait=?",
            [nouveauMontant, req.params.id],
            (err, result) => {
              if (err) return res.send(err);
              res.json({ message: "Modification réussie" });
            }
          );
        }
      );
    }
  );
});

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