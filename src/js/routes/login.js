const express = require("express");
const router = express.Router();
const user = require('../models/User.js')
const db = require("../db")
const bcrypt = require('bcrypt-nodejs')
const salt = bcrypt.genSaltSync(10);

const User = db.define('user', user.schema, {
    timestamps: false
})

const isValidEmail = (email) => {
    return User.count({
            where: {
                email: email
            }
        })
        .then(count => {
            if (count === 1) {
                return true;
            }
            return false;
        })
}

const isValidPassword = (email, password) => {
    return User.findOne({
        where: {
            email: email
        }
    })
    .then(user =>{
        const stored_password = user.dataValues.password
        const isPassword = bcrypt.compareSync(password, stored_password)
        return isPassword;
    })
    return false;
}

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    const {email, password} = req.body;

    isValidEmail(email).then(isValid => {
        if(isValid) {
            isValidPassword(email, password).then(isValid =>{
                if (isValid){
                   return res.send('valid user and password')
                }
                else{
                    return res.send('valid user, invalid password')
                }
            })
        }
        else{
            return res.send("invalid user")
        }
    }) 
    
})

module.exports = router;