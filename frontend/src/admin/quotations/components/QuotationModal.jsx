import React, { useState, useEffect } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { SERVICE_TYPES, DEFAULT_TERMS, quotationAdminService } from '../../../services/quotationAdminService';

const QuotationModal = ({ show, quotation, onClose, onSave }) => {
  const { adminLang, at } = useAdminLanguage();
  const currentLang = adminLang === 'mr' ? 'mr' : 'en';
  const qa = at.quotationAdmin || {};

  const [activeTab, setActiveTab] = useState('details'); // details, items, pricing, terms
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    eventDetails: {
      eventType: 'Wedding Reception',
      eventDate: '',
      eventTime: '',
      guestCount: 100,
      venue: ''
    },
    serviceType: 'with_material',
    documentLanguage: 'en',
    lineItems: [
      {
        id: 'li-new-1',
        name: 'Deluxe Buffet Service',
        description: 'Complete meal spread with starters, sweets, and main course',
        category: 'Buffet',
        unit: 'Plate',
        quantity: 100,
        rate: 450,
        amount: 45000
      }
    ],
    pricing: {
      subtotal: 45000,
      discount: {
        type: 'none',
        rate: 0,
        amount: 0,
        reason: ''
      },
      additionalCharges: [],
      tax: {
        isTaxable: true,
        gstRate: 5,
        cgst: 1125,
        sgst: 1125,
        taxAmount: 2250
      },
      grandTotal: 47250,
      pricePerPerson: 472.5
    },
    termsAndConditions: DEFAULT_TERMS.en,
    notes: '',
    status: 'draft'
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (quotation) {
      setFormData({
        ...quotation,
        customer: { ...quotation.customer },
        eventDetails: { ...quotation.eventDetails },
        pricing: {
          ...quotation.pricing,
          discount: { ...(quotation.pricing?.discount || { type: 'none', rate: 0, amount: 0, reason: '' }) },
          additionalCharges: quotation.pricing?.additionalCharges ? [...quotation.pricing.additionalCharges] : [],
          tax: { ...(quotation.pricing?.tax || { isTaxable: true, gstRate: 5 }) }
        },
        lineItems: quotation.lineItems?.length ? [...quotation.lineItems] : []
      });
    } else {
      setFormData({
        customer: { name: '', phone: '', email: '', address: '' },
        eventDetails: { eventType: 'Wedding Reception', eventDate: '', eventTime: '', guestCount: 100, venue: '' },
        serviceType: 'with_material',
        documentLanguage: currentLang,
        lineItems: [
          {
            id: `li-${Date.now()}`,
            name: 'Deluxe Buffet Service',
            description: 'Complete meal spread with starters, sweets, and main course',
            category: 'Buffet',
            unit: 'Plate',
            quantity: 100,
            rate: 450,
            amount: 45000
          }
        ],
        pricing: {
          subtotal: 45000,
          discount: { type: 'none', rate: 0, amount: 0, reason: '' },
          additionalCharges: [],
          tax: { isTaxable: true, gstRate: 5, cgst: 1125, sgst: 1125, taxAmount: 2250 },
          grandTotal: 47250,
          pricePerPerson: 472.5
        },
        termsAndConditions: currentLang === 'mr' ? DEFAULT_TERMS.mr : DEFAULT_TERMS.en,
        notes: '',
        status: 'draft'
      });
    }
    setActiveTab('details');
    setError('');
  }, [quotation, show, currentLang]);

  // Recalculate totals helper
  const updateCalculations = (updatedData) => {
    const calculated = quotationAdminService.calculatePricing({
      lineItems: updatedData.lineItems,
      discount: updatedData.pricing?.discount,
      additionalCharges: updatedData.pricing?.additionalCharges,
      tax: updatedData.pricing?.tax,
      guestCount: updatedData.eventDetails?.guestCount || 1
    });

    setFormData({
      ...updatedData,
      pricing: calculated
    });
  };

  // Line item handlers
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    if (field === 'quantity' || field === 'rate') {
      const q = Number(field === 'quantity' ? value : updatedItems[index].quantity) || 0;
      const r = Number(field === 'rate' ? value : updatedItems[index].rate) || 0;
      updatedItems[index].amount = q * r;
    }

    updateCalculations({
      ...formData,
      lineItems: updatedItems
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `li-${Date.now()}`,
      name: '',
      description: '',
      category: 'Catering',
      unit: 'Plate',
      quantity: formData.eventDetails?.guestCount || 100,
      rate: 0,
      amount: 0
    };
    updateCalculations({
      ...formData,
      lineItems: [...formData.lineItems, newItem]
    });
  };

  const handleRemoveItem = (index) => {
    if (formData.lineItems.length <= 1) {
      alert('At least one item is required in the quotation.');
      return;
    }
    const updatedItems = formData.lineItems.filter((_, i) => i !== index);
    updateCalculations({
      ...formData,
      lineItems: updatedItems
    });
  };

  // Additional charge handlers
  const handleAddCharge = () => {
    const updatedCharges = [...(formData.pricing?.additionalCharges || []), { name: '', amount: 0 }];
    updateCalculations({
      ...formData,
      pricing: {
        ...formData.pricing,
        additionalCharges: updatedCharges
      }
    });
  };

  const handleChargeChange = (index, field, value) => {
    const updatedCharges = [...(formData.pricing?.additionalCharges || [])];
    updatedCharges[index] = {
      ...updatedCharges[index],
      [field]: field === 'amount' ? (Number(value) || 0) : value
    };
    updateCalculations({
      ...formData,
      pricing: {
        ...formData.pricing,
        additionalCharges: updatedCharges
      }
    });
  };

  const handleRemoveCharge = (index) => {
    const updatedCharges = (formData.pricing?.additionalCharges || []).filter((_, i) => i !== index);
    updateCalculations({
      ...formData,
      pricing: {
        ...formData.pricing,
        additionalCharges: updatedCharges
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer?.name?.trim()) {
      setError('Customer name is required.');
      setActiveTab('details');
      return;
    }
    if (!formData.customer?.phone?.trim()) {
      setError('Customer phone number is required.');
      setActiveTab('details');
      return;
    }
    if (!formData.lineItems?.length) {
      setError('At least one line item is required.');
      setActiveTab('items');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSave(formData);
    } catch (err) {
      setError(err.message || 'Failed to save quotation');
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          {/* Header */}
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-file-earmark-text text-primary me-2"></i>
              {quotation
                ? `${qa.editQuotation || 'Edit Quotation'} - ${quotation.quotationNumber}`
                : (qa.createQuotation || 'Create New Quotation')}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={submitting}></button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-bottom px-3 pt-2 bg-white">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'details' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  <i className="bi bi-person me-1"></i>
                  {qa.tabDetails || '1. Customer & Event'}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'items' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('items')}
                >
                  <i className="bi bi-card-checklist me-1"></i>
                  {qa.tabItems || '2. Line Items'} ({formData.lineItems.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'pricing' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('pricing')}
                >
                  <i className="bi bi-cash-stack me-1"></i>
                  {qa.tabPricing || '3. Discount, Charges & Tax'}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'terms' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('terms')}
                >
                  <i className="bi bi-file-earmark-medical me-1"></i>
                  {qa.tabTerms || '4. Terms & Notes'}
                </button>
              </li>
            </ul>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {/* TAB 1: DETAILS */}
            {activeTab === 'details' && (
              <div>
                <h6 className="fw-bold text-primary mb-3">
                  <i className="bi bi-person-circle me-1"></i> Customer Information
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Customer Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.customer?.name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, name: e.target.value }
                        })
                      }
                      placeholder="e.g. Ramesh Kulkarni"
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.customer?.phone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, phone: e.target.value }
                        })
                      }
                      placeholder="e.g. +91 98220 12345"
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.customer?.email || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, email: e.target.value }
                        })
                      }
                      placeholder="e.g. ramesh@example.com"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Customer Address / City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.customer?.address || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: { ...formData.customer, address: e.target.value }
                        })
                      }
                      placeholder="e.g. Kothrud, Pune"
                    />
                  </div>
                </div>

                <h6 className="fw-bold text-primary mb-3">
                  <i className="bi bi-calendar-event me-1"></i> Event Specifications & Service Model
                </h6>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Event Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.eventDetails?.eventType || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventDetails: { ...formData.eventDetails, eventType: e.target.value }
                        })
                      }
                      placeholder="e.g. Wedding Reception, Birthday, Upanayan"
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label small fw-semibold">Event Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.eventDetails?.eventDate || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventDetails: { ...formData.eventDetails, eventDate: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label small fw-semibold">Expected Guest Count</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={formData.eventDetails?.guestCount || 100}
                      onChange={(e) => {
                        const newCount = Number(e.target.value) || 1;
                        updateCalculations({
                          ...formData,
                          eventDetails: { ...formData.eventDetails, guestCount: newCount }
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Venue / Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.eventDetails?.venue || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventDetails: { ...formData.eventDetails, venue: e.target.value }
                        })
                      }
                      placeholder="e.g. Siddhi Banquet Hall, Pune"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Document Language</label>
                    <select
                      className="form-select"
                      value={formData.documentLanguage}
                      onChange={(e) =>
                        setFormData({ ...formData, documentLanguage: e.target.value })
                      }
                    >
                      <option value="en">English (Official Format)</option>
                      <option value="mr">मराठी (स्थानिक प्रादेशिक स्वरूप)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-light rounded border mb-3">
                  <label className="form-label fw-bold text-dark mb-2">
                    <i className="bi bi-gear-fill me-1"></i> Service Model (Material Configuration)
                  </label>
                  <div className="row g-2">
                    {SERVICE_TYPES.map((st) => (
                      <div className="col-12 col-md-6" key={st.id}>
                        <div
                          className={`card h-100 p-3 cursor-pointer ${
                            formData.serviceType === st.id ? 'border-primary bg-primary-subtle' : 'border'
                          }`}
                          onClick={() => setFormData({ ...formData, serviceType: st.id })}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="serviceType"
                              id={`st-${st.id}`}
                              checked={formData.serviceType === st.id}
                              onChange={() => setFormData({ ...formData, serviceType: st.id })}
                            />
                            <label className="form-check-label fw-bold" htmlFor={`st-${st.id}`}>
                              {currentLang === 'mr' ? st.mr : st.en}
                            </label>
                          </div>
                          <p className="small text-muted mb-0 mt-2">
                            {currentLang === 'mr' ? st.description.mr : st.description.en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LINE ITEMS */}
            {activeTab === 'items' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold text-primary mb-0">Itemized Menu & Service Breakdown</h6>
                    <small className="text-muted">Enter specific catering dishes, packages, or equipment charges.</small>
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAddItem}>
                    <i className="bi bi-plus-circle me-1"></i> Add Line Item
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '30%' }}>Item / Service</th>
                        <th style={{ width: '15%' }}>Category</th>
                        <th style={{ width: '10%' }}>Unit</th>
                        <th style={{ width: '12%' }} className="text-end">Qty</th>
                        <th style={{ width: '15%' }} className="text-end">Rate (₹)</th>
                        <th style={{ width: '15%' }} className="text-end">Amount (₹)</th>
                        <th style={{ width: '3%' }} className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.lineItems.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm mb-1"
                              placeholder="Item name (e.g. Maharashtrian Thali)"
                              value={item.name}
                              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                              required
                            />
                            <input
                              type="text"
                              className="form-control form-control-sm text-muted"
                              placeholder="Notes or included dishes..."
                              value={item.description || ''}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Category"
                              value={item.category || ''}
                              onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Plate/Hour/Unit"
                              value={item.unit || 'Plate'}
                              onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              className="form-control form-control-sm text-end"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              step="any"
                              className="form-control form-control-sm text-end"
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                            />
                          </td>
                          <td className="text-end fw-bold">
                            ₹{(Number(item.amount) || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-danger p-0"
                              onClick={() => handleRemoveItem(index)}
                              title="Remove item"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-light">
                      <tr>
                        <td colSpan="5" className="text-end fw-bold">Subtotal:</td>
                        <td className="text-end fw-bold text-primary">
                          ₹{(formData.pricing?.subtotal || 0).toLocaleString('en-IN')}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: PRICING, DISCOUNT, TAX */}
            {activeTab === 'pricing' && (
              <div>
                <div className="row g-4">
                  {/* Left Column: Discounts & Additional Charges */}
                  <div className="col-12 col-md-6">
                    {/* Discount Configuration */}
                    <div className="card border mb-3">
                      <div className="card-header bg-light py-2">
                        <strong className="text-primary small">Discount Configuration</strong>
                      </div>
                      <div className="card-body p-3">
                        <div className="row g-2 mb-2">
                          <div className="col-6">
                            <label className="form-label extra-small fw-semibold">Discount Type</label>
                            <select
                              className="form-select form-select-sm"
                              value={formData.pricing?.discount?.type || 'none'}
                              onChange={(e) => {
                                updateCalculations({
                                  ...formData,
                                  pricing: {
                                    ...formData.pricing,
                                    discount: {
                                      ...formData.pricing.discount,
                                      type: e.target.value
                                    }
                                  }
                                });
                              }}
                            >
                              <option value="none">No Discount</option>
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>

                          {formData.pricing?.discount?.type === 'percentage' && (
                            <div className="col-6">
                              <label className="form-label extra-small fw-semibold">Percentage (%)</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                className="form-control form-control-sm"
                                value={formData.pricing.discount.rate || 0}
                                onChange={(e) => {
                                  updateCalculations({
                                    ...formData,
                                    pricing: {
                                      ...formData.pricing,
                                      discount: {
                                        ...formData.pricing.discount,
                                        rate: Number(e.target.value) || 0
                                      }
                                    }
                                  });
                                }}
                              />
                            </div>
                          )}

                          {formData.pricing?.discount?.type === 'fixed' && (
                            <div className="col-6">
                              <label className="form-label extra-small fw-semibold">Fixed Amount (₹)</label>
                              <input
                                type="number"
                                min="0"
                                className="form-control form-control-sm"
                                value={formData.pricing.discount.amount || 0}
                                onChange={(e) => {
                                  updateCalculations({
                                    ...formData,
                                    pricing: {
                                      ...formData.pricing,
                                      discount: {
                                        ...formData.pricing.discount,
                                        amount: Number(e.target.value) || 0
                                      }
                                    }
                                  });
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {formData.pricing?.discount?.type !== 'none' && (
                          <div>
                            <label className="form-label extra-small fw-semibold">Discount Reason / Note</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="e.g. Off-season offer, Referral client"
                              value={formData.pricing.discount.reason || ''}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  pricing: {
                                    ...formData.pricing,
                                    discount: {
                                      ...formData.pricing.discount,
                                      reason: e.target.value
                                    }
                                  }
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Charges */}
                    <div className="card border">
                      <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
                        <strong className="text-primary small">Additional Charges</strong>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary py-0"
                          onClick={handleAddCharge}
                        >
                          <i className="bi bi-plus"></i> Add Charge
                        </button>
                      </div>
                      <div className="card-body p-3">
                        {(!formData.pricing?.additionalCharges || formData.pricing.additionalCharges.length === 0) ? (
                          <div className="text-muted extra-small fst-italic">
                            No additional charges (e.g. transport, setup fee, live counters).
                          </div>
                        ) : (
                          formData.pricing.additionalCharges.map((ch, idx) => (
                            <div className="row g-2 mb-2 align-items-center" key={idx}>
                              <div className="col-7">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Charge description (e.g. Transport)"
                                  value={ch.name}
                                  onChange={(e) => handleChargeChange(idx, 'name', e.target.value)}
                                />
                              </div>
                              <div className="col-4">
                                <input
                                  type="number"
                                  min="0"
                                  className="form-control form-control-sm text-end"
                                  placeholder="Amount (₹)"
                                  value={ch.amount}
                                  onChange={(e) => handleChargeChange(idx, 'amount', e.target.value)}
                                />
                              </div>
                              <div className="col-1 text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-link text-danger p-0"
                                  onClick={() => handleRemoveCharge(idx)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Tax & Grand Total Summary */}
                  <div className="col-12 col-md-6">
                    <div className="card border bg-light">
                      <div className="card-header bg-white py-2">
                        <strong className="text-primary small">Taxes & Grand Total</strong>
                      </div>
                      <div className="card-body p-3">
                        <div className="form-check form-switch mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="taxSwitch"
                            checked={formData.pricing?.tax?.isTaxable || false}
                            onChange={(e) => {
                              updateCalculations({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  tax: {
                                    ...formData.pricing.tax,
                                    isTaxable: e.target.checked
                                  }
                                }
                              });
                            }}
                          />
                          <label className="form-check-label fw-semibold small" htmlFor="taxSwitch">
                            Apply GST (Goods & Services Tax)
                          </label>
                        </div>

                        {formData.pricing?.tax?.isTaxable && (
                          <div className="mb-3">
                            <label className="form-label extra-small fw-semibold">GST Rate (%)</label>
                            <select
                              className="form-select form-select-sm"
                              value={formData.pricing.tax.gstRate || 5}
                              onChange={(e) => {
                                updateCalculations({
                                  ...formData,
                                  pricing: {
                                    ...formData.pricing,
                                    tax: {
                                      ...formData.pricing.tax,
                                      gstRate: Number(e.target.value) || 5
                                    }
                                  }
                                });
                              }}
                            >
                              <option value="5">5% Catering Standard (2.5% CGST + 2.5% SGST)</option>
                              <option value="12">12% Outdoor Catering Rate</option>
                              <option value="18">18% Full Event & Hospitality Service</option>
                            </select>
                          </div>
                        )}

                        <hr />

                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Subtotal:</span>
                          <span className="fw-semibold">₹{(formData.pricing?.subtotal || 0).toLocaleString('en-IN')}</span>
                        </div>

                        {(formData.pricing?.discount?.amount > 0) && (
                          <div className="d-flex justify-content-between mb-2 text-success">
                            <span>Discount:</span>
                            <span>- ₹{(formData.pricing.discount.amount).toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {(formData.pricing?.additionalChargesTotal > 0) && (
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Additional Charges:</span>
                            <span>+ ₹{(formData.pricing.additionalChargesTotal).toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {formData.pricing?.tax?.isTaxable && (
                          <div className="d-flex justify-content-between mb-2 text-muted small">
                            <span>GST ({formData.pricing.tax.gstRate}%):</span>
                            <span>+ ₹{(formData.pricing.tax.taxAmount || 0).toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        <div className="d-flex justify-content-between pt-2 border-top border-2">
                          <span className="fs-5 fw-bold text-dark">Grand Total:</span>
                          <span className="fs-5 fw-bold text-primary">
                            ₹{(formData.pricing?.grandTotal || 0).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {formData.pricing?.pricePerPerson > 0 && (
                          <div className="text-end small text-muted mt-1">
                            ₹{formData.pricing.pricePerPerson} per plate ({formData.eventDetails?.guestCount || 1} guests)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TERMS & SPECIAL NOTES */}
            {activeTab === 'terms' && (
              <div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold text-dark mb-0">Terms & Conditions</label>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setFormData({ ...formData, termsAndConditions: DEFAULT_TERMS.en })}
                      >
                        Reset English Terms
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setFormData({ ...formData, termsAndConditions: DEFAULT_TERMS.mr })}
                      >
                        Reset मराठी अटी
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows="6"
                    className="form-control"
                    value={formData.termsAndConditions || ''}
                    onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="form-label fw-bold text-dark">Special Customer Notes / Instructions</label>
                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="e.g. Specific diet requests, spice level preference, venue setup instructions..."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check2-circle me-1"></i>
                  {quotation ? (qa.editQuotation || 'Update Quotation') : (qa.createQuotation || 'Save Quotation')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
