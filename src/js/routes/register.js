const express = require("express");
const router = express.Router();
const user = require('../models/User.js')
const db = require("../db")
const bcrypt = require('bcrypt-nodejs')
const salt = bcrypt.genSaltSync(10);

const User = db.define('user', user.schema, {timestamps: false})

const createUser = (email, displayedname, password) => {
    User.create({email: email, displayedname: displayedname, password: password})
}

const isUnique = (email) => {
    return User.count({where: {email: email}})
    .then(count => {
        if(count != 0){
            return false;
        }
        return true;
    })
}

router.get('/', (req, res) => res.render("register"))

router.post('/', (req, res) => {
    const {email, displayedname, password, password2} = req.body;

    // if passwords aren't equal, re-direct to register page again (with message)
    if (password != password2){
        return res.render('register', {register_error_message: "Passwords are not equal"})
    }

    let hashedPassword = bcrypt.hashSync(password, salt)

    isUnique(email).then(isUnique =>{
        if(isUnique){
            createUser(email, 
                displayedname,
                hashedPassword)


            res.render('login')
        }
        else{
            res.render('register', {register_error_message: "Email already exists"})
        }
    })
})


module.exports = router;