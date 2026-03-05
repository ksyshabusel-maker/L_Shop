import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("L_Shop API running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})