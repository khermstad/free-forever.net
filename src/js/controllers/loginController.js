const user = require('./../models/User')
const db = require("./../db")
const bcrypt = require('bcrypt-nodejs')
const salt = bcrypt.genSaltSync(10);

const User = db.define('user', user.schema, {
    timestamps: false
})

// controller
export const index = (req, res) => res.render('login', {req: req})

export const login = (req, res) => {
    const {email, password} = req.body;
        isValidEmail(email).then(isValid => {
            if(isValid) {
                isValidPassword(email, password).then(isValid =>{
                    if (isValid){
                        req.session.email = email;
                        return res.render('user/userhome', {req: req})
                    }
                    else{
                        return res.render('login', {login_error_message: "Incorrect Password"})
                    }
                })
            }
            else{
                return res.render('login', {login_error_message: "Unrecognized email."})
            }
        }) 
}

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