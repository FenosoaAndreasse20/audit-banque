const mysql = require("mysql2");

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "banque_audit"
});

db.connect((err)=>{
if(err){
console.log("Erreur connexion DB");
}
else{
console.log("Connecté à MySQL");
}
});

module.exports = db;