const { Employee, Task } = require('../models');

const seedDB = async () => {
	const dummyEmployee = await Employee.create({
		firstname: "Boris",
		lastname: "Bilogur",
		department: "Computer Science"
	});
	const dummyEmployee2 = await Employee.create({
		firstname: "Kim",
		lastname: "Kardashian"
	});

	const dummyTask = await Task.create({
		name: "Something",
        description: "Doing something",
        priority: "Very High",
        completed: "Nope",
        employee_id: "1"
	});

	await dummyTask.setEmployee(dummyEmployee);
}

module.exports = seedDB;