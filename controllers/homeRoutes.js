const sequelize = require("../config/connection");
const { User, Company, Contact, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');
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


// ! FRONT END ROUTES




router.post('/send', (req, res) => {
  console.log(req.body)

  // const output = `
  // <p>This is the invoice template literal</p>
  //     
  // `;
  // create reusable transporter object using the default SMTP transport
  // GMAIL
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
  //  SMTP
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.office365.com",
  //   port: 587,
  //   auth: {
  //     user: process.env.nodemailer_USER,
  //     pass: process.env.nodemailer_PASSWORD
  //   },
  //   tls: {
  //     rejectUnauthorized: false
  //   }
  // });

  // const mailOptions = {
  //   from: "andrewkeiser@gmail.com",
  //   to: "webdev410@gmail.com",
  //   subject: "subject test",
  //   text: "message body here",
  //   html: output
  // };

  const mailOptions = {
    to: req.body.to,
    from: req.body.from,
    subject: `New Invoice from ${req.body.email}: ${req.body.subject}`,
    text: req.body.text,

  };

  // console.log(req.body)

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
