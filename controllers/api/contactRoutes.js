const router = require('express').Router();
const { Contact } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newContact = await Contact.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newContact);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const contactData = await Contact.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!contactData) {
      res.status(404).json({ message: 'No Client found with this id!' });
      return;
    }

    res.status(200).json(contactData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
