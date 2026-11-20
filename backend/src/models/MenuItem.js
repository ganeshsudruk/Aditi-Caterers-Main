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
    categoryId: {
      type: mongoose.Schema.Types.Mixed, // ObjectId or string identifier
      required: [true, 'Category reference is required'],
      index: true,
    },
    description: {
      en: { type: String, trim: true, default: '', maxlength: 500 },
      mr: { type: String, trim: true, default: '', maxlength: 500 },
    },
    ingredients: {
      en: [{ type: String, trim: true }],
      mr: [{ type: String, trim: true }],
    },
    foodType: {
      type: String,
      enum: ['veg', 'non-veg', 'jain'],
      default: 'veg',
      index: true,
    },
    image: {
      url: { type: String, trim: true, default: '' },
      publicId: { type: String, trim: true, default: '' },
      alt: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
    },
    displayOrder: {
      type: Number,
      default: 1,
      min: 1,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'draft',
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

menuItemSchema.index({ categoryId: 1, status: 1, displayOrder: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
