const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const FileSchema = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, unique: true },
    filetype: {type: DataTypes.STRING},
    mimeType: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    uploadDate: {type: DataTypes.DATE}
});

module.exports = {
    FileSchema
}
