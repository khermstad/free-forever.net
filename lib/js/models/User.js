'use strict';

var Sequelize = require('sequelize');

var schema = {
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    displayedname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
};

module.exports = { schema: schema };