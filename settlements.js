// routes/settlements.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get current balances
router.get('/balances', async (req, res) => {
    try {
        const expenses = await Expense.find();
        const balances = {};

        expenses.forEach(expense => {
            const share = expense.amount / expense.participants.length;
            balances[expense.paid_by] = (balances[expense.paid_by] || 0) + expense.amount;
            expense.participants.forEach(participant => {
                balances[participant] = (balances[participant] || 0) - share;
            });
        });

        res.status(200).json({ success: true, data: balances });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get settlement summary
router.get('/', async (req, res) => {
    try {
        const balances = await router.get('/balances');
        // Simplify settlements logic can be added here
        res.status(200).json({ success: true, data: balances });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;