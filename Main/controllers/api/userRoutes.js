const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const bcrypt = require("bcrypt");


// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });

      console.log(req.body.username);
      console.log(req.body.password);
  
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.logged_In = true;
  
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
        // res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
    
// Log in  
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_In = true;
      
      
      res
      .status(200)
      .json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log out
router.post('/logout', (req, res) => {
  if (req.session.logged_In) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET all users
router.get('/', async (req, res) => {
  try{
  const userData = await User.findAll({
    include: [Blog, Comment]
  });
  const users = userData.map((user) => user.get({ plain: true }));
  res.render('all', { users });
} catch(err) { 
      res.status(500).json(err);
}
    });
      
    
 


// GET user by id
router.get('/:id', async (req, res) => {
  try{ 
      const userData = await User.findByPk(req.params.id, {
        include:[Blog, Comment]
      });
      if(!userData) {
          res.status(404).json({message: 'No user with this id!'});
          return;
      }
      const user = userData.get({ plain: true });
      res.render('user', user);
    } catch (err) {
        res.status(500).json(err);
    };     
});

module.exports = router;