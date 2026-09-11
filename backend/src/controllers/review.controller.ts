import { Request, Response } from 'express';
import Review from '../models/Review';
import Business from '../models/Business';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get reviews for a business
// @route   GET /api/businesses/:businessId/reviews
// @access  Public
export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const reviews = await Review.find({ business: req.params.businessId }).populate('user', 'name avatar');

  res.json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

// @desc    Add review
// @route   POST /api/businesses/:businessId/reviews
// @access  Private
export const addReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  req.body.business = req.params.businessId;
  req.body.user = req.user?._id;

  const business = await Business.findById(req.params.businessId);

  if (!business) {
    res.status(404);
    throw new Error('Business not found');
  }

  // Ensure user hasn't already reviewed this business
  const existingReview = await Review.findOne({
    business: req.params.businessId,
    user: req.user?._id,
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this business');
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    data: review,
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update review');
  }

  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;

  await review.save();

  res.json({
    success: true,
    message: 'Review updated successfully',
    data: review,
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete review');
  }

  await review.deleteOne();

  res.json({
    success: true,
    message: 'Review deleted successfully',
  });
});
