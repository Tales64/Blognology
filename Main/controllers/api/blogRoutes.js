const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title:req.body.title,
      desc:req.body.desc,
      userId: req.session.user.id
    });
    req.session.save(()=>{
      req.session.logged_In = true;
      res.status(200).json(newBlog);
    });

  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res)=> {
  Blog.findAll({
      include:[User, Comment]
        
    })
    .then(blogsData =>{
      res.json(blogsData);
    })
   .catch(err)
      res.status(500).json(err);
  
});



router.get('/:id', async (req, res) => {
  Blog.findByPk(req.params.id, {
    include: [User, Comment]
  })
      .then(blogData =>{
        res.json(blogData);
      })
    .catch (err =>{
      res.status(500).json(err);
    });      
});


router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
   
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;