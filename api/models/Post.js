'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tag }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
      this.belongsToMany(Tag, { through: 'PostTag' })
    }

  }
  Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  )
  return Post
}