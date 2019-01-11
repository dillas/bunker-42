const post = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
    },
    sortNumber: {
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.TEXT
    },
    previewPicture: {
      type: DataTypes.STRING
    }
  })

  Post.associate = models => {
    Post.belongsTo(models.User)
  }

  return Post
}

export default post
