// const http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log("server created");
//     res.end("hello")
// });

// server.listen(5000,"localhost",()=>{
//     console.log("server is running on 5000")
// })

const express = require("express");
const app = express()
const PORT = 5000;
const cors = require("cors")
const data = require('./data.js')

app.use(cors())
app.get('/',(req,res)=>{
    res.json(data)
})

app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})