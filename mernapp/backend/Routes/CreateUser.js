const express =  require('express')
const router = express.Router()
const User = require('../models/Users')

router.post("/createuser",async(req,res)=>{
    try {
        await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email
        })
    res.json(true);    
    } catch (error) {
        console.log(error)
        res.json(false); 
    }
})
module.exports= router;