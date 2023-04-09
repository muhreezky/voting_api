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
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    join_code: {
      type: DataTypes.STRING,
      defaultValue: randomStr(6, 'alphanumeric').toUpperCase()
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
}

module.exports = Voting;