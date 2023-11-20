const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');



// render dashboard
router.get('/', async (req, res) => {
  try {
    res.render("dashboard", {
      loggedIn: req.session?.loggedIn
    });
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;