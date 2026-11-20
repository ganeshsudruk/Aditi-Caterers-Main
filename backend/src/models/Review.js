const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    customerDisplayName: {
      type: String,
      trim: true,
      default: '',
      maxlength: 120,
    },
    reviewText: {
      original: {
        type: String,
        required: [true, 'Original review text is required'],
        trim: true,
        maxlength: 2500,
      },
      originalLanguage: {
        type: String,
        enum: ['mr', 'en', 'hi', 'other'],
        default: 'mr',
      },
      en: {
        type: String,
        trim: true,
        default: '',
        maxlength: 2500,
      },
      mr: {
        type: String,
        trim: true,
        default: '',
        maxlength: 2500,
      },
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      default: null,
      index: true,
    },
    eventType: {
      type: String,
      trim: true,
      default: '',
      maxlength: 80,
      index: true,
    },
    eventDate: {
      type: Date,
      default: null,
    },
    reviewDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    source: {
      type: String,
      trim: true,
      enum: ['whatsapp', 'written_feedback', 'google', 'direct_call', 'website', 'other'],
      default: 'whatsapp',
      index: true,
    },
    sourceReference: {
      type: String,
      trim: true,
      default: '',
      maxlength: 200,
    },
    consent: {
      granted: {
        type: Boolean,
        default: false,
        index: true,
      },
      grantedAt: {
        type: Date,
        default: null,
      },
      displayNamePermission: {
        type: String,
        enum: ['full_name', 'first_name_only', 'anonymous'],
        default: 'full_name',
      },
      evidenceReference: {
        type: String,
        trim: true,
        default: '',
        maxlength: 300,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'published', 'unpublished', 'archived'],
      default: 'pending',
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
      maxlength: 1500,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    publishedAt: {
      type: Date,
      default: null,
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
  { timestamps: true }
);

reviewSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Review', reviewSchema);
