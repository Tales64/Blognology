const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/:blogId', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    const blogData = await Blog.findOne({
      where: { id: req.params.blogId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ msg: `This blog doesn't exist!` });
      return;
    }

    console.log(`This is the blog data: ${blogData}`);
    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render(`blog`, {
      blog: blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `${err}` });
  }
});

router.post('/:blogId', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    await Comment.create({
      body: req.body.body,
      UserId: req.session.user_id,
      BlogId: req.params.blogId,
    });
    res.redirect(`/blogs/${req.params.blogId}`); // Redirect instead of reloading
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `${err}` });
  }
});

// Create new blog
router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    await Blog.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.user_id,
    });
    res.redirect('/'); // Redirect to home page or appropriate route
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/', async (req, res)=>{
  try{ if (!req.session.logged_in) {
    res.redirect('login');
    return; // Return after redirecting
  }
  await Blog.destroy({
    title: req.body.title,
    body: req.body.body,
    userId: req.session.user_id,
  });
  res.redirect('/'); // Redirect to home page or appropriate route
} catch (err) {
  console.log(err);
  res.status(500).json(err);}
})

module.exports = router;
