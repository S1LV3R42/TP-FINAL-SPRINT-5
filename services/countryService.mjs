import axios from 'axios';
import Country from '../models/Country.mjs';

export const seedCountriesFromAPI = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/region/america');
        
        // Filtrar por idioma español
        const spanishCountries = response.data.filter(c => c.languages && c.languages.spa);

        const cleanedData = spanishCountries.map(c => {
            // Normalizar Gini (tomar el ultimo año disponible)
            let giniValue = null;
            if (c.gini) {
                const years = Object.keys(c.gini);
                if (years.length > 0) {
                    const lastYear = years[years.length - 1];
                    giniValue = c.gini[lastYear];
                }
            }

            return {
                name: c.name.nativeName?.spa?.official || c.name.official,
                capital: c.capital || [],
                borders: c.borders || [],
                area: c.area || 0,
                population: c.population || 0,
                gini: giniValue,
                timezones: c.timezones || [],
                creador: "Valdez Pablo Gabriel"
            };
        });

        await Country.deleteMany({});
        await Country.insertMany(cleanedData);
        return { success: true, count: cleanedData.length };
    } catch (error) {
        throw new Error('Error procesando la API: ' + error.message);
    }
};

export const getAllCountries = async (searchQuery = '') => {
    let filter = {};
    if (searchQuery) {
        filter = { name: { $regex: searchQuery, $options: 'i' } };
    }
    return await Country.find(filter).sort({ name: 1 });
};

export const getCountryById = async (id) => await Country.findById(id);

export const createCountry = async (data) => {
    // El campo creador debe venir del body y ser validado
    const newCountry = new Country({ ...data });
    return await newCountry.save();
};

export const getCountryByName = async (name) => {
    return await Country.findOne({ name });
};

export const updateCountry = async (id, data) => {
    return await Country.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteCountry = async (id) => await Country.findByIdAndDelete(id);

// Calculos de Totales y Gini
export const calculateTotals = (countries) => {
    let totalPopulation = 0;
    let totalArea = 0;
    let giniSum = 0;
    let giniCount = 0;

    countries.forEach(c => {
        totalPopulation += c.population || 0;
        totalArea += c.area || 0;
        if (c.gini != null) {
            giniSum += c.gini;
            giniCount++;
        }
    });

    return {
        population: totalPopulation,
        area: totalArea,
        avgGini: giniCount > 0 ? (giniSum / giniCount).toFixed(2) : 'N/A'
    };
};
