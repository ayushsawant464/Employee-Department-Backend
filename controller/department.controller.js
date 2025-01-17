const db = require("../models");
const Department = db.department;
const departmentService = require("../service/department.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

  // Get all departments
const getAllDepartment = catchAsync ( async(req, res) => {
    try {
      const departments = await departmentService.getAllDepartments();
      res.status(200).json({ success: true, departments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Create a new department
const createDepartment = catchAsync( async (req, res) => {
    try {
      const { name } = req.body;
      
      const department = await departmentService.createDepartment(name);
      res.status(201).json({ success: true, department });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Update an existing department
const updateDepartment = catchAsync( async (req, res) => {
    try {
      const { id, name } = req.body;
      const department = await departmentService.updateDepartment(id, name);
      res.status(200).json({ success: true, department });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Delete all departments
  const deleteAllDepartments = catchAsync ( async(req, res) => {
    try {
      await departmentService.deleteDepartment();
      res.status(200).json({ success: true, message: 'All departments deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });




module.exports = {
  getAllDepartment,
  deleteAllDepartments,
  createDepartment,
  updateDepartment
}