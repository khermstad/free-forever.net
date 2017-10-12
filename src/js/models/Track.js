const Sequelize = require('sequelize')

const schema = {
    email: {
        type: Sequelize.STRING
    },
    s3key: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    bucket: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    }
}

module.exports = {schema}