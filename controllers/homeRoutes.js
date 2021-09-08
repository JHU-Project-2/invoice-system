const sequelize = require("../config/connection");
const { User, Company, Contact, Sent, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
require('dotenv').config();


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
router.get('/logout', (req, res) => {
  res.render('logout', {
    title: "Logout",
  });
});
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', {
    title: "Sign Up"
  });
});

router.get('/profile', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      where: {
        id: req.session.user_id,
      },

    });

    const user = userData.map((user) => user.get({ plain: true }));
    console.log(user)
    res.render('edit-profile', {
      user,
      logged_in: req.session.logged_in,
      title: "Edit Profile"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/sent-invoices', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const sentData = await Sent.findAll({
    });


    const sent = sentData.map((sent) => sent.get({ plain: true }));

    console.log(sent)
    res.render('sent-invoices', {
      sent,
      logged_in: req.session.logged_in,
      title: "Sent Invoices"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
