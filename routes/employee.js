const Employee = require('../models/employee')
const express = require('express');
const router = express.Router()

const{createEmployee, getEmployee,deleteEmployee,updateEmployee}= require('../controllers/employee')

router.route('/').get(getEmployee).post(createEmployee)

router.route('/:id').patch(updateEmployee).delete(deleteEmployee)

module.exports = router;