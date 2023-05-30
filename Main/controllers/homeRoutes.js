const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

const withAuth = require('../utils/auth');

// prevent not logged in users from viewing the homepage
router.get('/', (req, res) => {
      Blog.findAll({
      include: [User] 
    }).then(blogs => {
      const dbBlogs = blogs.map(blog =>
      blog.get({ plain: true }))

      const logged_In = req.session.user ? true:false;
      res.render('homepage', {
        blogs:dbBlogs, logged_In,
        username: req.session.user?.username})
      })
    })
    
    
  router.get('/login', (req, res) => {
  if (req.session.logged_In) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_In) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

// Get Dashboard

router.get('/dashboard', withAuth, async (req, res) => {
  try{
    // const userData = await User.findByPk(req.session.userId, {
    //   exclude:["password"], include:  [{
    //     model:Blog
    //   }]
        
    // });
    // const users = userData.map((blog) => blog.get({ plain:true}));
    res.render('dashboard', {
      // users,
      logged_In: req.session.logged_In,
    });
  }catch (err) {
    res.status(500).json(err);
  }
  });
  // if(!req.session.user) {
  //   return res.redirect('/login')
  // }
  //   User.findByPk(req.session.user_id, {
  //       include:[Blog, Comment]
  //   }),
  //   }).then(userData =>{
  //       const hbsData = userData.get({plain:true})
  //       hbsData.logged_In = req.session.user?true:false
  //       res.render("dashboard", hbsData)
        // res.render('dashboard', {user, logged_In:true});
    // })




router.get('/blogs/:id', (req, res) =>{
  if(!req.session.user) {
    return res.redirect('/login')
  }
  Blog.findByPk(req.params.id, {
    include:[User, {model: Comment, include: [User]}]}  
  )
  .then(blogData => {
    const dbBlog = dbBlogData.get({plain:true})
    const logged_In = req.session.user?true:false;

    if(blogData.userId != req.session.user.id) {
return res.render('comment',{dbBlog, logged_In,
username:req.session.user?.username})
    }
    res.render('updateDelete', {
      dbBlog, logged_In,
      usrename:req.session.user?.username
    })
  })
  .catch(err)
  res.status(500).json(err);
})







module.exports = router;