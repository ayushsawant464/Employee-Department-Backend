const db = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models'); 
const Employee = db.Employee;
const EmployeeDepartment = db.EmployeeDepartment;

// Get all employees
const getAllEmployees = async () => {
  return await Employee.findAll();
};

// Create a new employee
const createEmployee = async (data) => {
  const { name, joining, salary, departmentIds } = data;
  console.log(data)
  const employee = await Employee.create({
    name,
    joining,
    salary
  });
  
  const employeeDepartmentEntries = departmentIds.map((departmentId) => ({
    employeeId: employee.id,
    departmentId,
  }));
  try {
  await EmployeeDepartment.bulkCreate(employeeDepartmentEntries);
} catch(error) {
  console.error(employeeDepartmentEntries)
  throw new Error('Unable to bulk create employee department entries');
}
  return employee;
};

// Update an existing employee
const updateEmployee = async (id, updateData) => {
  const { departmentIds, ...employeeData } = updateData;
  const employee = await Employee.findByPk(id);
  if (!employee) {
    throw new Error('Employee not found');
  }

  await employee.update(employeeData);
    // First, clear existing associations
    await EmployeeDepartment.destroy({
      where: { employeeId:id },
    });

    // Add new associations
    const employeeDepartmentEntries = departmentIds.map((departmentId) => ({
      employeeId: employee.id,
      departmentId,
    }));
    try {
    await EmployeeDepartment.bulkCreate(employeeDepartmentEntries);
  } catch(error) {
    console.error(employeeDepartmentEntries)
    throw new Error('BUlk create not found');
  }
  
  return employee;
};

// Delete all employees
const deleteAllEmployees = async () => {
  const employee = await Employee.destroy({
    where: { },
  });
  if (!employee) throw new Error('Employees not found');

  return { message: 'Employees deleted successfully' };
};

// Get employees by department ID
const getByDepartment = async (depId) => {
  return await Employee.findAll({
    include: {
      model: db.Department,
      where: { id: depId },
      through: { attributes: [] },
    },
  });
};

// Get employees by salary range
const getBySalaryRange = async (minSalary, maxSalary) => {
  const query = `
    SELECT * FROM Employees
    WHERE salary BETWEEN :minSalary AND :maxSalary
  `;

  const replacements = { minSalary, maxSalary }; // Bind parameters to the query

  const [results] = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT, // SELECT query
  });

  return results; 
};

// Get employees by joining date range
const getByJoiningDate = async (startDate, endDate) => {
  return await Employee.findAll({
    where: {
      joining: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
};

const getByExperience = async (minExperience) => {
  // Calculate the threshold date for the minimum experience
  const currentDate = new Date();
  const experienceThresholdDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - minExperience));

  return await Employee.findAll({
    where: {
      joining: {
        [Op.lte]: experienceThresholdDate, // Employees who joined before or on the threshold date
      },
    },
  });
};


module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteAllEmployees,
  getByDepartment,
  getBySalaryRange,
  getByJoiningDate,
  getByExperience,
};
