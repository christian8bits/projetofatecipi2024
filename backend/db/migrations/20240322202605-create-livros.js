'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      tipolivro: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      estante: {
        type: Sequelize.STRING
      },
      editora: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      preco: {
        type: Sequelize.STRING
      },
      edicao: {
        type: Sequelize.STRING
      },
      peso: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      localizacao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Livros');
  }
};