module.exports = (sequelize, Sequelize) => {
  const Parc = sequelize.define('parcs', {
    reference: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    departement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_de_place: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
  });

  return Parc;
};
