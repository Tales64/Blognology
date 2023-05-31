const router = require('express').Router();
const { User, Post, Comment } = require('./../models');

router.get('/:postId', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    const postData = await Post.findOne({
      where: { id: req.params.postId },
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

    if (!postData) {
      res.status(404).json({ msg: `This post doesn't exist!` });
      return;
    }

    console.log(`This is the post data: ${postData}`);
    const post = postData.get({ plain: true });
    console.log(post);
    res.render(`post`, {
      post: post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `${err}` });
  }
});

router.post('/:postId', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    await Comment.create({
      body: req.body.body,
      UserId: req.session.user_id,
      PostId: req.params.postId,
    });
    res.redirect(`/posts/${req.params.postId}`); // Redirect instead of reloading
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `${err}` });
  }
});

// Create new post
router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('login');
      return; // Return after redirecting
    }
    await Post.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.session.user_id,
    });
    res.redirect('/'); // Redirect to home page or appropriate route
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
