import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 90,
        match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\']+$/, 'Nombre inválido: no se permiten números ni símbolos extraños.']
    },
    capital: [{ 
        type: String, 
        minlength: 3, 
        maxlength: 90,
        match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\']+$/, 'Capital inválida: no se permiten números.']
    }],
    borders: [{ 
        type: String, 
        match: [/^[A-Z]{3}$/, 'Frontera inválida: requiere formato de 3 letras mayúsculas.']
    }],
    area: { type: Number, min: 0 },
    population: { type: Number, min: 0 },
    gini: { type: Number, min: 0, max: 100 },
    timezones: [{ 
        type: String,
        match: [/^UTC([+-](0[0-9]|1[0-4]):[0-5][0-9])?$/, 'Zona horaria inválida. Formato esperado: UTC±XX:XX']
    }],
    creador: { 
        type: String, 
        required: true,
        match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Creador inválido: solo se permiten letras.']
    }
}, { collection: 'countries' });

export default mongoose.model('Country', countrySchema);