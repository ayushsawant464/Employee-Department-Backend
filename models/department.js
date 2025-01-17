// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class department extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//       department.hasMany(models.Employee, {
//         foreignKey: 'id', 
//         as: 'employees' 
//       });
//     }
//   }
//   department.init({
//     id: DataTypes.INTEGER,
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'department',
//   });
//   return department;
// };
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      // Define many-to-many relationship with Employee
      Department.belongsToMany(models.Employee, {
        through: models.EmployeeDepartment,
        foreignKey: 'departmentId',
        otherKey: 'employeeId',
      });
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Department',
    }
  );
  return Department;
};
