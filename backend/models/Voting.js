const { DataTypes } = require("sequelize");
const randomStr = require("random-string-generator");

const Voting = (sequelize) => {
  return sequelize.define("Voting", {
    voting_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vote_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    join_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
}

module.exports = Voting;