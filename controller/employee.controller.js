const catchAsync = require('../utils/catchAsync');
const employeeService = require('../service/employee.service');

// Get all employees
const getAllEmployee = catchAsync(async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.status(200).json({ success: true, employees });
});

// Create a new employee
const createEmployee = catchAsync(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(201).json({ success: true, employee });
});
    
// Update an existing employee
const updateEmployee = catchAsync(async (req, res) => {
  const { id } = req.params; // get the id from URL params
  const employee = await employeeService.updateEmployee(id, req.body);
  res.status(200).json({ success: true, employee });
});

// Delete an employee by ID
const deleteAllEmployees = catchAsync(async (req, res) => {
  const { id } = req.params; // get the id from URL params
  await employeeService.deleteAllEmployees();
  res.status(200).json({ success: true, message: 'Employees deleted' });
});

// Get employees by department ID
const getByDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params; // get the department ID from query params

  const employees = await employeeService.getByDepartment(departmentId);
  res.status(200).json({ success: true, employees });
});

// Get employees by salary range
const getBySalaryRange = catchAsync(async (req, res) => {
  const { minSalary, maxSalary } = req.query; // get salary range from query params
  console.log(minSalary,maxSalary)
  const employees = await employeeService.getBySalaryRange(minSalary, maxSalary);
  res.status(200).json({ success: true, employees });
});

// Get employees by joining date range
const getByJoiningDate = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query; // get date range from query params
  const employees = await employeeService.getByJoiningDate(startDate, endDate);
  res.status(200).json({ success: true, employees });
});

// Get employees by years of experience
const getByExperience = catchAsync(async (req, res) => {
  const { minExperience } = req.query; // get minimum experience from query params
  const employees = await employeeService.getByExperience(minExperience);
  res.status(200).json({ success: true, employees });
});

module.exports = {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteAllEmployees,
  getByDepartment,
  getBySalaryRange,
  getByJoiningDate,
  getByExperience,
};
