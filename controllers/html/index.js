
const router = require('express').Router();
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard');
// const blogpostRoutes = require('./blogpost.api.routes');

router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/', blogpostRoutes);

module.exports = router;