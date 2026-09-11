import { Request, Response } from 'express';
import Business from '../models/Business';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get all businesses
// @route   GET /api/businesses
// @access  Public
export const getBusinesses = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;
  const startIndex = (page - 1) * limit;

  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  let queryObj = JSON.parse(queryStr);

  // Exclude specific fields from direct match
  const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'category'];
  removeFields.forEach((param) => delete queryObj[param]);

  // Handle specific query: category (could be a slug or id, here assuming category is passed as string slug/name but we can adjust to match the reference)
  if (req.query.category) {
    // If it's a category slug, we'd need to lookup the category ID first, or just assume the frontend passes category ID
    queryObj.category = req.query.category;
  }

  let query = Business.find(queryObj);

  // Handle Search
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search as string, 'i');
    query = query.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { city: searchRegex },
        { address: searchRegex }
      ]
    });
  }

  // Handle Sort
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    // Handle custom sorts like "newest", "rating"
    if (sortBy === 'newest') {
      query = query.sort('-createdAt');
    } else if (sortBy === 'rating') {
      query = query.sort('-rating');
    } else {
      query = query.sort(sortBy);
    }
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  query = query.skip(startIndex).limit(limit).populate('category', 'name slug');

  const businesses = await query;
  
  // Create pagination object
  // Since we modified queryObj for search, we need to count based on the modified query
  const countQuery = Business.find(queryObj);
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search as string, 'i');
    countQuery.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { city: searchRegex },
        { address: searchRegex }
      ]
    });
  }
  
  const total = await countQuery.countDocuments();
  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    message: 'Businesses fetched successfully',
    data: businesses,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
});

// @desc    Get single business
// @route   GET /api/businesses/:id
// @access  Public
export const getBusiness = asyncHandler(async (req: Request, res: Response) => {
  const business = await Business.findById(req.params.id).populate('category', 'name slug');

  if (!business) {
    res.status(404);
    throw new Error('Business not found');
  }

  res.json({
    success: true,
    data: business,
  });
});

// @desc    Get businesses within a radius
// @route   GET /api/businesses/nearby?lat=...&lng=...&radius=...
// @access  Public
export const getNearbyBusinesses = asyncHandler(async (req: Request, res: Response) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    res.status(400);
    throw new Error('Please provide lat, lng and radius');
  }

  const radiusInMeters = parseInt(radius as string, 10);

  const businesses = await Business.find({
    location: {
      $near: {
        $maxDistance: radiusInMeters,
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng as string), parseFloat(lat as string)],
        },
      },
    },
  });

  res.json({
    success: true,
    message: 'Nearby businesses fetched successfully',
    count: businesses.length,
    data: businesses,
  });
});

// @desc    Create new business
// @route   POST /api/businesses
// @access  Private (Business Owner / Admin)
export const createBusiness = asyncHandler(async (req: AuthRequest, res: Response) => {
  // Add user to req.body
  req.body.owner = req.user?._id;

  const business = await Business.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Business created successfully',
    data: business,
  });
});

// @desc    Update business
// @route   PUT /api/businesses/:id
// @access  Private
export const updateBusiness = asyncHandler(async (req: AuthRequest, res: Response) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    res.status(404);
    throw new Error('Business not found');
  }

  // Make sure user is business owner or admin
  if (business.owner.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
    res.status(403);
    throw new Error(`User ${req.user?._id} is not authorized to update this business`);
  }

  business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: 'Business updated successfully',
    data: business,
  });
});

// @desc    Delete business
// @route   DELETE /api/businesses/:id
// @access  Private
export const deleteBusiness = asyncHandler(async (req: AuthRequest, res: Response) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    res.status(404);
    throw new Error('Business not found');
  }

  // Make sure user is business owner or admin
  if (business.owner.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
    res.status(403);
    throw new Error(`User ${req.user?._id} is not authorized to delete this business`);
  }

  await business.deleteOne();

  res.json({
    success: true,
    message: 'Business removed successfully',
  });
});
