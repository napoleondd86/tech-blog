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
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"]
          }

        }
      ]
    })
    
    // SERIALIZE THE DATA

    const blogposts = allBlogposts.map(blogpost=>blogpost.get({plain: true}))
    console.log("this is the homepage blogposts", blogposts)
    res.render("homepage", {
      // PASS DATA TO HANDLEBARS
      blogposts,
      loggedIn: req.session?.loggedIn
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({status: "error", payload: err.message})
  }
});



module.exports = router;