const bcrypt = require('bcrypt');
const { Department } = require('../models');

const createDepartment = async (name) => {
  console.log(name)
  const departmentData = {
    name,
  };

  const department = await Department.create({
    name
   
  });
};

const updateDepartment = async (params) => {
  const { id, ...updateFields } = params;

  const department = await Department.findByPk(id);
  if (!department) {
    throw new Error('Department not found');
  }

  await department.update(updateFields);
  return department;
};

const deleteDepartment = async (id) => {
  const result = await Department.destroy({
    where: { },
  });

  if (result === 0) {
    throw new Error('Departments already deleted');
  }

  return { message: 'Department deleted successfully' };
};

const getAllDepartments = async () => {
  return await Department.findAll();
};

module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
};
