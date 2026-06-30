const posts = require('../data/posts');
const connection = require('../database/connection')

// INDEX DEI POST
const index = (req, res) => {
    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        console.log(err);

        if(err) {
            console.error('error executing query:', err);
            return res.status(500).json({ error: true, message: 'internal server error '});
        }
        console.log(results);
        req.json(results);
    })
    // const { tag } = req.query;

    // if (tag) {
    //     // filter the posts that contain the tag
    //     const filteredPosts = posts.filter(post => post.tags.includes(tag));
    //     return res.json(filteredPosts);
    // }

    // return res.json(posts);
}


// SHOW DI UN SINGOLO POST
const show = (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPost = posts.find(post => post.id === postId);

    if (!thisPost) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json(thisPost);
};

// STORE DI UN NUOVO POST
const store = (req, res) => {
    const newId = posts[posts.length - 1].id + 1;
    const newPost = {
        id: newId,
        ...req.body
    }

    posts.push(newPost);
    res.status(201).json(newPost);
    console.log(posts);

};

// UPDATE DI UN POST ESISTENTE // PUT
const update = (req, res) => {
    const postId = parseInt(req.params.id);

    const thisPost = posts.find(post => post.id === postId);

    if (!thisPost) {
        return res.status(404).json({ error: 'Post not found' });
    }

    thisPost.title = req.body.title || thisPost.title;
    thisPost.content = req.body.content || thisPost.content;
    thisPost.image = req.body.image || thisPost.image;
    thisPost.tags = req.body.tags || thisPost.tags;


    console.log(posts);
    res.json(thisPost);
};

// MODIFICA DI UN POST ESISTENTE
const patch = (req, res) => {

    res.json({ message: "Patch a pizza by id" });

};

// DELETE DI UN POST ESISTENTE
const destroy = (req, res) => {
    const postId = parseInt(req.params.id);
    const thisPost = posts.find(post => post.id === postId);

    if (!thisPost) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const index = posts.indexOf(thisPost);
    posts.splice(index, 1);
    res.status(200).json({ message: `Post numero ${postId} eliminato con successo` });
    console.log(posts);

};


module.exports = {
    index,
    show,
    store,
    update,
    patch,
    destroy
};