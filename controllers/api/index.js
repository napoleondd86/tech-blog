
const router = require('express').Router();
const commentRoutes = require('./comment.api.routes');
const userRoutes = require('./user.api.routes');
const blogpostRoutes = require('./blogpost.api.routes');

router.use('/comment', commentRoutes);
router.use('/user', userRoutes);
router.use('/blogpost', blogpostRoutes);

module.exports = router;
