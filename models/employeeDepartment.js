const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeDepartment extends Model {}
  EmployeeDepartment.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Employee',
          key: 'id',
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Department',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'EmployeeDepartment',
    }
  );
  return EmployeeDepartment;
};
