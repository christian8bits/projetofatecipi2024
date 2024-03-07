'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
    


     */
    static associate(models) {
      // 
    }
  }
  Clientes.init({
    nome: DataTypes.STRING,
    cpfcnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
    cep: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    uf: DataTypes.STRING,
    cidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clientes',
  })
  return Clientes
}