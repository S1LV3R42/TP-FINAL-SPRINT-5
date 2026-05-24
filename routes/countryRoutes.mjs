import { Router } from 'express';
import * as controller from '../controllers/countryController.mjs';
import { countryValidationRules } from '../middleware/validationRules.mjs';

const router = Router();

router.get('/seed', controller.seedDatabase);
router.get('/', controller.renderDashboard);
router.get('/nuevo', controller.renderCreateForm);
router.post('/', countryValidationRules, controller.createCountry);
router.get('/:id/editar', controller.renderEditForm);
router.put('/:id', countryValidationRules, controller.updateCountry);
router.delete('/:id', controller.deleteCountry);

export default router;
