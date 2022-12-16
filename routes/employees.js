const express = require('express');
const router = express.Router();
const { Task, Employee } = require('../database/models');
const ash = require('express-async-handler');

/** GET ALL INSTRUCTORS */
router.get('/', ash(async(req, res) => {
    let employees = await Employee.findAll({include: [Task]});
    res.status(200).json(employees);
}));
  
/** GET INSTRUCTOR BY ID*/
router.get('/:id', ash(async(req, res) => {
    let employee = await Employee.findByPk(req.params.id, {include: [Task]});
    res.status(200).json(employee);
}));

/** EDIT INSTRUCTOR */
router.put('/:id', ash(async(req, res) => {
    await Employee.update(req.body, {
    where: {
        id: req.params.id
    }
    });
    let employee = await Employee.findByPk(req.params.id, {include: [Task]});
    res.status(201).json(employee);
}));

module.exports = router;