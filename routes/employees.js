const express = require('express');
const router = express.Router();
const { Task, Employee } = require('../database/models');
const ash = require('express-async-handler');

/** GET ALL EMPLOYEES */
router.get('/', ash(async(req, res) => {
    let employees = await Employee.findAll({include: [Task]});
    res.status(200).json(employees);
}));
  
/** GET EMPLOYEE BY ID*/
router.get('/:id', ash(async(req, res) => {
    let employee = await Employee.findByPk(req.params.id, {include: [Task]});
    res.status(200).json(employee);
}));

/** EDIT EMPLOYEE */
router.put('/:id', ash(async(req, res) => {
    await Employee.update(req.body, 
        { where: { id: req.params.id } }
    );
    let employee = await Employee.findByPk(req.params.id, {include: [Task]});
    res.status(201).json(employee);
}));

/** ADD NEW EMPLOYEE */
router.post('/', ash(async(req, res) => {
    let newEmployee = await Employee.create(req.body);
    res.status(200).json(newEmployee);
}));

module.exports = router;