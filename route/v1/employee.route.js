const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js')
const validate = require('../../middleware/validate.js')
const employeeController = require('../../controller/employee.controller.js');

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - hello
 *     description: API is running
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/',employeeController.getAllEmployee);
router.post('/create', employeeController.createEmployee);
router.put('/update/:id', employeeController.updateEmployee);
router.delete('/delete', employeeController.deleteAllEmployees);

router.get('/department/:departmentId',  employeeController.getByDepartment);
router.get('/getBySalary',  employeeController.getBySalaryRange);
router.get('/getByJoining',  employeeController.getByJoiningDate);
//TBD
router.get('/getByExp',  employeeController.getByExperience);


module.exports = router;