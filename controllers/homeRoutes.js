const sequelize = require("../config/connection");
const { User, Company, Contact, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();



const fs = require('fs')




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
router.get('/logout', (req, res) => {


  res.render('logout', {
    title: "Logout",
  });
});


// ! FRONT END ROUTES


// Node Mailer
router.post('/send', (req, res) => {


  // EMAIL TEMPLATE
  const output = `
                 ${req.body.html}
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodemailer_USER,
      pass: process.env.nodemailer_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: output,


  };

  console.log(req.body)

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log("Email has been sent!")
      res.send('Email has been sent!"')
    }
  })

}
)




module.exports = router;
