// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class employee extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//       employee.belongsTo(models.Department, {
//         foreignKey: 'id', 
//         as: 'department'
//       });
//     }
//   }
//   employee.init({
//     id: DataTypes.INTEGER,
//     name: DataTypes.STRING,
//     joining: DataTypes.DATEONLY,
//     salary: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'employee',
//   });
//   return employee;
// };
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // Define many-to-many relationship with Department
      Employee.belongsToMany(models.Department, {
        through: models.EmployeeDepartment,
        foreignKey: 'employeeId',
        otherKey: 'departmentId',
      });
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      joining: DataTypes.DATEONLY,
      salary: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  );
  return Employee;
};
