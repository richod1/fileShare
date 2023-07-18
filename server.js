const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const port=3000
const morgan=require("morgan")
require("dotenv").config();
const fileUpload=require("express-fileupload")
const fileRoute=require("./routes/fileRoute")


// middleware
app,use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(fileUpload())
app.use(express.static('uploads'))

// database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log("database connected successfully")
}).catch((err)=>{
    console.log("Failed to connect to database" ,err)
})

// test endpont
app.get("/",(req,res)=>{
    res.status(200).send({msg:"file uploads api"})
})

// route endpoint
app.use('/api',fileRoute)


// server start
app.listen(port,(err)=>{
    if(err) throw new Error("server asleep....")
    console.log(`server is up on port ${port}`)
})