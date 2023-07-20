const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reviewDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'Review',
  }
);

module.exports = Review;
