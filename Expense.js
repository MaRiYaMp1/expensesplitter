// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    paid_by: { type: String, required: true },
    participants: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);