'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
          id: {
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

          attachmentId: {
            type: Sequelize.STRING,
            references: {
              model: "Attachments",
              key: "id"
            },

            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },

          createdAt: {
              type: Sequelize.DATE,
              allowNull: false
          },

          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
          }
      }, {  sync: {force: true} } //sincronizar si algo se modifica
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
