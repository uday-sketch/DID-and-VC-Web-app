const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'uday', {
  host: 'localhost',
  dialect: 'postgres'
});

const Identity = require('./identityModel')(sequelize);
const Credential = require('./credentialModel')(sequelize);

sequelize.sync({ force: true });

module.exports = {
  sequelize,
  Identity,
  Credential
};