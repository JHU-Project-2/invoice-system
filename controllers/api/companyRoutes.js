const router = require("express").Router();
const { Company } = require("../../models");
const withAuth = require("../../utils/auth");


router.post("/", withAuth, async (req, res) => {
  try {
    const newCompany = await Company.create({
      name: req.body.name,
      user_id: req.session.user_id,

    });
    console.log(newCompany)
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
      res.status(404).json({ message: "No Company found with this id!" });
      return;
    }

    res.status(200).json(companyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
