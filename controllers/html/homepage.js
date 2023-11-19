const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');



// render homepage
router.get('/', async (req, res) => {
  try {
    res.render("homepage", {loggedIn: req.session?.loggedIn});
    // This should start a session count for user visit (do we need this? taken from MVC #15)
    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }
   

    });
  }
  catch (err) {
    res.status(500).json(err)
  }
});