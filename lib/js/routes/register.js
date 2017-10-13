"use strict";

var express = require("express");
var router = express.Router();
var user = require('../models/User.js');
var db = require("../db");
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var User = db.define('user', user.schema, {
    timestamps: false
});

var createUser = function createUser(email, displayedname, password) {
    User.create({
        email: email,
        displayedname: displayedname,
        password: password
    });
};

var isUnique = function isUnique(email) {
    return User.count({
        where: {
            email: email
        }
    }).then(function (count) {
        if (count != 0) {
            return false;
        }
        return true;
    });
};

router.get('/', function (req, res) {
    return res.render("register", { req: req });
});

router.post('/', function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        displayedname = _req$body.displayedname,
        password = _req$body.password,
        password2 = _req$body.password2;

    // if passwords aren't equal, re-direct to register page again (with message)

    if (password != password2) {
        return res.render('register', {
            register_error_message: "Passwords are not equal."
        });
    }

    var hashedPassword = bcrypt.hashSync(password, salt);

    isUnique(email).then(function (isUnique) {
        if (isUnique) {
            createUser(email, displayedname, hashedPassword);

            res.render('login', {
                success_register_message: "Registration Succesful! You can now log-in."
            });
        } else {
            res.render('register', {
                register_error_message: "Email already exists."
            });
        }
    });
});

module.exports = router;