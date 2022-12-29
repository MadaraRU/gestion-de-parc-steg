module.exports = (sequelize, Sequelize) => {
  const Voiture = sequelize.define('voitures', {
    marque: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    plaque: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    parcId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'parcs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });

  return Voiture;
};
