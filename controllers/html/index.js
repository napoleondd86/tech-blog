
const router = require('express').Router();
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard');

router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;