const express = require("express")
const cors = require("cors")

const retraitRoutes = require("./routes/retraitRoutes")
const auditRoutes = require("./routes/auditRoutes")
const statsRoutes = require("./routes/statsRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/retraits",retraitRoutes)
app.use("/audit",auditRoutes)
app.use("/stats",statsRoutes)

app.listen(5000,()=>{
console.log("Serveur démarré sur port 5000")
})