require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const app = express();
app.use(express.json());

const Register = async(email, password, role, reg) => {
    try
    {
        
        if(!(email && password && role && reg))
        {
            return {
                status : 400, 
                message : "all inputs not provided"
            };
        }
        //check for old user
        const oldUser = await Customer.findOne({email});
        const oldVehicle = await Customer.findOne({reg});
        if(oldUser || oldVehicle){
            return {
                status : 409, 
                message : "user already exists"
            };
        }
        //encrypt password
        var encryptedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({
            email : email, 
            RegNo : reg,
            password : encryptedPassword, 
            role: role
        });
        // generate token
        const token = jwt.sign(
            {user_id : customer._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn : "2h"
            }
        );
        //save the token 
        customer.token = token;
        return {
            status : 200, 
            message : "Successfully Created Profile",
            customer : customer
        };
    }
    catch(err){
        console.log(err);
    }
}
const Login = async(reg, password) => {
    try
    {
        if(!(reg && password))
        {
            return {
                status : 400, 
                message : "all inputs not provided"
            };
        }
        //validation of the user if he/she exists in the user database
        const customer = await Customer.findOne({RegNo: reg});
        if(customer && (await bcrypt.compare(password, customer.password)))
        {
            //create token
            const token = jwt.sign(
                {user_id: customer._id, email : customer.email},
                process.env.TOKEN_KEY, 
                {
                    expiresIn : "2h"
                }
            );
            customer.token = token;
            
            return {
                status : 200, 
                message : "user logged in", 
                customer : customer
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