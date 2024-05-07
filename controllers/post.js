const Sequelize = require("sequelize");
const {models} = require("../models");

//autoload el post asociado a postId
exports.load = async (req, res, next, postId) => {
    try {
        const post = await models.Post.findByPk(postId, { //encontrar post dentro de Post con id=PostId pasado como parámetro
            include: [
                {model: models.Attachment, as: 'attachment'}
            ]
        });
        //cuando ya tenemos el post (guardado en la variable post) que queríamos
        if (post) {
            req.load = {...req.load, post}; //actualizar req con la info de post
            next();
        } else {
            throw new Error("No existe un post con el id" + postId);
        }
    } catch (error) {
        next(error);
    }
};