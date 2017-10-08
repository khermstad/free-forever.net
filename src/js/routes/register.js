const express = require("express");
const router = express.Router();
const user = require('../models/User.js')
const db = require("../db")

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
    let {email, displayedname, password} = req.body;
    
    isUnique(email).then(isUnique =>{
        if(isUnique){
            createUser(email, displayedname, password)
            res.render('login')
        }
        else{
            res.render('register')
        }
    })


})


module.exports = router;