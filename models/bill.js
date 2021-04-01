const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cost: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            default: new Date(),
            required: true,
        },
        category: {
            type: String,
            default: 'No Category',
            required: true,
        },
        paid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model('Bill', billSchema);
