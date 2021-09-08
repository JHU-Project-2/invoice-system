// connects to sequelize and the models
const sequelize = require("../config/connection");
const { User, Company, Contact, Sent, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
require('dotenv').config();
// these are the front end routes for the user interface
// main home route
router.get('/', async (req, res) => {
  try {
    // Get all compainies and bring in the data so its avaiable to the home-page
    const companyData = await Company.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    // taking all of the company data and sanitizing the data
    const companies = companyData.map((company) => company.get({ plain: true }));
    console.log(companies)
    // render the homepage handlebars
    res.render('homepage', {
      // pass in the sanitized data as compainies
      companies,      
      logged_in: req.session.logged_in,
      title: "Home"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// for the route /login (if they are logged-in send the user to the dashboard otherwise make them log-in)
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
// rendering our logout screen when the user loggs out
router.get('/logout', (req, res) => {
  res.render('logout', {
    title: "Logout",
  });
});
// route for /signup (rendering the singup page) 
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
// route for /profile
router.get('/profile', async (req, res) => {
  try {
    // This line of code only pulls data for the user that is logged-in
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
// route for sent invoices
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
