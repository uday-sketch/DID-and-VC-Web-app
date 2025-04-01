const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Credential = sequelize.define('Credential', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    issuer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credentialData: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proof: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proofType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'RsaSignature2018'
    },
    issuanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  return Credential;
};