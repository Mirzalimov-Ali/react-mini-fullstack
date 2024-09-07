const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const router = require("./router")
const cors = require('cors');


// .env setting
dotenv.config()

// Database setting
connectDB()

// server start
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());

// Routes

app.use('/v1/auth', router)




const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})