const Sequelize = require('sequelize')

const schema = {
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    displayedname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
    }
}

module.exports = {schema}