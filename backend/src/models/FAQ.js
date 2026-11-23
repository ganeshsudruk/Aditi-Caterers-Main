const mongoose = require('mongoose');

const bilingualStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true },
    mr: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: bilingualStringSchema,
      required: true,
    },
    answer: {
      type: bilingualStringSchema,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'catering', 'pricing', 'booking', 'menu'],
      default: 'general',
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

faqSchema.index({ isPublished: 1, displayOrder: 1 });

module.exports = mongoose.model('FAQ', faqSchema);
