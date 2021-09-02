const router = require('express').Router();
const { Project, Invoice, Item } = require('../../models');

// GET all projects
//! Not working
router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            // Add Item as a second model to JOIN with
            include: [{ model: Invoice }, { model: Item }],
        });
        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single project
//! Not working
router.get('/:id', async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
            // Add Item as a second model to JOIN with
            include: [{ model: Invoice }, { model: Item }],
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with that id!' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a Project
router.post('/', async (req, res) => {
    try {
        const projectData = await Project.create(req.body);
        res.status(200).json(projectData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a Project
router.delete('/:id', async (req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with that id!' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
