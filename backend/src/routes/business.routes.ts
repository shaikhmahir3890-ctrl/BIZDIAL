import express from 'express';
import {
  getBusinesses,
  getBusiness,
  getNearbyBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from '../controllers/business.controller';
import { protect, authorize } from '../middleware/auth.middleware';

import reviewRouter from './review.routes';

const router = express.Router();

// Re-route into other resource routers
router.use('/:businessId/reviews', reviewRouter);

router.get('/nearby', getNearbyBusinesses);

router
  .route('/')
  .get(getBusinesses)
  .post(protect, authorize('business_owner', 'admin'), createBusiness);

router
  .route('/:id')
  .get(getBusiness)
  .put(protect, authorize('business_owner', 'admin'), updateBusiness)
  .delete(protect, authorize('business_owner', 'admin'), deleteBusiness);

export default router;
