'use strict';

// database connection
var Sequelize = require('sequelize');
var db_config = require('../../config/db-config');
var sequelize = new Sequelize(db_config.dbname, db_config.username, db_config.password, {
    host: db_config.host,
    dialect: db_config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    operatorsAliases: false
});

module.exports = sequelize;