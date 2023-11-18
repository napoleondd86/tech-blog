const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: "User",
        key: "id"
      }
    },
   
  },

  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'Blogpost'
  }
);

module.exports = Blogpost;