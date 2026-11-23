const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'English menu item name is required'],
        trim: true,
        maxlength: 120,
      },
      mr: {
        type: String,
        trim: true,
        default: '',
        maxlength: 120,
      },
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuCategory',
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.Mixed, // string slug or ObjectId for frontend backwards compatibility
      index: true,
    },
    description: {
      en: { type: String, trim: true, default: '', maxlength: 1000 },
      mr: { type: String, trim: true, default: '', maxlength: 1000 },
    },
    ingredients: {
      en: [{ type: String, trim: true }],
      mr: [{ type: String, trim: true }],
    },
    image: {
      url: { type: String, trim: true, default: '' },
      publicId: { type: String, trim: true, default: '' },
      alt: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
      altText: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
    },
    price: {
      amount: {
        type: Number,
        min: [0, 'Price must be a positive number'],
        default: undefined,
      },
      currency: {
        type: String,
        default: 'INR',
        trim: true,
      },
      unit: {
        type: String,
        default: '',
        trim: true,
      },
    },
    dietaryType: {
      type: String,
      enum: ['vegetarian', 'non_vegetarian', 'vegan', 'unspecified', 'veg', 'non-veg', 'jain'],
      default: 'unspecified',
      index: true,
    },
    foodType: {
      type: String,
      enum: ['veg', 'non-veg', 'jain', 'unspecified'],
      default: 'veg',
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save synchronization hook
menuItemSchema.pre('save', function () {
  // Sync category and categoryId
  if (this.category && !this.categoryId) {
    this.categoryId = this.category;
  } else if (this.categoryId && !this.category && mongoose.Types.ObjectId.isValid(this.categoryId)) {
    this.category = this.categoryId;
  }

  // Sync isFeatured and featured
  if (this.isFeatured !== undefined && this.featured !== this.isFeatured) {
    this.featured = this.isFeatured;
  } else if (this.featured !== undefined && this.isFeatured !== this.featured) {
    this.isFeatured = this.featured;
  }

  // Sync dietaryType and foodType
  if (this.dietaryType === 'vegetarian') this.foodType = 'veg';
  else if (this.dietaryType === 'non_vegetarian') this.foodType = 'non-veg';
  else if (this.dietaryType === 'jain') this.foodType = 'jain';

  // Sync image.alt and image.altText
  if (this.image) {
    if (this.image.alt && !this.image.altText) {
      this.image.altText = this.image.alt;
    } else if (this.image.altText && !this.image.alt) {
      this.image.alt = this.image.altText;
    }
  }

  // Sync status and isActive / publishedAt
  if (this.status === 'published') {
    this.isActive = true;
    if (!this.publishedAt) {
      this.publishedAt = new Date();
    }
  } else if (this.status === 'archived' || this.status === 'unpublished') {
    this.isActive = false;
  }
});

menuItemSchema.index({ status: 1, isActive: 1, deletedAt: 1, category: 1, displayOrder: 1 });
menuItemSchema.index({ 'name.en': 1 });
menuItemSchema.index({ 'name.mr': 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
