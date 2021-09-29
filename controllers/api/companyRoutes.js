const router = require("express").Router();
const {
	Company,
	Contact,
	Project,
	Invoice,
	Item,
	Address,
} = require("../../models");
const withAuth = require("../../utils/auth");

// Get all companies
router.get("/", (req, res) => {
	console.log("======================");
	// finds all companies and includes all associated information with the companies
	// address, project, invoice, invoice items
	Company.findAll({
		attributes: ["id", "name", "user_id"],
		order: [["name", "asc"]],
		include: {
			model: Address,
			attributes: ["address_1", "address_2", "city", "state", "zip_code"],
		},
		include: [
			{
				model: Project,
				attributes: ["title", "type", "price", "due_date"],
				include: {
					model: Invoice,
					attributes: ["name", "is_paid"],
					include: {
						model: Item,
						attributes: [
							"id",
							"description",
							"units",
							"unit_price",
						],
					},
				},
			},
			{
				model: Contact,
				attributes: ["id", "name", "email", "phone", "company_id"],
			},
		],
	})
		// after finding the database information, create a json with the data
		.then((postData) => res.json(postData.reverse()))
		// if there's an error, catch the error and return the json of the error
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
// Get one company
router.get("/:id", (req, res) => {
	// find one company where the ID = the ID of the selected company (via req.params)
	Company.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "name", "user_id"],
		order: [["name", "asc"]],
		include: {
			model: Address,
			attributes: ["address_1", "address_2", "city", "state", "zip_code"],
		},
		// include Project, invoice and items for that company
		include: [
			{
				model: Project,
				attributes: ["title", "type", "price", "due_date"],
				include: {
					model: Invoice,
					attributes: ["name", "is_paid"],
					include: {
						model: Item,
						attributes: [
							"id",
							"description",
							"units",
							"unit_price",
						],
					},
				},
			},
			// also include the contact for the company
			{
				model: Contact,
				attributes: ["id", "name", "email", "phone", "company_id"],
			},
		],
	})
		// then take that data, and store in "companyData" variable
		.then((companyData) => {
			// if there is no company data, return an error
			if (!companyData) {
				res.status(404).json({
					message: "No company found with this id",
				});
				return;
			}
			// otherwise, return the company data in JSON format
			res.json(companyData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//  Add Company route
router.post("/", withAuth, async (req, res) => {
	console.log("req.session", req.session.user_id);

	const company = await Company.create({
		// take the req.body info and assign it to the database
		name: req.body.companyName,
		// companies user id = user that is signed in
		user_id: req.session.user_id,

		include: [
			{
				model: Contact,
				attributes: ["id", "name", "email", "phone", "company_id"],
			},
			{
				model: Address,
				attributes: [
					"id",
					"address_1",
					"address_2",
					"city",
					"state",
					"zip_code",
				],
			},
		],
	});

	const contact = await Contact.create({
		name: req.body.contactName,
		email: req.body.contactEmail,
		phone: req.body.contactPhone,
		company_id: company.id,
	});
	const address = await Address.create({
		address_1: req.body.address1,
		address_2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		zip_code: req.body.zipCode,
		company_id: company.id,
	});

	console.log(company);
	await company.save();
	await contact.save();
	await address.save();

	res.status(200).json(company);
});
// Update Company Route
router.put("/:id", withAuth, async (req, res) => {
	let company = await Company.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "name", "user_id"],
		include: [
			{
				model: Contact,
				attributes: ["id", "name", "email", "phone", "company_id"],
			},
			{
				model: Address,
				attributes: [
					"id",
					"address_1",
					"address_2",
					"city",
					"state",
					"zip_code",
				],
			},
		],
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

	console.log(company);
	await company.save();
	await company.contact.save();
	await company.address.save();
	res.json(company);
});
//  Delete Company Route
router.delete("/:id", withAuth, (req, res) => {
	Company.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((companyData) => {
			if (!companyData) {
				res.status(404).json({
					message: "No company found with this id",
				});
				return;
			}
			res.json(companyData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
