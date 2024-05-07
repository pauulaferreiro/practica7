const Sequelize = require('sequelize');

const url = "sqlite:blog.sqlite";

const sequelize = new Sequelize(url, { logging: false }); //crear base de datos

module.exports = sequelize;