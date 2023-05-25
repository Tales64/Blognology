const router = require('express').Router();
const { Blog, User,Comment } = require('../../models');



router.post('/', async (req, res) => {
    try {
        const createBlog = await Blog.create({
            ...req.body, 
            user_id: req.session.user_id,
        });

        res.status(200).json(createBlog);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }, 
                {
                    model: Comment,
                    include: [
                        User
                    ]
                }
            ],
        });
        const blog = blogData.get({plain:true});
        res.render('singleBlog', {
            ...blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const delBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!delBlog) {
            res.status(404).json({ message: 'Cannot delete blog, no blog known'});
            return;
        }
        res.status(200).json(delBlog);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router; 