// database connection
const Sequelize = require('sequelize')
const db_config = require('../../db-config')
const sequelize = new Sequelize(db_config.dbname, db_config.username, db_config.password, {
    host: db_config.host,
    dialect: db_config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    operatorsAliases: false
})

module.exports = sequelize