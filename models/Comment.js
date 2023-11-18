const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Blogpost",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }  
  },

  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'Comment'
  }
);

module.exports = Comment;