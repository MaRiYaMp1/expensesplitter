// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new expense
router.post('/', async (req, res) => {
    const { amount, description, paid_by, participants } = req.body;
    if (!amount || !description || !paid_by || !participants) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    try {
        const expense = new Expense({ amount, description, paid_by, participants });
        await expense.save();
        res.status(201).json({ success: true, data: expense, message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update expense
router.put('/:id', async (req, res) => {
    const { amount, description, paid_by, participants } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, { amount, description, paid_by, participants }, { new: true });
        if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
        res.status(200).json({ success: true, data: expense });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;