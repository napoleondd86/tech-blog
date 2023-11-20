const router = require('express').Router();


//import all api route riles here
const apiRoutes = require('./api');
const htmlRoutes = require("./html")
// import all html route files here


// Add api routes to the router
router.use("/api", apiRoutes);

// add html routes to the router
router.use('/', htmlRoutes);

module.exports = router;