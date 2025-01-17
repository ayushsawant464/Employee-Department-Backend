const express = require('express');
const router = express.Router();

const departmentController = require('../../controller/department.controller.js');

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
router.get('/',  departmentController.getAllDepartment);
router.post('/create', departmentController.createDepartment);
router.delete('/delete', departmentController.deleteAllDepartments);

//tbd
// router.put('/update/:id', departmentController.updateDepartment);

module.exports = router;