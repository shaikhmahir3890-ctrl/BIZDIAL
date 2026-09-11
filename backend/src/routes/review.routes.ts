import express from 'express';
import {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller';
import { protect, authorize } from '../middleware/auth.middleware';

// Note: This router handles both /api/reviews and /api/businesses/:businessId/reviews
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviews)
  .post(protect, addReview);

router
  .route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
