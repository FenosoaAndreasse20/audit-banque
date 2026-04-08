const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM client", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

module.exports = router;