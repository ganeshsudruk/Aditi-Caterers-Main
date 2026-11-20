import React, { useState, useEffect, useCallback } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import { quotationAdminService } from '../../../services/quotationAdminService';
import QuotationFilters from '../components/QuotationFilters';
import QuotationTable from '../components/QuotationTable';
import QuotationModal from '../components/QuotationModal';
import QuotationPreviewModal from '../components/QuotationPreviewModal';
import QuotationResponseModal from '../components/QuotationResponseModal';
import QuotationActionModal from '../components/QuotationActionModal';

const QuotationsPage = () => {
  const { at } = useAdminLanguage();
  const qa = at.quotationAdmin || {};

  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    issued: 0,
    accepted: 0,
    revision_requested: 0
  });

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState('issue'); // 'issue' | 'revision' | 'cancel' | 'delete'
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  // Notification message
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const loadQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await quotationAdminService.getQuotations({
        search,
        status: statusFilter,
        serviceType: serviceTypeFilter,
        sort: sortBy
      });

      const list = res?.data || [];
      setQuotations(list);

      // Compute quick statistics
      const allRes = await quotationAdminService.getQuotations();
      const allItems = allRes?.data || [];
      setStats({
        total: allItems.length,
        draft: allItems.filter(i => i.status === 'draft').length,
        issued: allItems.filter(i => i.status === 'issued').length,
        accepted: allItems.filter(i => i.status === 'accepted').length,
        revision_requested: allItems.filter(i => i.status === 'revision_requested').length
      });
    } catch (err) {
      console.error('Error fetching quotations:', err);
      showAlert(err.message || 'Failed to load quotations', 'danger');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, serviceTypeFilter, sortBy]);

  useEffect(() => {
    loadQuotations();
  }, [loadQuotations]);

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setServiceTypeFilter('all');
    setSortBy('newest');
  };

  // Actions
  const handleOpenCreate = () => {
    setSelectedQuotation(null);
    setEditorModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setSelectedQuotation(q);
    setEditorModalOpen(true);
  };

  const handleOpenPreview = (q) => {
    setSelectedQuotation(q);
    setPreviewModalOpen(true);
  };

  const handleOpenResponse = (q) => {
    setSelectedQuotation(q);
    setResponseModalOpen(true);
  };

  const handleOpenAction = (q, type) => {
    setSelectedQuotation(q);
    setActionType(type);
    setActionModalOpen(true);
  };

  const handleSaveQuotation = async (formData) => {
    if (selectedQuotation) {
      await quotationAdminService.updateQuotation(selectedQuotation.id || selectedQuotation._id, formData);
      showAlert(qa.quotationUpdated || 'Quotation updated successfully!');
    } else {
      await quotationAdminService.createQuotation(formData);
      showAlert(qa.quotationCreated || 'New quotation created successfully!');
    }
    setEditorModalOpen(false);
    loadQuotations();
  };

  const handleConfirmAction = async (id, payload) => {
    if (actionType === 'issue') {
      await quotationAdminService.issueQuotation(id, payload);
      showAlert(qa.quotationIssued || 'Quotation has been issued to customer!');
    } else if (actionType === 'revision') {
      await quotationAdminService.createRevision(id, payload);
      showAlert(qa.revisionCreated || 'New revision created and set to Draft!');
    } else if (actionType === 'cancel') {
      await quotationAdminService.updateStatus(id, 'cancelled', payload);
      showAlert(qa.quotationCancelled || 'Quotation has been cancelled.');
    } else if (actionType === 'delete') {
      await quotationAdminService.deleteQuotation(id);
      showAlert(qa.quotationDeleted || 'Quotation deleted successfully!');
    }
    setActionModalOpen(false);
    loadQuotations();
  };

  const handleSaveResponse = async (id, { status, notes }) => {
    await quotationAdminService.recordCustomerResponse(id, { status, notes });
    showAlert(qa.responseRecorded || 'Customer response recorded successfully!');
    loadQuotations();
  };

  return (
    <div className="container-fluid p-4">
      {/* Alert toast / banner */}
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: '#800020' }}>
            <i className="bi bi-file-earmark-text-fill me-2"></i>
            {qa.pageTitle || 'Quotation & Estimate Management'}
          </h3>
          <p className="text-muted small mb-0">
            {qa.pageSubtitle ||
              'Create professional catering estimates with or without materials, multi-revision tracking, and printable bilingual formats.'}
          </p>
        </div>
        <div className="mt-2 mt-md-0">
          <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
            <i className="bi bi-plus-lg me-1"></i>
            {qa.createQuotation || 'Create Quotation'}
          </button>
        </div>
      </div>

      {/* Filters & Statistics */}
      <QuotationFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
        stats={stats}
      />

      {/* Quotation Table */}
      <QuotationTable
        quotations={quotations}
        loading={loading}
        onPreview={handleOpenPreview}
        onEdit={handleOpenEdit}
        onIssue={(q) => handleOpenAction(q, 'issue')}
        onCreateRevision={(q) => handleOpenAction(q, 'revision')}
        onRecordResponse={handleOpenResponse}
        onCancel={(q) => handleOpenAction(q, 'cancel')}
        onDelete={(q) => handleOpenAction(q, 'delete')}
      />

      {/* Editor Modal */}
      {editorModalOpen && (
        <QuotationModal
          show={editorModalOpen}
          quotation={selectedQuotation}
          onClose={() => setEditorModalOpen(false)}
          onSave={handleSaveQuotation}
        />
      )}

      {/* Preview Modal */}
      {previewModalOpen && (
        <QuotationPreviewModal
          show={previewModalOpen}
          quotation={selectedQuotation}
          onClose={() => setPreviewModalOpen(false)}
        />
      )}

      {/* Customer Response Modal */}
      {responseModalOpen && (
        <QuotationResponseModal
          show={responseModalOpen}
          quotation={selectedQuotation}
          onClose={() => setResponseModalOpen(false)}
          onSave={handleSaveResponse}
        />
      )}

      {/* Action Dialog Modal (Issue, Revision, Cancel, Delete) */}
      {actionModalOpen && (
        <QuotationActionModal
          show={actionModalOpen}
          actionType={actionType}
          quotation={selectedQuotation}
          onClose={() => setActionModalOpen(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default QuotationsPage;
