require("dotenv").config()
const path=require("path")
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 1258
const app = express()
connectDB().then(() => {
    console.log('connected to DB')
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/user", require("./routes/user"))
app.use("/api/product", require("./routes/product"))
app.use("/api/order", require("./routes/order"))


app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/uploads/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/uploads', express.static(__dirname + '/public/uploads'));


app.get("/", (req, res) => {
    res.send("Home page")
})

mongoose.connection.once('open', () => {
    app.listen(PORT, () =>
        console.log(`server runing on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})
