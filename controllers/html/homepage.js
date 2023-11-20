const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');



// render homepage
router.get('/', async (req, res) => {
  try {
    const allBlogposts = await Blogpost.findAll({
      include:[
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
    const blogposts = allBlogposts.map(blogpost=>blogpost.get({plain: true}))
    console.log(blogposts)
    res.render("homepage", {
      blogposts,
      loggedIn: req.session?.loggedIn
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});



module.exports = router;