'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Attachment extends Model { } //hasta aquí DE MEMORIA!

    Attachment.init({
            mime: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.BLOB('long')
            },
            url: {
                type: DataTypes.STRING
            }
        }, {sequelize}
    );

    return Post;
};