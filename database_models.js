const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'task',
    'root',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
   
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
});

const Task = sequelize.define("task", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.DATEONLY,
    },
    completed: {
        type: DataTypes.STRING,
    },
    employee_id: {
        type: DataTypes.INTEGER,
    }
});

const Employee = sequelize.define("employee", {
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

Employee.hasMany(Task)
Task.hasOne(Employee)

sequelize.sync().then(() => {
    console.log('Task table created successfully!');
    }).catch((error) => {
    console.error('Unable to create table : ', error);
});