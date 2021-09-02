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
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const companyData = await Company.findAll({
      include: [
        {
          model: Address,
          attributes: [
            "id",
            "address_1",
            "address_2",
            "city",
            "state",
            "zip_code"
          ],
        },
        {
          model: Contact,
          attributes: [
            "id",
            "name",
            "email",
            "phone"
          ],

        }
      ],
      order: [
        ['name', 'ASC']
      ],

    });

    // Serialize data so the template can read it
    const companies = companyData.map((company) => company.get({ plain: true }));
    console.log(companies)
    // Pass serialized data and session flag into template
    res.render('dashboard', {
      companies,
      logged_in: req.session.logged_in,
      title: "Dashboard"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/company/:id", (req, res) => {
  Company.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name"
    ],
    include: [
      {
        model: Address,
        attributes: [
          "id",
          "address_1",
          "address_2",
          "city",
          "state",
          "zip_code"
        ],
      },
      {
        model: Contact,
        attributes: [
          "id",
          "name",
          "email",
          "phone"
        ],
      },
      {
        model: Project,
        attributes: [
          "id",
          "title",
          "type",
          "price",
          "due_date",

        ],
        include: {
          model: Invoice,
          attributes: [
            "id",
            "name"
          ]
        }

      }
    ],

  })
    .then((companyData) => {
      if (!companyData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const company = companyData.get({ plain: true });
      console.log(company);
      res.render("company", {
        company,
        logged_in: req.session.logged_in,
        username: req.session.username,
        title: "Company",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/add-company', withAuth, async (req, res) => {
  try {
    // Get all companies and JOIN with address and contact data
    const companyData = await Company.findAll({
      include: [
        {
          model: Address,
          attributes: [
            "id",
            "address_1",
            "address_2",
            "city",
            "state",
            "zip_code"
          ],
        },
        {
          model: Contact,
          attributes: [
            "id",
            "name",
            "email",
            "phone"
          ],
        }
      ],
    });

    // Serialize data so the template can read it
    const companies = companyData.map((company) => company.get({ plain: true }));
    console.log(companies)
    // Pass serialized data and session flag into template
    res.render('add-company', {
      companies,
      logged_in: req.session.logged_in,
      title: "Add Company"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project/:id", (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "type",
      "price",
      "due_date",
    ],
    include: [
      {
        model: Invoice,
        attributes: [
          "id",
          "name",
        ],
      },
    ],

  })
    .then((projectData) => {
      if (!projectData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const project = projectData.get({ plain: true });
      console.log(project);
      res.render("project-details", {
        project,
        logged_in: req.session.logged_in,
        username: req.session.username,
        title: "Project Details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//! working but cannot get project data this way
router.get("/invoice/:id", (req, res) => {
  Invoice.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
    ],
    include: [
      {
        model: Item,
        attributes:
          [
            "description",
            "units",
            "unit_price",
          ]
      }
    ],

  })
    .then((invoiceData) => {
      if (!invoiceData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const invoice = invoiceData.get({ plain: true });
      console.log(invoice);
      res.render("invoice-details", {
        invoice,
        logged_in: req.session.logged_in,
        username: req.session.username,
        title: "Invoice Details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});






module.exports = router;
