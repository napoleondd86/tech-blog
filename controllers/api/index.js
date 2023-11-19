
const router = require('express').Router();
const commentRoutes = require('./comment.api.routes');
const userRoutes = require('./user.api.routes');
const blogpostRoutes = require('./blogpost.api.routes');

router.use('/', commentRoutes);
router.use('/', userRoutes);
router.use('/', blogpostRoutes);

module.exports = router;
