const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Post }) {
      this.hasMany(Post, { foreignKey: 'userId', as: 'user' })
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a password' },
      }
    },
    profile_img: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91shP1FBzGr748D0rew0wzsqmEiGZxItMkA&usqp=CAU"
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User'
  })

  return User
}