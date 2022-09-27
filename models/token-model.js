const {Schema, model} = require('mysql2');
const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const {UserSchema} = require("./user-model");

const TokenSchema = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user:{type: DataTypes.STRING, ref: UserSchema},
    refreshToken: {type: DataTypes.STRING, required: true},
});

module.exports = {
    TokenSchema
};
