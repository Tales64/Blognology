const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/', (req, res)=> {
    Comment.findAll({})
    .then(commentsData => res.json(commentsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            text: req.body.text, 
            post_id: req.body.post_id, 
            user_id: req.session.user_id,

        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log('Comment creation error')
            res.status(400).json(err)
        });
    };
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        
        }
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({message: "unable to do that, that comment was not found!"})
            return;
        }
        res.json(commentData);
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router; 