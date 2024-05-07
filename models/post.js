'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Post extends Model { } //hasta aquí DE MEMORIA!

    Post.init({
            title: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Title no puede estar vacío"}}
            },
            body: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Body no puede estar vacío"}}
            }
        }, {sequelize}
    );

    return Post;
};