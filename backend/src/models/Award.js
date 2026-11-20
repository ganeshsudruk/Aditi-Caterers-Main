const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, 'English award title is required'],
        trim: true,
        maxlength: 150,
      },
      mr: {
        type: String,
        trim: true,
        default: '',
        maxlength: 150,
      },
    },
    description: {
      en: { type: String, trim: true, default: '', maxlength: 2000 },
      mr: { type: String, trim: true, default: '', maxlength: 2000 },
    },
    image: {
      url: { type: String, trim: true, default: '' },
      publicId: { type: String, trim: true, default: '' },
    },
    issuingOrganization: {
      type: String,
      trim: true,
      default: '',
      maxlength: 200,
    },
    awardDate: {
      type: Date,
      default: null,
    },
    awardYear: {
      type: Number,
      default: null,
      min: 1900,
      max: 2100,
    },
    category: {
      type: String,
      trim: true,
      default: 'other_recognition',
      enum: ['catering_excellence', 'customer_appreciation', 'event_services', 'other_recognition'],
      index: true,
    },
    recipient: {
      type: String,
      trim: true,
      default: 'Aditi Caterers',
      maxlength: 150,
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
    status: {
      type: String,
      enum: ['draft', 'published', 'unpublished', 'archived'],
      default: 'draft',
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
  { timestamps: true }
);

awardSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

awardSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Award', awardSchema);
