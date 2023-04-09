const { DataTypes } = require("sequelize");

const History = (sequelize) => {
  return sequelize.define("History", {
    voting_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}

module.exports = History;