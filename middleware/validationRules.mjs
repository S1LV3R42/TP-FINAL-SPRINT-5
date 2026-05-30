import { body } from 'express-validator';
import Country from '../models/Country.mjs';

export const countryValidationRules = [ 
    // Validación de nombre (name)
    body('name')
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\']+$/)
        .withMessage('El nombre solo debe contener letras, espacios, guiones o apóstrofes (sin números).')
        .custom(async (value, { req }) => {
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
        .custom(arr => arr.length === 0 || arr.every(s => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\']+$/.test(s)))
        .withMessage('El nombre de la capital solo puede tener letras y separarse por comas.')
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber capitales duplicadas.'),

    body('borders')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim().toUpperCase()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => /^[A-Z]{3}$/.test(s)))
        .withMessage('Las fronteras deben ser códigos de 3 letras mayúsculas (ej: ARG, CHL).')
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber fronteras duplicadas.'),

    // Nuevo: Estandarización estricta de Zonas Horarias
    body('timezones')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim().toUpperCase()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => /^UTC([+-](0[0-9]|1[0-4]):[0-5][0-9])?$/.test(s)))
        .withMessage('Las zonas horarias deben tener el formato estándar (ej: UTC, UTC-03:00, UTC+14:00).')
        .custom(arr => arr.length === 0 || new Set(arr).size === arr.length)
        .withMessage('No puede haber zonas horarias duplicadas.'),

    body('area').isFloat({ min: 0 }).withMessage('El área debe ser un número positivo.'),
    body('population').isInt({ min: 0 }).withMessage('La población debe ser un número entero positivo.'),

    body('gini')
        .optional({ checkFalsy: true })
        .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100.'),

    // Nuevo: Evitar números en el nombre del creador
    body('creador')
        .trim()
        .notEmpty().withMessage('El campo creador es obligatorio.')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage('El nombre del creador solo debe contener letras y espacios.')
];