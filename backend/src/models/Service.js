const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'English service name is required'],
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
    highlights: {
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
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'draft',
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 1,
      min: 1,
      index: true,
    },
    seo: {
      title: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
      description: {
        en: { type: String, trim: true, default: '' },
        mr: { type: String, trim: true, default: '' },
      },
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

serviceSchema.index({ status: 1, displayOrder: 1 });

module.exports = mongoose.model('Service', serviceSchema);
