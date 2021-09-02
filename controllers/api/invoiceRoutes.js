const router = require('express').Router();
const { Invoice, Item } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all invoices - working

router.get('/', async (req, res) => {
    try {
        const invoiceData = await Invoice.findAll({
            include: [{ model: Item }],
        });
        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single invoice - working
router.get('/:id', async (req, res) => {
    try {
        const invoiceData = await Invoice.findByPk(req.params.id, {
            include: [{ model: Item }],
        });

        if (!invoiceData) {
            res.status(404).json({ message: 'No invoice found with that id!' });
            return;
        }

        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// CREATE an invoice
router.post('/', async (req, res) => {
    try {
        const invoiceData = await Invoice.create({
            reader_id: req.body.reader_id,
        });
        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(400).json(err);
    }
});


// DELETE an invoice
router.delete('/:id', async (req, res) => {
    try {
        const invoiceData = await Invoice.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!invoiceData) {
            res.status(404).json({ message: 'No invoice found with that id!' });
            return;
        }

        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;