const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Task = db.define("task", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completion: {
        type: DataTypes.STRING,
    }
});

module.exports = Task;