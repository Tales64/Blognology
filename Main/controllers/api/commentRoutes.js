const router = require('express').Router();
const { User, Comment, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.user.Id,
      blogId: req.body.blogId
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
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

router.get('/', (req, res) => {
    
      Comment.findAll({
        include:[User, Blog]
      })
      .then(commentData => res.json(commentData))
      .catch (err => {res.status(500).json(err);
    })
  });

router.get('/:id', (req, res) => {
    
    Comment.findByPk(req.params.id, {
      include:[User, Blog]
    })

       
    
    .then(commentData => res.json(commentData))
    .catch (err => {res.status(500).json(err);
  })
});

router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        where: {
          id: req.params.id,
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

module.exports = router;