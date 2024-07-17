const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
    Service: { type: String, required: true, trim: true },
    Category: { type: String, required: true, trim: true },
    Price: { type: Number, required: true, min: 0 }, // Assuming Price is a numeric value
    Duration: { type: String, trim: true }, // Optional field
    Gender: { type: String, enum: ['Male', 'Female', 'Other'] } // Assuming Gender should be one of these values
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
