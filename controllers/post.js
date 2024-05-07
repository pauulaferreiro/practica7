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

exports.new = (req, res, next) => {
    const post = {
        title: "",
        body: ""
    };
    res.render('posts/new', {post});
};

exports.create = async (req, res, next) => {
    const {title, body} = req.body;

    let post;
    try {
        post = models.Post.build({
            title,
            body
        });

        post = await post.save({fields: ["title", "body"]});
        console.log('Post creado con éxito.');

        try {
            if (!req.file) {
                console.log('Info: Se requiere una foto.');
                return;
            }

            // Create the post attachment
            await createPostAttachment(req, post);
        } catch (error) {
            console.log('Error: Failed to create attachment: ' + error.message);
        } finally {
            res.redirect('/posts/' + post.id);
        }
    } catch (error) {
        if (error instanceof (Sequelize.ValidationError)) {
            console.log('Errores en el formulario:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('posts/new', {post});
        } else {
            next(error);
        }
    }
};

const createPostAttachment = async (req, post) => {
    const image = req.file.buffer.toString('base64');
    const url = `${req.protocol}://${req.get('host')}/posts/${post.id}/attachment`;

    // Create the new attachment into the data base.
    const attachment = await models.Attachment.create({
        mime: req.file.mimetype,
        image,
        url
    });
    await post.setAttachment(attachment);
    console.log('Success: Attachment saved successfully.');
};

exports.edit = (req, res, next) => {
    const {post} = req.load;
    res.render('posts/edit', {post});
};

exports.update = async (req, res, next) => {
    const {post} = req.load;

    post.title = req.body.title;
    post.body = req.body.body;

    try {
        await post.save({fields: ["title", "body"]});
        console.log('Post editado exitosamente.');

        try {
            if (!req.file) {
                console.log('Info: Foto no cambiada.');
                return;
            }

            // Delete old attachment.
            if (post.attachment) {
                await post.attachment.destroy();
                await post.setAttachment();
            }

            // Create the post attachment
            await createPostAttachment(req, post);
        } catch (error) {
            console.log('Error: Fallo guardando la foto: ' + error.message);
        } finally {
            res.redirect('/posts/' + post.id);
        }
    } catch (error) {
        if (error instanceof (Sequelize.ValidationError)) {
            console.log('Errores en el formulario:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('posts/edit', {post});
        } else {
            next(error);
        }
    }
};