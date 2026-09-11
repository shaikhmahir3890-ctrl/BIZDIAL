import mongoose, { Document, Model } from 'mongoose';

export interface IReview extends Document {
  business: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Please add a comment'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per business
reviewSchema.index({ business: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (businessId) {
  const obj = await this.aggregate([
    {
      $match: { business: businessId },
    },
    {
      $group: {
        _id: '$business',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await mongoose.model('Business').findByIdAndUpdate(businessId, {
        rating: Math.round(obj[0].averageRating * 10) / 10,
        reviewCount: obj[0].reviewCount,
      });
    } else {
      await mongoose.model('Business').findByIdAndUpdate(businessId, {
        rating: 0,
        reviewCount: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
  (this.constructor as any).getAverageRating(this.business);
});

// Call getAverageRating after remove
reviewSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    // Add it to query object to access it in post hook
    (this as any)._docToRemove = doc;
  }
  next();
});

reviewSchema.post('findOneAndDelete', async function () {
  const doc = (this as any)._docToRemove;
  if (doc) {
    await (doc.constructor as any).getAverageRating(doc.business);
  }
});

export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
export default Review;
