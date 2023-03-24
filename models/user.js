'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true,
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false, // NOT NULL
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
