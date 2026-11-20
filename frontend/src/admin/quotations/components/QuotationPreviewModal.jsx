import React, { useState } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';

const QuotationPreviewModal = ({ show, quotation, onClose }) => {
  const { at } = useAdminLanguage();
  const qa = at.quotationAdmin || {};
  const [lang, setLang] = useState(quotation?.documentLanguage || 'en');

  if (!show || !quotation) return null;

  const handlePrint = () => {
    window.print();
  };

  const isMr = lang === 'mr';
  const customer = quotation.customer || {};
  const eventDetails = quotation.eventDetails || {};
  const pricing = quotation.pricing || {};
  const lineItems = quotation.lineItems || [];

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          {/* Action bar (hidden on print) */}
          <div className="modal-header bg-light d-print-none py-2 px-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark">
                <i className="bi bi-printer me-1 text-primary"></i>
                {quotation.quotationNumber}
              </span>
              <div className="btn-group btn-group-sm ms-3">
                <button
                  type="button"
                  className={`btn ${!isMr ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLang('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`btn ${isMr ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLang('mr')}
                >
                  मराठी
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button type="button" className="btn btn-sm btn-primary" onClick={handlePrint}>
                <i className="bi bi-printer-fill me-1"></i> {qa.print || 'Print / PDF'}
              </button>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
          </div>

          {/* Printable Letterhead Document Body */}
          <div className="modal-body p-4 p-md-5 bg-white text-dark" id="quotation-print-area">
            {/* Letterhead Header */}
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
              <div>
                <h2 className="fw-bold mb-1" style={{ color: '#800020' }}>
                  {isMr ? 'आदिती केटरर्स' : 'Aditi Caterers'}
                </h2>
                <p className="text-muted small mb-1">
                  {isMr
                    ? 'अस्सल महाराष्ट्रीयन चव आणि शाही आदरातिथ्य'
                    : 'Authentic Maharashtrian Taste & Royal Event Hospitality'}
                </p>
                <div className="extra-small text-secondary">
                  <div>Plot 14, Ideal Colony, Kothrud, Pune - 411038</div>
                  <div>Phone: +91 98220 00000 / +91 94230 11111 | Email: contact@aditicaterers.in</div>
                </div>
              </div>
              <div className="text-end">
                <div className="badge bg-secondary text-uppercase mb-2 px-3 py-1 fs-6">
                  {isMr ? 'अधिकृत अंदाजपत्रक' : 'ESTIMATE / QUOTATION'}
                </div>
                <div className="fw-bold fs-5 text-primary">{quotation.quotationNumber}</div>
                <div className="small text-muted">
                  {isMr ? 'तारीख:' : 'Date:'}{' '}
                  {quotation.issuedDate
                    ? new Date(quotation.issuedDate).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </div>
                {quotation.validUntilDate && (
                  <div className="small text-muted">
                    {isMr ? 'वैधता:' : 'Valid Until:'} {quotation.validUntilDate}
                  </div>
                )}
              </div>
            </div>

            {/* Customer & Event Details Box */}
            <div className="row g-3 mb-4 p-3 bg-light rounded border">
              <div className="col-12 col-md-6 border-end-md">
                <h6 className="fw-bold text-uppercase small text-primary mb-2">
                  <i className="bi bi-person me-1"></i>
                  {isMr ? 'ग्राहक तपशील (Customer Details)' : 'Customer Details'}
                </h6>
                <div className="fw-bold fs-6">{customer.name}</div>
                <div className="small text-muted">
                  <i className="bi bi-telephone me-1"></i> {customer.phone}
                </div>
                {customer.email && (
                  <div className="small text-muted">
                    <i className="bi bi-envelope me-1"></i> {customer.email}
                  </div>
                )}
                {customer.address && (
                  <div className="small text-muted">
                    <i className="bi bi-geo-alt me-1"></i> {customer.address}
                  </div>
                )}
              </div>

              <div className="col-12 col-md-6 ps-md-4">
                <h6 className="fw-bold text-uppercase small text-primary mb-2">
                  <i className="bi bi-calendar-check me-1"></i>
                  {isMr ? 'कार्यक्रम तपशील (Event Details)' : 'Event Details'}
                </h6>
                <div className="small mb-1">
                  <strong>{isMr ? 'कार्यक्रम:' : 'Event:'}</strong> {eventDetails.eventType || 'Event'}
                </div>
                <div className="small mb-1">
                  <strong>{isMr ? 'तारीख:' : 'Date:'}</strong> {eventDetails.eventDate || 'TBD'}
                </div>
                <div className="small mb-1">
                  <strong>{isMr ? 'पाहुण्यांची संख्या:' : 'Guest Count:'}</strong>{' '}
                  <span className="badge bg-secondary">{eventDetails.guestCount || 0}</span>
                </div>
                <div className="small mb-1">
                  <strong>{isMr ? 'सेवा प्रकार:' : 'Service Type:'}</strong>{' '}
                  <span className="fw-bold">
                    {quotation.serviceType === 'with_material'
                      ? isMr ? 'साहित्यासह (Full Catering)' : 'With Material (Full Catering)'
                      : isMr ? 'साहित्याशिवाय (Labor Only)' : 'Without Material (Labor Only)'}
                  </span>
                </div>
                {eventDetails.venue && (
                  <div className="small">
                    <strong>{isMr ? 'स्थळ:' : 'Venue:'}</strong> {eventDetails.venue}
                  </div>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <table className="table table-bordered mb-4">
              <thead style={{ backgroundColor: '#800020', color: '#fff' }}>
                <tr>
                  <th style={{ width: '5%', backgroundColor: '#800020', color: '#fff' }}>#</th>
                  <th style={{ width: '45%', backgroundColor: '#800020', color: '#fff' }}>
                    {isMr ? 'तपशील / मेनू' : 'Item Description'}
                  </th>
                  <th style={{ width: '12%', backgroundColor: '#800020', color: '#fff' }}>
                    {isMr ? 'एकक' : 'Unit'}
                  </th>
                  <th style={{ width: '10%', backgroundColor: '#800020', color: '#fff' }} className="text-end">
                    {isMr ? 'नग / संख्या' : 'Qty'}
                  </th>
                  <th style={{ width: '13%', backgroundColor: '#800020', color: '#fff' }} className="text-end">
                    {isMr ? 'दर (₹)' : 'Rate (₹)'}
                  </th>
                  <th style={{ width: '15%', backgroundColor: '#800020', color: '#fff' }} className="text-end">
                    {isMr ? 'रक्कम (₹)' : 'Amount (₹)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="fw-bold">{item.name}</div>
                      {item.description && (
                        <div className="extra-small text-muted">{item.description}</div>
                      )}
                    </td>
                    <td>{item.unit || 'Plate'}</td>
                    <td className="text-end">{item.quantity}</td>
                    <td className="text-end">₹{(Number(item.rate) || 0).toLocaleString('en-IN')}</td>
                    <td className="text-end fw-bold">₹{(Number(item.amount) || 0).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Summary */}
            <div className="row justify-content-end mb-4">
              <div className="col-12 col-md-5">
                <table className="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <td className="text-muted">{isMr ? 'एकूण उप-रक्कम (Subtotal):' : 'Subtotal:'}</td>
                      <td className="text-end fw-semibold">
                        ₹{(pricing.subtotal || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    {pricing.discount?.amount > 0 && (
                      <tr className="text-success">
                        <td>
                          {isMr ? 'सवलत (Discount):' : 'Discount:'}
                          {pricing.discount.reason && (
                            <div className="extra-small text-muted">{pricing.discount.reason}</div>
                          )}
                        </td>
                        <td className="text-end">- ₹{(pricing.discount.amount).toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                    {pricing.additionalCharges?.map((ch, idx) => (
                      <tr key={idx}>
                        <td className="text-muted">{ch.name}:</td>
                        <td className="text-end">+ ₹{(Number(ch.amount) || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {pricing.tax?.isTaxable && (
                      <tr>
                        <td className="text-muted">GST ({pricing.tax.gstRate || 5}%):</td>
                        <td className="text-end">+ ₹{(pricing.tax.taxAmount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                    <tr className="border-top border-bottom border-2">
                      <td className="fw-bold fs-5" style={{ color: '#800020' }}>
                        {isMr ? 'एकूण रक्कम (Grand Total):' : 'Grand Total:'}
                      </td>
                      <td className="text-end fw-bold fs-5" style={{ color: '#800020' }}>
                        ₹{(pricing.grandTotal || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    {pricing.pricePerPerson > 0 && (
                      <tr>
                        <td colSpan="2" className="text-end text-muted extra-small pt-1">
                          ({isMr ? 'दर दरडोई:' : 'Per Person / Plate:'} ₹{pricing.pricePerPerson})
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terms and Conditions */}
            {quotation.termsAndConditions && (
              <div className="p-3 bg-light rounded border mb-3">
                <h6 className="fw-bold small text-uppercase mb-2 text-dark">
                  {isMr ? 'नियम आणि अटी (Terms & Conditions)' : 'Terms & Conditions'}
                </h6>
                <div className="small text-muted" style={{ whiteSpace: 'pre-line' }}>
                  {quotation.termsAndConditions}
                </div>
              </div>
            )}

            {/* Special Notes */}
            {quotation.notes && (
              <div className="p-3 bg-light rounded border mb-4">
                <h6 className="fw-bold small text-uppercase mb-1 text-dark">
                  {isMr ? 'विशेष सूचना (Special Instructions)' : 'Special Instructions'}
                </h6>
                <p className="small text-muted mb-0">{quotation.notes}</p>
              </div>
            )}

            {/* Signature & Seal Footer */}
            <div className="row pt-4 mt-4 border-top text-center">
              <div className="col-6">
                <p className="extra-small text-muted mb-5">Customer Acceptance Signature</p>
                <div className="border-top mx-auto w-50"></div>
                <small className="text-muted">{customer.name}</small>
              </div>
              <div className="col-6">
                <p className="extra-small text-muted mb-5">For Aditi Caterers (Authorized Signatory)</p>
                <div className="border-top mx-auto w-50"></div>
                <small className="text-muted">Aditi Caterers, Pune</small>
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light d-print-none">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-1"></i> {qa.print || 'Print Quotation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationPreviewModal;
