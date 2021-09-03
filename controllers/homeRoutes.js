const sequelize = require("../config/connection");
const { User, Company, Contact, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const companyData = await Company.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    const companies = companyData.map((company) => company.get({ plain: true }));
    console.log(companies)
    res.render('homepage', {
      companies,
      logged_in: req.session.logged_in,
      title: "Home"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    title: "Login"
  });
});
// ! FRONT END ROUTES








module.exports = router;
