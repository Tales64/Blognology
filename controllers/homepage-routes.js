const router = require('express').Router();
const { User, Blog } = require('../models');

// get all Blogs
router.get(`/`, async (req,res)=>{
    try {
        const allBlogs = await Blog.findAll({
            include: [User]
        })
        // res.json(allBlogs)
        console.log(`${allBlogs} this is before serialization`)
        const blogs = allBlogs.map((blogArr)=>blogArr.get({ plain: true }));
        console.log(`${blogs} this is after serialization`)
        console.log(allBlogs)
        res.render(`homepage`, {
            blogs: blogs,
            logged_in:req.session.logged_in
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({msg: `${err}`});
    }
});

module.exports = router;