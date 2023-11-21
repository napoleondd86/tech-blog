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
    const allComments = await Comment.findAll({
      include: [
        {
          model: Blogpost,
          attributes: ["_id"]
        },
        {
          model: User,
          attributes: ["_id"]
        }
      ]
    })
    // SERIALIZE THE DATA
    const comments = allComments.map(comment => comment.get({plain: true}))
    const blogposts = allBlogposts.map(blogpost=>blogpost.get({plain: true}))
    console.log(blogposts)
    res.render("homepage", {
      // PASS DATA TO HANDLEBARS
      comments,
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