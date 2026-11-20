const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    revisionNumber: {
      type: Number,
      default: 0,
      index: true,
    },
    parentQuotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
      default: null,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null,
    },
    enquiry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },
    customerSnapshot: {
      name: { type: String, required: true, trim: true },
      mobile: { type: String, required: true, trim: true },
      email: { type: String, trim: true, default: '' },
      address: { type: String, trim: true, default: '' },
    },
    eventSnapshot: {
      eventType: { type: String, required: true, trim: true },
      eventDate: { type: Date, required: true },
      eventTime: { type: String, trim: true, default: '' },
      venue: { type: String, trim: true, default: '' },
      guestCount: { type: Number, required: true, min: 1 },
    },
    serviceType: {
      type: String,
      enum: ['with_material', 'without_material'],
      required: true,
      default: 'with_material',
      index: true,
    },
    documentLanguage: {
      type: String,
      enum: ['en', 'mr'],
      default: 'en',
    },
    lineItems: [
      {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: '' },
        category: { type: String, trim: true, default: 'food' },
        quantity: { type: Number, required: true, min: 0 },
        unit: { type: String, trim: true, default: 'per_person' },
        rate: { type: Number, required: true, min: 0 },
        lineTotal: { type: Number, required: true, min: 0 },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discount: {
      type: {
        type: String,
        enum: ['fixed', 'percentage', 'none'],
        default: 'none',
      },
      value: { type: Number, default: 0, min: 0 },
      amount: { type: Number, default: 0, min: 0 },
      reason: { type: String, trim: true, default: '' },
    },
    additionalCharges: [
      {
        label: { type: String, trim: true, required: true },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
    taxDetails: {
      label: { type: String, trim: true, default: 'GST' },
      rate: { type: Number, default: 0, min: 0 },
      amount: { type: Number, default: 0, min: 0 },
    },
    grandTotal: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    termsSnapshot: {
      type: String,
      trim: true,
      default: '',
    },
    quotationDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    issuedAt: {
      type: Date,
      default: null,
    },
    validUntil: {
      type: Date,
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: [
        'draft',
        'issued',
        'accepted',
        'rejected',
        'revision_requested',
        'expired',
        'cancelled',
        'superseded',
      ],
      default: 'draft',
      index: true,
    },
    responseDate: {
      type: Date,
      default: null,
    },
    responseNotes: {
      type: String,
      trim: true,
      default: '',
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
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

quotationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

quotationSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Quotation', quotationSchema);
