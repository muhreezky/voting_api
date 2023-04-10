const { DataTypes } = require("sequelize");

const Candidate = (sequelize) => {
  return sequelize.define("Candidate", {
    candidate_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    voting_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};

module.exports = Candidate;