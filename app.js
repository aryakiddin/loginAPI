require('dotenv').config()
require('./config/database').connect();
const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('./model/user')
const bcrypt = require('bcrypt')
const auth = require('./middleware/auth')
const app = express();
app.use(express.json());


//register user
app.post('/register', async (req,res)=>{
    try {
        //get user input
        const {user_id,user_name,user_email,user_pass}= req.body

        //validate user input
        if(!(user_email && user_pass && user_id,user_name)){
            res.status(400).send('All inputs are required');
        }

        //check if user already exists
        //validate if user already exists in database
        const oldUser = await User.findOne({user_email});
        if(oldUser){
            return res.status(409).send('User already exists. Please login')
        }

        //encrypt user password
        encryptedPassword = await bcrypt.hash(user_pass,10)

        //create user in database
        const user = await User.create({
            user_id,
            user_name,
            user_email:user_email.toLowerCase(),
            user_pass:encryptedPassword,
        });

        //create token
        const token = jwt.sign(
            {
                user_id:user._id, user_email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            }
        )
        //save user token
        user.token = token

        //return new user
        res.status(201).json(user);
        
    } catch (error) {
        console.log(error)
    }
})

app.post('/login',  async (req,res)=>{
    try {
        //get user input
        const {user_email,user_pass}=req.body
        //validate user input
        if(!(user_email && user_pass)){
            res.status(400).send('All input is required')
        }
        //validate if user exists in database
        const user = await User.findOne({user_email});
        if(user && (await bcrypt.compare(user_pass,user.user_pass))){
            //create token
            const token = jwt.sign( 
                {user_id:user._id,user_email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h"
                }
            );
            //save token
            user.token = token;

            //user
            res.status(200).json(user)
        }
        res.status(400).send('Invalid credentials')
    } catch (error) {
        console.log(error)
    }
})

app.post('/welcome', auth, (req,res)=>{
    res.status(200).send('Welcome!')
})

module.exports = app