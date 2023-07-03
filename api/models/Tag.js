'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      // userId
      this.belongsToMany(Post, { through: 'PostTag' })
    }

  }
  Tag.init(
    {
      tag_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      tag_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,

      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false,
      sequelize,
      tableName: 'tags',
      modelName: 'Tag',
    }
  )
  return Tag
}