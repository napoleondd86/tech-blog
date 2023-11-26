const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');


//middleware to check if user is logged in
function isAuthenticated(req, res, next){
  if(!req.session.loggedIn){
    res.redirect("/?loginRequired=true")
  } else {
    next()
  }
}

// apply middleware to all routes in this module
router.use(isAuthenticated);

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
    res.render("dashboard", {
      loggedIn: req.session?.loggedIn,
      blogposts,
      homepage: false
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