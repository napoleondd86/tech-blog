const router = require('express').Router();


//import all api route riles here
const userApiRoutes = require('./api/user.api.routes');



// import all html route files here
const userHtmlRoutes = require("./html/user.html.routes");

// Add api routes to the router
router.use("/api/user", userApiRoutes);

// add html routes to the router
router.use('/user', userHtmlRoutes);

module.exports = router;