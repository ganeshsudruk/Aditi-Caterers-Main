const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'English package name is required'],
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
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      en: { type: String, trim: true, default: '', maxlength: 300 },
      mr: { type: String, trim: true, default: '', maxlength: 300 },
    },
    description: {
      en: { type: String, trim: true, default: '', maxlength: 2000 },
      mr: { type: String, trim: true, default: '', maxlength: 2000 },
    },
    guestCount: {
      min: { type: Number, default: 50 },
      max: { type: Number, default: 1000 },
      fixed: { type: Number, default: 100 },
      note: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
    },
    price: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
      pricingBasis: {
        type: String,
        enum: ['fixed_package', 'per_person'],
        default: 'fixed_package',
      },
      notes: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
      showPublicly: { type: Boolean, default: true },
    },
    serviceTypes: [
      {
        type: String,
        enum: ['with_material', 'without_material'],
      },
    ],
    eventTypes: [{ type: String, trim: true }],
    menuSelections: [
      {
        groupName: {
          en: { type: String, trim: true },
          mr: { type: String, trim: true },
        },
        selectionRule: { type: String, default: 'all_included' },
        itemsText: {
          en: { type: String, trim: true },
          mr: { type: String, trim: true },
        },
      },
    ],
    inclusions: {
      en: [{ type: String, trim: true }],
      mr: [{ type: String, trim: true }],
    },
    exclusions: {
      en: [{ type: String, trim: true }],
      mr: [{ type: String, trim: true }],
    },
    notes: {
      en: { type: String, trim: true, default: '' },
      mr: { type: String, trim: true, default: '' },
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

packageSchema.index({ status: 1, displayOrder: 1 });

module.exports = mongoose.model('Package', packageSchema);
