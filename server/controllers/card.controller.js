const cardModel = require('../models/card.model');
const Card = cardModel.Card;

const getAllCards = async (req, res) => {
    try {
        const cardData = await Card.find();
        res.status(200).json(cardData);
    } catch (err) {
        console.error('Error fetching card data:', err);
        res.status(500).json({ message: "Error in getting card data", error: err.message });
    }
}

const addCardData = async (req, res) => {
    try {
        const cardData = new Card(req.body);
        await cardData.save(); 
        res.status(201).json(cardData);
    } catch (err) {
        console.error('Error adding card:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: err.message });
        }
        res.status(500).json({ message: 'Error in adding card', error: err.message });
    }
}

const cardByTitle = async (req, res) => {
    try {
        const card = await Card.findOne({ title: req.params.title });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        console.error('Error retrieving card by title:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { getAllCards, addCardData, cardByTitle };
