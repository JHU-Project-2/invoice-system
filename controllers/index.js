// we bring in the express router
const router = require('express').Router();

// declaring our different routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const mailRoutes = require('./mail');

// we define 4 paths for the routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mail', mailRoutes);

module.exports = router;
