const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    image: {
      url: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
        default: '',
      },
    },
    title: {
      en: {
        type: String,
        required: [true, 'English title/caption is required'],
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
    altText: {
      en: {
        type: String,
        trim: true,
        default: '',
        maxlength: 200,
      },
      mr: {
        type: String,
        trim: true,
        default: '',
        maxlength: 200,
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['wedding', 'engagement', 'birthday', 'food', 'setup', 'corporate', 'other'],
      default: 'other',
    },
    eventType: {
      type: String,
      trim: true,
      default: '',
      maxlength: 80,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'draft',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: id field mapped from _id for frontend compatibility
gallerySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

gallerySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
