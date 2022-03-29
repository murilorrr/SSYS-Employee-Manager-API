module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Employee',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      department: DataTypes.STRING,
      password: DataTypes.STRING,
      salary: DataTypes.STRING,
      birth_date: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Employees',
    },
  );

  return User;
};
