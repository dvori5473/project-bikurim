require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT || 1258
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/tasks",require("./routes/task"))
app.use("/api/articals",require("./routes/artical"))
app.use("/api/userHM",require("./routes/userHM"))

app.get("/",(req,res)=>{
    res.send("Home page")
})
mongoose.connection.once('open',()=>{
  console.log('connected to DB')
    app.listen(PORT,()=>
    console.log(`server runing on port ${PORT}`))
})
mongoose.connection.on('error',err=>{
    console.log(err)
})
