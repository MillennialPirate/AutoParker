require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const app = express();
app.use(express.json());

const Register = async(email, password, role) => {
    try
    {
        
        if(!(email && password && role))
        {
            return {
                status : 400, 
                message : "all inputs not provided"
            };
        }
        //check for old user
        const oldUser = await User.findOne({email});
        if(oldUser){
            return {
                status : 409, 
                message : "user already exists"
            };
        }
        //encrypt password
        var encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email : email, 
            password : encryptedPassword, 
            role: role
        });
        // generate token
        const token = jwt.sign(
            {user_id : user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn : "2h"
            }
        );
        //save the token 
        user.token = token;
        return {
            status : 200, 
            message : "Successfully Created Profile",
            user: user
        };
    }
    catch(err){
        console.log(err);
    }
}
const Login = async(email, password) => {
    try
    {
        if(!(email && password))
        {
            return {
                status : 400, 
                message : "all inputs not provided"
            };
        }
        //validation of the user if he/she exists in the user database
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password)))
        {
            //create token
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY, 
                {
                    expiresIn : "2h"
                }
            );
            user.token = token;
            
            return {
                status : 200, 
                message : "user logged in", 
                user: user
            };
        }
        return {
            status : 400, 
            message : "Invalid Credentials"
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {Register, Login};