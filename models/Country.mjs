import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 90 },
    capital: [{ type: String, minlength: 3, maxlength: 90 }],
    borders: [{ type: String, match: /^[A-Z]{3}$/ }],
    area: { type: Number, min: 0 },
    population: { type: Number, min: 0 },
    gini: { type: Number, min: 0, max: 100 },
    timezones: [{ type: String }],
    creador: { type: String, required: true }
}, { collection: 'countries' });

export default mongoose.model('Country', countrySchema);
