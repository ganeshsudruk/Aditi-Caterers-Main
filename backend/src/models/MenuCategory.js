const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'English category name is required'],
        trim: true,
        maxlength: 100,
      },
      mr: {
        type: String,
        trim: true,
        default: '',
        maxlength: 100,
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
    description: {
      en: { type: String, trim: true, default: '', maxlength: 500 },
      mr: { type: String, trim: true, default: '', maxlength: 500 },
    },
    displayOrder: {
      type: Number,
      default: 1,
      min: 1,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
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

module.exports = mongoose.model('MenuCategory', menuCategorySchema);
