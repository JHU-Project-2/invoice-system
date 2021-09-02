const router = require("express").Router();
const sequelize = require("../config/connection");
const { Company, User, Address, Contact, Invoice, Item } = require("../models");
const withAuth = require("../utils/auth");

// Edit Company Route
router.get("/edit/:id", withAuth, (req, res) => {
    Company.findOne({
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
                    'address_1',
                    'address_2',
                    'city',
                    'state',
                    'zip_code',
                ],

            },
        ],
    })
        .then((companyData) => {
            if (!companyData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }

            const company = companyData.get({ plain: true });
            res.render("edit-company", {
                company,
                username: req.session.username,
                logged_in: true,
                title: "Edit Company",
            });
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
