const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    period: { type: String, required: true, enum: ['weekly', 'monthly', 'yearly'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
    // You can add fields for notifications or other features
});

module.exports = mongoose.model('Budget', BudgetSchema);
