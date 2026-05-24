import { body } from 'express-validator';

export const countryValidationRules = [
    body('name').trim().isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.'),
    
    // Tratamiento de Arrays que vienen como string separados por coma
    body('capital')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => s.length >= 3 && s.length <= 90))
        .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),
        
    body('borders')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim().toUpperCase()).filter(s => s) : [])
        .custom(arr => arr.length === 0 || arr.every(s => /^[A-Z]{3}$/.test(s)))
        .withMessage('Las fronteras deben ser codigos de 3 letras mayusculas (ej: ARG, CHL).'),
        
    body('timezones')
        .customSanitizer(value => value ? value.split(',').map(s => s.trim()).filter(s => s) : []),
        
    body('area').isFloat({ min: 0 }).withMessage('El area debe ser un numero positivo.'),
    body('population').isInt({ min: 0 }).withMessage('La poblacion debe ser un numero entero positivo.'),
    
    body('gini')
        .optional({ checkFalsy: true })
        .isFloat({ min: 0, max: 100 }).withMessage('El indice Gini debe estar entre 0 y 100.')
];
