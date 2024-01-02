const router = require('express').Router();

//Routes 
const userR = require('./user-routes.js');
const postR = require('./post-routes.js')
const commentR = require('./comment-routes.js');
router.use('/users', userR);
router.use('/posts', postR);
router.use('/comments', commentR)


module.exports = router;