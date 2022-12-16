const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Task = db.define("task", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.STRING,
    }
});

module.exports = Task;