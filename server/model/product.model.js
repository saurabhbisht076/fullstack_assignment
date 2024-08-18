const mongoose = require('mongoose');

// Define the schema for a card
const cardSchema = new mongoose.Schema({
    id: {
        type: Object.id,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Create the model from the schema
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
