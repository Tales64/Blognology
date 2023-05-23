const router = require('express').Router();
const { User } = require('../../models');

//create user

router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// ============================================================================================================
//user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (!userData) {
      res.status(400).json({message: 'Incorrect login credentials!'});
      return;
    }
    
    const userPassword = await userData.checkPassword(req.body.password);
    
    if (!userPassword) {
      res.status(400).json({message: 'Incorrect login credentials!'});
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Successful login!'});
    });
  } catch (err) {
    res.status(400).json(err);
    }
  });
  
  // ============================================================================================================
  // logout user
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
  });
  
  module.exports = router;