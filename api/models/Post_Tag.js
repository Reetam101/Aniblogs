module.exports = (sequelize, DataTypes) => {
  const Post_Tag = sequelize.define("Post_Tag", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    tagId: {
      type: DataTypes.INTEGER,
    },
  });
  Post_Tag.associate = models => {
    Post_Tag.belongsTo(models.Post, {
      foreignKey: 'postId'
    });
    Post_Tag.belongsTo(models.Tag, {
      foreignKey: 'tagId'
    });
  }
  return Post_Tag;
};