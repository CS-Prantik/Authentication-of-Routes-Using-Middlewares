const express=require('express')
const app=express()
const bodyParser=require('body-parser')
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
require('./DB/conn')
app.use("/user",require('./Routes/Routes'))
const PORT=process.env.PORT ||4000
app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`)
})
