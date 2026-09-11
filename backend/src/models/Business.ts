import mongoose, { Document, Model } from 'mongoose';

export interface ILocation {
  type: 'Point';
  coordinates: number[]; // [longitude, latitude]
}

export interface IBusiness extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  subcategory?: string;
  phone: string;
  email?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: ILocation;
  images: string[];
  openingHours?: any;
  isVerified: boolean;
  owner: mongoose.Types.ObjectId;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a business name'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
    },
    pincode: {
      type: String,
      required: [true, 'Please add a pincode'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: {
      type: [String],
      default: [],
    },
    openingHours: {
      type: mongoose.Schema.Types.Mixed,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create geospatial index for location
businessSchema.index({ location: '2dsphere' });

// Create text index for search
businessSchema.index({ name: 'text', description: 'text', city: 'text' });

export const Business: Model<IBusiness> = mongoose.models.Business || mongoose.model<IBusiness>('Business', businessSchema);
export default Business;
