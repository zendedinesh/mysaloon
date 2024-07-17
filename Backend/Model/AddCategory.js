const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryDescription: { type: String, required: true },
    appointmentColor: { type: String, required: true },
    imageUrl: { type: String } 
});

module.exports = mongoose.model('Category', CategorySchema);
