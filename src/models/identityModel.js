const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Identity = sequelize.define('Identity', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicKey: {
      type: DataTypes.TEXT('long'),  // Use TEXT('long') for long text
      allowNull: true
    },
    privateKey: {
      type: DataTypes.TEXT('long'),  // Use TEXT('long') for long text
      allowNull: true
    }
  });

  return Identity;
};