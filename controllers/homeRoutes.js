const sequelize = require("../config/connection");
const { User, Company, Contact, Address, Project, Invoice, Item } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');


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
  const output = `
  <p>This is the invoice template literal</p>
      
  `;
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: 'arpadinvoices@gmail.com',
      pass: 'jhubootcamp1!'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: "andrewkeiser@gmail.com",
    to: "webdev410@gmail.com",
    subject: "subject test",
    text: "message body here",
    html: output
  };
  // var mailOptions = {
  //   from: "andrewkeiser@gmail.com",
  //   to: `${req.body.recipientEmail}`,
  //   subject: "subject test",
  //   text: "message body here",
  //   html: output
  // };

  // console.log(req.body)

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err)
    } else {
      console.log("Email has been sent!")
    }
  })

}
)




module.exports = router;
