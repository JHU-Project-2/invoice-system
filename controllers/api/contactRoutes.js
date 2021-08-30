const router = require('express').Router();
const { Client } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newClient = await Client.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newClient);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const clientData = await Client.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!clientData) {
      res.status(404).json({ message: 'No Client found with this id!' });
      return;
    }

    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
