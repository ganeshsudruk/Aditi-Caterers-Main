const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    customerSnapshot: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String },
    },
    eventDetails: {
      eventType: { type: String, required: true },
      eventDate: { type: Date, required: true, index: true },
      eventTime: { type: String },
      venue: { type: String },
      guestCount: { type: Number, default: 0 },
    },
    serviceType: {
      type: String,
      enum: ['with_material', 'without_material'],
      default: 'with_material',
    },
    packageSnapshot: {
      id: String,
      name: String,
      pricePerPlate: Number,
    },
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
    },
    status: {
      type: String,
      enum: ['pending_review', 'contacted', 'quotation_sent', 'confirmed', 'completed', 'cancelled'],
      default: 'pending_review',
      index: true,
    },
    estimatedAmount: { type: Number, default: 0 },
    notes: { type: String },
    isEnquiry: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ 'eventDetails.eventDate': 1 });

module.exports = mongoose.model('Booking', bookingSchema);
