'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataPagamento: {
        type: Sequelize.STRING
      },
      pedido: {
        type: Sequelize.STRING
      },
      codigoev: {
        type: Sequelize.STRING
      },
      comprador: {
        type: Sequelize.STRING
      },
      cpfcnpj: {
        type: Sequelize.STRING
      },
      destinatario: {
        type: Sequelize.STRING
      },
      logradouro: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      uf: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      formaenvio: {
        type: Sequelize.STRING
      },
      codigorastreio: {
        type: Sequelize.STRING
      },
      frete: {
        type: Sequelize.STRING
      },
      valortotal: {
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
    await queryInterface.dropTable('Pedidos');
  }
};