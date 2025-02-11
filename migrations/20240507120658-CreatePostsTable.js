'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
          id: { //por defecto así
              type: Sequelize.INTEGER, 
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              unique: true
          },

          title: {
              type: Sequelize.STRING,
              validate: {notEmpty: {msg: "Title no puede estar vacío"}}
          },

          body: {
              type: Sequelize.TEXT,
              validate: {notEmpty: {msg: "Body no puede estar vacío"}}
          },

          createdAt: { //por defecto así
              type: Sequelize.DATE,
              allowNull: false
          },

          updatedAt: { //por defecto así
              type: Sequelize.DATE,
              allowNull: false
          }
      }, {  sync: {force: true} } //sincronizar si algo se modifica
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts'); //por defecto así
  }
};
