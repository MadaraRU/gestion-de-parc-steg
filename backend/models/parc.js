module.exports = (sequelize, Sequelize) => {
  const Parc = sequelize.define('parcs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    departement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_de_place: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Parc;
};
