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
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
      index: true,
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

// Pre-save to sync status and isActive
menuCategorySchema.pre('save', function () {
  if (this.status === 'inactive' || this.status === 'archived') {
    this.isActive = false;
  } else if (this.status === 'active') {
    this.isActive = true;
  }
});

menuCategorySchema.index({ isActive: 1, deletedAt: 1, displayOrder: 1 });

module.exports = mongoose.model('MenuCategory', menuCategorySchema);
