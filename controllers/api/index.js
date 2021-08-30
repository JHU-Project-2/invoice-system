const router = require('express').Router();
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/users', userRoutes);
router.use('/company', companyRoutes);
router.use('/contacts', contactRoutes);

module.exports = router;
