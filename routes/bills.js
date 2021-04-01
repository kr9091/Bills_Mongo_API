const express = require('express');
const bill = require('../models/bill.js');
const router = express.Router();
const Bill = require('../models/bill.js');

//  GET ALL BILLS
router.get('/', async (req, res) => {
    try {
        const bills = await bill.find();
        res.json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ONE BILL
router.get('/:id', async (req, res) => {
    try {
        const singleBill = await bill.findOne({ _id: req.params.id });
        res.send(singleBill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE NEW BILL
router.post('/', async (req, res) => {
    const bill = new Bill({
        name: req.body.name,
        cost: req.body.cost,
        dueDate: req.body.dueDate,
        category: req.body.category,
        paid: req.body.paid,
    });

    try {
        const newBill = await bill.save();
        res.status(201).json(newBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE BILL
router.put('/:id', async (req, res) => {
    let updates = req.body;

    bill.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
        .then((updatedBill) => res.json(updatedBill))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// DELETE BILL
router.delete('/:id', (req, res) => {
    bill.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bill Deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
