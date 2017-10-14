// register controller
const user = require('./../models/User.js')
const db = require('./../db')

// password encryption w/ bcrypt
const bcrypt = require('bcrypt-nodejs')
const salt = bcrypt.genSaltSync(10);

// User model
const User = db.define('user', user.schema, {
    timestamps: false
})

//// routing functions
export const index = (req, res) => res.render('register')
export const registerUser = (req, res) => {
    const {
        email,
        displayedname,
        password,
        password2
    } = req.body;

    // if passwords aren't equal, re-direct to register page again (with message)
    if (password != password2) {
        return res.render('register', {
            register_error_message: "Passwords are not equal."
        })
    }

    let hashedPassword = bcrypt.hashSync(password, salt)

    isUnique(email).then(isUnique => {
        if (isUnique) {
            createUser(email, displayedname,
                hashedPassword)

            res.render('login', {
                success_register_message: "Registration Succesful! You can now log-in."
            })
        } else {
            res.render('register', {
                register_error_message: "Email already exists."
            })
        }
    })
}

// helper functions
const createUser = (email, displayedname, password) => {
    User.create({
        email: email,
        displayedname: displayedname,
        password: password
    })
}

// isUnique: checks db for email in User table
const isUnique = (email) => {
    return User.count({
            where: {
                email: email
            }
        })
        .then(count => {
            if (count != 0) {
                return false;
            }
            return true;
        })
}