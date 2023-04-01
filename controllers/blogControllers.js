const Blog = require('../models/blog');

const blog_index = (req, res) => {
    res.render('index', { layout: 'partials/main-layout', title: 'Home' });
};

const blog_about = (req, res) => {
    res.render('about', { layout: 'partials/main-layout', title: 'About' });
};

const blog_404 = (req, res) => {
    res
    .status(404)
    .render('404', { layout: 'partials/main-layout', title: 'Home' });
};

const blog_redirect = (req, res) => {
    res.redirect('/about');
};

const blogs_all = (req, res) => {
    Blog.find()
        .then(result => { res.render('blogs', { layout: 'partials/main-layout', title: 'Blogs', blogs: result  }) })
        .catch(err => console.log(err));
};

const blogs_find_id = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => { res.render('details', { layout: 'partials/main-layout', title: 'Blog Details', blog: result  }) })
        .catch(err => {
            res
                .status(404)
                .render('404', { layout: 'partials/main-layout', title: 'Home' });
        })
};

const blogs_delete_id = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => { res.json({ redirect: '/blogs' }) })
        .catch(err => console.log(err));
}

const blog_create = (req, res) => {
    res.render('create', { layout: 'partials/main-layout', title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => console.log(err));
}

module.exports = {
    blog_index,
    blog_about,
    blog_404,
    blog_redirect,
    blogs_all,
    blog_create,
    blog_create_post,
    blogs_find_id,
    blogs_delete_id
};