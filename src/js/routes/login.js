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
            if (count == 1) {
                return true;
            }
            return false;
        })
}

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    const {email, password} = req.body;

    isValidEmail(email).then(isValid => {
        if(isValid) {
            res.send("valid user")
        }
        else{
            res.send("invalid user")
        }
    }) 

   // var isPass = bcrypt.compareSync(userCredentials.password, results[0].password)
    
})

module.exports = router;