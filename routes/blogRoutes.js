const express = require('express');
const {
    blogs_all,
    blog_create,
    blog_create_post,
    blogs_find_id,
    blogs_delete_id
} = require('./../controllers/blogControllers');
const router = express.Router();

router.get('/', blogs_all);
router.post('/', blog_create_post)
router.get('/create', blog_create);
router.get('/:id', blogs_find_id);
router.delete('/:id', blogs_delete_id);

module.exports = router;