const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true }, // e.g., 'income' or 'expense'
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose
