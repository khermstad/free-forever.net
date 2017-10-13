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

var isValidEmail = function isValidEmail(email) {
    return User.count({
        where: {
            email: email
        }
    }).then(function (count) {
        if (count === 1) {
            return true;
        }
        return false;
    });
};

var isValidPassword = function isValidPassword(email, password) {
    return User.findOne({
        where: {
            email: email
        }
    }).then(function (user) {
        var stored_password = user.dataValues.password;
        var isPassword = bcrypt.compareSync(password, stored_password);
        return isPassword;
    });
    return false;
};

router.get("/", function (req, res) {
    return res.render("login", { req: req });
});

router.post("/", function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;


    isValidEmail(email).then(function (isValid) {
        if (isValid) {
            isValidPassword(email, password).then(function (isValid) {
                if (isValid) {
                    req.session.email = email;
                    return res.render('user/mycatalog', { req: req });
                } else {
                    return res.render('login', { login_error_message: "Incorrect Password" });
                }
            });
        } else {
            return res.render('login', { login_error_message: "Unrecognized email." });
        }
    });
});

module.exports = router;