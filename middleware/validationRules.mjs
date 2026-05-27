import { body } from 'express-validator';
import Country from '../models/Country.mjs'; // Solución al error "Country is not defined"

export const countryValidationRules = [ 
    // Validación de nombre (name)
    body('name')
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage('El nombre solo debe contener letras y espacios.')
        .custom(async (value, { req }) => {
            // Se verifica la unicidad, ignorando el propio país si se está editando
            const country = await Country.findOne({ name: value });
            if (country && country._id.toString() !== req.params.id) {
                throw new Error('El país ya existe.');
            }
            return true;
        }),

    // Tratamiento de Arrays que vienen como string separados por coma
    body('capital')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => s.length >= 3 && s.length <= 90))
        .withMessage('Cada capital debe tener entre 3 y 90 caracteres.')
        .custom(arr => arr.length === 0 || arr.every(s => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(s)))
        .withMessage('El nombre de la capital solo debe contener letras y espacios.')
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber capitales duplicadas.'),

    body('borders')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim().toUpperCase()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => /^[A-Z]{3}$/.test(s)))
        .withMessage('Las fronteras deben ser codigos de 3 letras mayusculas (ej: ARG, CHL).')
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber fronteras duplicadas.'),

    body('timezones')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber zonas horarias duplicadas.'),

    body('area').isFloat({ min: 0 }).withMessage('El area debe ser un numero positivo.'),
    body('population').isInt({ min: 0 }).withMessage('La poblacion debe ser un numero entero positivo.'),

    body('gini')
        .optional({ checkFalsy: true })
        .isFloat({ min: 0, max: 100 }).withMessage('El indice Gini debe estar entre 0 y 100.'),

    // Validación de creador requerido
    body('creador')
        .trim()
        .notEmpty().withMessage('El campo creador es obligatorio.')
];