const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinancialGoalSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true, default: 0 },
    deadline: { type: Date, required: true },
    isCompleted: { type: Boolean, required: true, default: false }
    // Additional fields can be added to track progress or updates
});

module.exports = mongoose.model('FinancialGoal', FinancialGoalSchema);
