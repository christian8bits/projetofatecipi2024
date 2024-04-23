'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedidos.init({
    data: DataTypes.STRING,
    pedido: DataTypes.STRING,
    codigoev: DataTypes.STRING,
    comprador: DataTypes.STRING,
    cpfcnpj: DataTypes.STRING,
    destinatario: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    cep: DataTypes.STRING,
    formaenvio: DataTypes.STRING,
    codigorastreio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedidos',
  });
  return Pedidos;
};