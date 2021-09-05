const router = require('express').Router();
const { Invoice, Item } = require('../../models');
const withAuth = require('../../utils/auth');
// CREATE an item
router.post('/', (req, res) => {
    Item.create({
        description: req.body.description,
        units: req.body.quantity,
        unit_price: req.body.ppu,
        invoice_id: req.body.invoice_id,

        user_id: req.session.user_id
    })
        .then(itemData => res.json(itemData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// DELETE an item
router.delete('/:id', async (req, res) => {
    try {
        const itemData = await Item.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!itemData) {
            res.status(404).json({ message: 'No item found with that id!' });
            return;
        }

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll({});
        console.log(itemData)
        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;