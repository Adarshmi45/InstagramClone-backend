const express=require('express');
const app=express();
const port = 5000;
const mongoose=require("mongoose");
const mongourl = require("./keys");
const cors = require("cors");


app.use(cors())
require('./models/model')
app.use(express.json())
app.use(require("./routes/auth"))
mongoose.connect(mongourl)

mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongoose")
})

mongoose.connection.on("error",()=>{
    console.log("not connected to mongoose")
})

app.listen(port,()=>{
    console.log("Server is running on port "+port)
})









// const http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log("server created");
//     res.end("hello")
// });

// server.listen(5000,"localhost",()=>{
//     console.log("server is running on 5000")
// })

// const express = require("express");
// const app = express()
// const PORT = 5000;
// const cors = require("cors")
// const data = require('./data.js')

// app.use(cors())
// app.get('/',(req,res)=>{
//     res.json(data)
// })

// app.listen(PORT,()=>{
//     console.log("server is running on " + PORT)
// })


