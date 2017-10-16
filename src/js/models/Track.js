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
    },
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    rejected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    downloads: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    trackid: {
        type: Sequelize.INTEGER
    }
}

module.exports = {schema}