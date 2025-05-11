import { Router } from 'express';
import apiController from '../controller/apiController';

const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);
router.route('/createProduct').get(apiController.createProduct);
router.route('/getAllProducts').get(apiController.getAllProducts);

export default router