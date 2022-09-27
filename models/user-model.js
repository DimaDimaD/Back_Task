const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const UserSchema = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING},
});

module.exports = {
    UserSchema
}
