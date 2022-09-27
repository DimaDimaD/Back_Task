const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const FileSchema = sequelize.define('fileModel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, unique: true, },
    extension: {type: DataTypes.STRING},
    mimetype:{type: DataTypes.STRING},
    size:{type: DataTypes.STRING},
    dateTime:{type:DataTypes.DATE}
});

module.exports = {
    FileSchema
}
