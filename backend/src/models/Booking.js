const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    changedByName: {
      type: String,
      trim: true,
      default: 'System',
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const internalNoteSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    author: {
      type: String,
      trim: true,
      default: 'Administrator',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const communicationLogSchema = new mongoose.Schema(
  {
    channel: {
      type: String,
      trim: true,
      default: 'Phone',
    },
    summary: {
      type: String,
      trim: true,
      default: '',
    },
    followUpAt: {
      type: Date,
      default: null,
    },
    author: {
      type: String,
      trim: true,
      default: 'Administrator',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    bookingReference: {
      type: String,
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null,
    },
    customerSnapshot: {
      name: { type: String, required: true, trim: true },
      fullName: { type: String, trim: true },
      phone: { type: String, required: true, trim: true },
      phoneNumber: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true, default: '' },
      address: { type: String, trim: true, default: '' },
      preferredContactMethod: { type: String, trim: true, default: 'phone' },
    },
    eventDetails: {
      eventType: { type: String, required: true, trim: true },
      otherType: { type: String, trim: true, default: '' },
      eventDate: { type: Date, index: true },
      dateNotDecided: { type: Boolean, default: false },
      eventTime: { type: String, trim: true, default: '' },
      startTime: { type: String, trim: true, default: '' },
      endTime: { type: String, trim: true, default: '' },
      venue: { type: String, trim: true, default: '' },
      venueName: { type: String, trim: true, default: '' },
      venueAddress: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: 'Maharashtra' },
      guestCount: { type: Number, default: 0 },
      notes: { type: String, trim: true, default: '' },
    },
    serviceType: {
      type: String,
      enum: ['with_material', 'without_material', 'with-material', 'without-material', 'need-guidance'],
      default: 'with_material',
      index: true,
    },
    requestedMenu: {
      type: [String],
      default: [],
    },
    cateringDetails: {
      packageId: { type: String, default: '' },
      selectedDishes: { type: String, default: '' },
      specialDietary: { type: String, default: '' },
      budgetRange: { type: String, default: '' },
    },
    customerMessage: {
      type: String,
      maxlength: 3000,
      trim: true,
      default: '',
    },
    packageSnapshot: {
      id: String,
      name: String,
      pricePerPlate: Number,
    },
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'pending_review', 'contacted', 'quotation_sent', 'confirmed', 'completed', 'event_completed', 'cancelled'],
      default: 'new',
      index: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
      default: '',
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    statusHistory: [statusHistorySchema],
    internalNotes: [internalNoteSchema],
    communicationLogs: [communicationLogSchema],
    estimatedAmount: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    source: {
      type: String,
      default: 'website',
      trim: true,
    },
    isEnquiry: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save synchronization hook
bookingSchema.pre('save', function () {
  // Sync bookingNumber and bookingReference
  if (this.bookingNumber && !this.bookingReference) {
    this.bookingReference = this.bookingNumber;
  } else if (this.bookingReference && !this.bookingNumber) {
    this.bookingNumber = this.bookingReference;
  }

  // Sync customerSnapshot fields
  if (this.customerSnapshot) {
    if (this.customerSnapshot.name && !this.customerSnapshot.fullName) {
      this.customerSnapshot.fullName = this.customerSnapshot.name;
    } else if (this.customerSnapshot.fullName && !this.customerSnapshot.name) {
      this.customerSnapshot.name = this.customerSnapshot.fullName;
    }

    if (this.customerSnapshot.phone && !this.customerSnapshot.phoneNumber) {
      this.customerSnapshot.phoneNumber = this.customerSnapshot.phone;
    } else if (this.customerSnapshot.phoneNumber && !this.customerSnapshot.phone) {
      this.customerSnapshot.phone = this.customerSnapshot.phoneNumber;
    }
  }
});

bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ 'eventDetails.eventDate': 1 });
bookingSchema.index({ 'customerSnapshot.phone': 1 });
bookingSchema.index({ 'customerSnapshot.email': 1 });

module.exports = mongoose.model('Booking', bookingSchema);
