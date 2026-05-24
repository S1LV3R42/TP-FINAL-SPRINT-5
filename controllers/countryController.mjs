import { validationResult } from 'express-validator';
import * as countryService from '../services/countryService.mjs';

export const seedDatabase = async (req, res) => {
    try {
        await countryService.seedCountriesFromAPI();
        res.redirect('/paises?seed=success');
    } catch (error) {
        res.status(500).send('Error en el Seed: ' + error.message);
    }
};

export const renderDashboard = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const countries = await countryService.getAllCountries(searchQuery);
        const totals = countryService.calculateTotals(countries);
        res.render('dashboard', { countries, totals, searchQuery });
    } catch (error) {
        res.status(500).send('Error cargando el dashboard');
    }
};

export const renderCreateForm = (req, res) => {
    res.render('form', { country: {}, errors: [], title: 'Agregar Pais', action: '/paises' });
};

export const createCountry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('form', { 
            country: req.body, 
            errors: errors.array(), 
            title: 'Agregar Pais', 
            action: '/paises' 
        });
    }
    try {
        await countryService.createCountry(req.body);
        res.redirect('/paises');
    } catch (error) {
        res.status(500).send('Error guardando pais');
    }
};

export const renderEditForm = async (req, res) => {
    try {
        const country = await countryService.getCountryById(req.params.id);
        const formData = {
            ...country.toObject(),
            capital: country.capital.join(', '),
            borders: country.borders.join(', '),
            timezones: country.timezones.join(', ')
        };
        res.render('form', { country: formData, errors: [], title: 'Editar Pais', action: `/paises/${country._id}?_method=PUT` });
    } catch (error) {
        res.status(404).send('Pais no encontrado');
    }
};

export const updateCountry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('form', { 
            country: req.body, 
            errors: errors.array(), 
            title: 'Editar Pais', 
            action: `/paises/${req.params.id}?_method=PUT` 
        });
    }
    try {
        await countryService.updateCountry(req.params.id, req.body);
        res.redirect('/paises');
    } catch (error) {
        res.status(500).send('Error actualizando pais');
    }
};

export const deleteCountry = async (req, res) => {
    try {
        await countryService.deleteCountry(req.params.id);
        res.redirect('/paises');
    } catch (error) {
        res.status(500).send('Error eliminando pais');
    }
};
