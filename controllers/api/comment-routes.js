const router = require('express').Router();
const { Comment, Blog, User } = require('./../../models')

// get all blogs with comments and usernames
router.get('/', async (req,res) => {
    try {
        const allComments = await Comment.findAll({include: [Blog, User]})
        res.json(allComments)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: `${err}`})
    }
});

// create new comment
router.post('/:blogId', async (req,res)=>{
    try {
        if (!req.session.logged_in) {
            res.status(401).json({msg: "Not logged in!"})
        }
        const newComment = await Comment.create({
            body: req.body.body,
            BlogId: req.params.blogId,
            UserId: req.session.user_id,

        })
        res.status(200).json(newComment)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: `${err}`})
    }
});

router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
   
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router