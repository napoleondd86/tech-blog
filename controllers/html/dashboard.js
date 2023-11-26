const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');



// render dashboard
router.get('/', async (req, res) => {
  try {
    const myBlogposts = await Blogpost.findAll({
      include: [{
        model: User,
        attributes: ["username"]
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ["username"]
        }
      }],
      where: {
        user_id: req.session.user_id
      },
    })
    // SERIALIZE THE DATA
    const blogposts = myBlogposts.map(blogpost => blogpost.get({plain: true}))
    ////////////////////// NEED TO ADD COMMENTS
    res.render("dashboard", {
      loggedIn: req.session?.loggedIn,
      blogposts
    });
  }
  catch (err) {
    console.log("error in dashboard render. You may not be logged in.")
    res.status(500).json({status: "error", payload: err.message})
  }
});

module.exports = router;

/*
PSEUDO CODE
- get all blogposts (where user.id = req.session.username)
- get all associated comments
*/