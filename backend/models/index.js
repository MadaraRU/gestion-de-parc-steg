const config = require('../config/db.config.js');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.js')(sequelize, Sequelize);
db.parc = require('../models/parc.js')(sequelize, Sequelize);
db.voiture = require('../models/voiture')(sequelize, Sequelize);

db.parc.hasMany(db.voiture, {
  foreignKey: 'parcId',
  as: 'voitures',
});

db.voiture.belongsTo(db.parc, {
  foreignKey: 'parcId',
  as: 'parcs',
});

module.exports = db;
