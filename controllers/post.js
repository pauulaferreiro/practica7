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

exports.attachment = (req, res, next) => {
    
    const attachment= req.load.post.attachment;

    if (!attachment) {
        res.redirect("/images/none.png");
    }
    else if (attachment.image) {
        res.type(attachment.mime);
        res.send(Buffer.from(attachment.image.toString(), 'base64'));
    }
    else if (attachment.url) {
        res.redirect(attachment.url);
    }
    else {
        res.redirect("/images/none.png");
    }
};

exports.index = async (req, res, next) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                {model: models.Attachment, as: 'attachment'}
            ]
        });
        res.render('posts/index.ejs', {listaPosts: posts});
    } catch (error) {
        next(error);
    }
};

exports.show = (req, res, next) => {
    const post = req.load.post;
    res.render('posts/show', {post});
};
