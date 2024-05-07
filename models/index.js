const Sequelize = require('sequelize'); //importar sequelize 

const url = "sqlite:blog.sqlite"; //nombre base de datos (blog.sqlite)

const sequelize = new Sequelize(url, { logging: false }); //crear base de datos. logging false para limpiar salida terminal

module.exports = sequelize;