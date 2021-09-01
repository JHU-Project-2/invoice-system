const router = require("express").Router();
const { Company, Contact } = require("../../models");
const withAuth = require("../../utils/auth");


router.post("/", withAuth, async (req, res) => {
  try {
    const newCompany = await Company.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCompany);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete("/:id", withAuth, async (req, res) => {
  try {
    const companyData = await Company.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!companyData) {
      res.status(404).json({ message: "No Client found with this id!" });
      return;
    }

    res.status(200).json(companyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
