const router = require('express').Router();
const { Post, User,Comment } = require('../../models');



router.post('/', async (req, res) => {
    try {
        const createPost = await Post.create({
            ...req.body, 
            user_id: req.session.user_id,
        });

        res.status(200).json(createPost);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
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
        const post = postData.get({plain:true});
        res.render('singlePost', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const delPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!delPost) {
            res.status(404).json({ message: 'Cannot delete post, no post known'});
            return;
        }
        res.status(200).json(delPost);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router; 