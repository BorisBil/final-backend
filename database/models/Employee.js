const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Employee = db.define("employee", {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
    }
});

module.exports = Employee;