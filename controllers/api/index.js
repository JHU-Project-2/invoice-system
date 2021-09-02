const router = require('express').Router();
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const contactRoutes = require('./contactRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/company', companyRoutes);
router.use('/contacts', contactRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/project', projectRoutes);

module.exports = router;
