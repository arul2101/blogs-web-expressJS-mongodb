const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const blogRoutes = require('./routes/blogRoutes');
const {
    blog_index,
    blog_about,
    blog_404,
    blog_redirect,
} = require('./controllers/blogControllers');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// connect to mongodb
const dbURI = 'mongodb+srv://arul2101:test1234@node-tuts.bpohexp.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`Server berjalan pada port ${port}`);
        });
    })
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', blog_index);

// about routes
app.get('/about', blog_about);

// blog routes
app.use('/blogs', blogRoutes);

// Redirect Page
app.get('/about-us', blog_redirect);

// 404 Page
app.use(blog_404);

