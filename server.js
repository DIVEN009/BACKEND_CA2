const express = require('express')
const schema = require('./schema.js')
const app = express()
PORT = 3000

app.get('/',(res,req)=>{
    res.send('HELLO')
})

app.post('/user',(res,req)=>{
    const {userName,Email,Password,DOB} = req.body;
    if(!userName){
        res.status(400).json("Username cannot be empty")
    }
    else if(!Email){
        res.status(400).json("Email required")
    }
    else if(!Password){
        res.status(400).json("Password requied")
    }
})

const {userName,Email,Password,DOB} = req.body;
const userdata = Schema.create(user)
res.status(200).json(user);



app.listen(PORT,()=>{
    console.log(`server is running on the port ${port}`)
})