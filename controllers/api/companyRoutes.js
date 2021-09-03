const router = require("express").Router();
const { Company, Contact, Project, Invoice, Item, Address } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all companies
router.get('/', (req, res) => {
  console.log('======================');
  Company.findAll({
    attributes: [
      'id',
      'name',
      'user_id',
    ],
    order: [
      ['name', 'asc']
    ],
    include: {
      model: Address,
      attributes: [
        'address_1',
        'address_2',
        'city',
        'state',
        'zip_code',
      ]
    },
    include: [{
      model: Project,
      attributes: [
        'title',
        'type',
        'price',
        'due_date',

      ],
      include: {
        model: Invoice,
        attributes: [
          'name',
          'is_paid',

        ],
        include: {
          model: Item,
          attributes: [
            'description',
            'units',
            'unit_price',

          ]
        },
      },
    },
    {
      model: Contact,
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'company_id'
      ],

    }
    ]
  })
    .then(postData => res.json(postData.reverse()))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});
// Get one company
router.get('/:id', (req, res) => {
  Company.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'user_id',
    ],
    order: [
      ['name', 'asc']
    ],
    include: {
      model: Address,
      attributes: [
        'address_1',
        'address_2',
        'city',
        'state',
        'zip_code',
      ]
    },
    include: [{
      model: Project,
      attributes: [
        'title',
        'type',
        'price',
        'due_date',

      ],
      include: {
        model: Invoice,
        attributes: [
          'name',
          'is_paid',

        ],
        include: {
          model: Item,
          attributes: [
            'description',
            'units',
            'unit_price',

          ]
        },
      },
    },
    {
      model: Contact,
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'company_id'
      ],

    }
    ]
  })
    .then(companyData => {
      if (!companyData) {
        res.status(404).json({ message: 'No company found with this id' });
        return;
      }
      res.json(companyData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

//  Add Company route
router.post("/", withAuth, async (req, res) => {
  const company = await Company.create({
    user_id: req.session.user_id,
    include: [
      {
        model: Contact,
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          'company_id'
        ],
      },
      {
        model: Address,
        attributes: [
          "id",
          'address_1',
          'address_2',
          'city',
          'state',
          'zip_code',
        ],

      },
    ]
  });

  company.name = req.body.companyName;
  company.contact.name = req.body.contactName;
  company.contact.email = req.body.contactEmail;
  company.contact.phone = req.body.contactPhone;
  company.address.address_1 = req.body.address1;
  company.address.address_2 = req.body.address2;
  company.address.city = req.body.city;
  company.address.state = req.body.state;
  company.address.zip_code = req.body.zipCode;

  console.log(company)
  await company.save()
  await company.contact.save()
  await company.address.save()



  res.status(200).json(company);



});
// Update Company Route
router.put('/:id', withAuth, async (req, res) => {
  let company = await Company.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'name',
      'user_id',
    ],
    include: [
      {
        model: Contact,
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          'company_id'
        ],
      },
      {
        model: Address,
        attributes: [
          "id",
          'address_1',
          'address_2',
          'city',
          'state',
          'zip_code',
        ],

      },
    ]
  })

  company.name = req.body.companyName;
  company.contact.name = req.body.contactName;
  company.contact.email = req.body.contactEmail;
  company.contact.phone = req.body.contactPhone;
  company.address.address_1 = req.body.address1;
  company.address.address_2 = req.body.address2;
  company.address.city = req.body.city;
  company.address.state = req.body.state;
  company.address.zip_code = req.body.zipCode;

  console.log(company)
  await company.save()
  await company.contact.save()
  await company.address.save()
  res.json(company)

});
//  Delete Company Route
router.delete('/:id', withAuth, (req, res) => {
  Company.destroy({
    where: {
      id: req.params.id
    },

  }

  ).then(companyData => {
    if (!companyData) {
      res.status(404).json({ message: 'No company found with this id' });
      return;
    }
    res.json(companyData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



module.exports = router;
