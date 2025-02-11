'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => { //para poder requerirlo en el index

    class Post extends Model { } //hasta aquí DE MEMORIA! -> chuleta

    Post.init({
            title: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Title no puede estar vacío"}}
            },
            body: {
                type: DataTypes.TEXT,
                validate: {notEmpty: {msg: "Body no puede estar vacío"}}
            }
        }, {sequelize}
    );

    return Post; //para poder requerirlo en el index
};