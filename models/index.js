const Sequelize = require('sequelize'); //importar sequelize 

const url = "sqlite:blog.sqlite"; //nombre base de datos (blog.sqlite)

const sequelize = new Sequelize(url, { logging: false }); //crear base de datos. logging false para limpiar salida terminal

//"requerimientos"
const Post = require('./post')(sequelize, Sequelize.DataTypes);
const Attachment = require('./attachment')(sequelize, Sequelize.DataTypes);

Attachment.belongsTo(Post, {as: 'post', foreignKey: 'postId'});
Post.hasOne(Attachment, {as: 'attachment', foreignKey: 'postId'});

module.exports = sequelize;