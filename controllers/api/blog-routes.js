const router = require('express').Router();
const {Blog, User,} = require('../../models')

router.get('/', async (req,res)=>{
    try{
        const allBlogs = await Blog.findAll({
            include: [User]
        })
        res.json(allBlogs)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: `${err}`});
    }
});

// get blog by id
router.get('/:blogId', async (req,res)=>{
    try{
        const user = await User.findOne({
            include: {
                model: Blog,
                where: {id: req.params.blogId}}
        })
        if (!user) {
            res.status(404).json({msg: `This user does not exist!`})
        }
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: `${err}`})
    }
});



// new blog
router.post('/', async (req,res) =>{
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    } catch (err) {
        console.log(err);
        res.json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
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
            user_id: req.session.user_id,
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
  

module.exports = router