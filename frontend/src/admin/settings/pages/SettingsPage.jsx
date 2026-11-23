import React, { useState, useEffect } from 'react';
import { useAdminLanguage } from '../../../context/useAdminLanguage';
import {
  websiteSettingsAdminService,
  DEFAULT_WEBSITE_SETTINGS,
} from '../../../services/websiteSettingsAdminService';

const SettingsPage = () => {
  const { at } = useAdminLanguage();
  const ws = at.websiteSettingsAdmin || {};

  const [activeTab, setActiveTab] = useState('general'); // general, business, contact, branding, homepage, footer, social, seo, enquiry, notifications
  const [formData, setFormData] = useState(DEFAULT_WEBSITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await websiteSettingsAdminService.getSettings();
        setFormData(data || DEFAULT_WEBSITE_SETTINGS);
      } catch (err) {
        showAlert(err.message || 'Failed to load settings', 'danger');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const updated = await websiteSettingsAdminService.updateSettings(formData);
      setFormData(updated);
      showAlert(ws.savedSuccess || 'Settings saved successfully!');
    } catch (err) {
      showAlert(err.message || 'Failed to save settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      const updated = await websiteSettingsAdminService.publishSettings();
      setFormData(updated);
      showAlert(ws.publishSuccess || 'Website settings published live to public site!');
    } catch (err) {
      showAlert(err.message || 'Failed to publish settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset unsaved changes to last saved settings?')) {
      const data = await websiteSettingsAdminService.getSettings();
      setFormData(data);
      showAlert('Reset to last saved state.', 'info');
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4 text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="text-muted mt-2">Loading website settings...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Alert banner */}
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
            <i className="bi bi-gear-wide-connected me-2"></i>
            {ws.pageTitle || 'Website Settings Management'}
          </h3>
          <p className="text-muted small mb-0">
            {ws.pageSubtitle ||
              'Configure business profiles, contact info, branding assets, homepage sections, and bilingual content.'}
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleReset} disabled={saving}>
            <i className="bi bi-arrow-counterclockwise me-1"></i>
            {ws.resetBtn || 'Reset to Saved'}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
            {saving ? (
              <span className="spinner-border spinner-border-sm me-1" role="status"></span>
            ) : (
              <i className="bi bi-check2-circle me-1"></i>
            )}
            {ws.saveBtn || 'Save Changes'}
          </button>
          <button type="button" className="btn btn-success btn-sm" onClick={handlePublish} disabled={saving}>
            <i className="bi bi-send-check me-1"></i>
            {ws.publishBtn || 'Publish Live'}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white border-bottom p-0">
          <ul className="nav nav-tabs card-header-tabs m-0 px-3">
            {[
              { id: 'general', label: ws.tabGeneral || 'General / सामान्य', icon: 'bi-sliders' },
              { id: 'business', label: ws.tabBusiness || 'Business / व्यवसाय', icon: 'bi-building' },
              { id: 'contact', label: ws.tabContact || 'Contact / संपर्क', icon: 'bi-telephone' },
              { id: 'branding', label: ws.tabBranding || 'Branding / ब्रँडिंग', icon: 'bi-palette' },
              { id: 'homepage', label: ws.tabHomepage || 'Homepage / मुख्यपृष्ठ', icon: 'bi-house' },
              { id: 'footer', label: ws.tabFooter || 'Footer / फूटर', icon: 'bi-layout-text-window-reverse' },
              { id: 'social', label: ws.tabSocial || 'Social Links / सोशल', icon: 'bi-share' },
              { id: 'seo', label: ws.tabSeo || 'SEO / सर्च इंजिन', icon: 'bi-search' },
              { id: 'enquiry', label: ws.tabEnquiry || 'Enquiry / चौकशी', icon: 'bi-card-checklist' },
              { id: 'notifications', label: ws.tabNotifications || 'Notifications / सूचना', icon: 'bi-bell' },
            ].map((tab) => (
              <li className="nav-item" key={tab.id}>
                <button
                  type="button"
                  className={`nav-link py-3 px-3 ${activeTab === tab.id ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi ${tab.icon} me-1`}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSave}>
            {/* 1. GENERAL SETTINGS */}
            {activeTab === 'general' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">General Website Configuration</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Website Name (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.websiteName?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          general: {
                            ...formData.general,
                            websiteName: { ...formData.general.websiteName, en: e.target.value },
                          },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">वेबसाइटचे नाव (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.websiteName?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          general: {
                            ...formData.general,
                            websiteName: { ...formData.general.websiteName, mr: e.target.value },
                          },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Tagline (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.tagline?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          general: {
                            ...formData.general,
                            tagline: { ...formData.general.tagline, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">टॅगलाइन (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.tagline?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          general: {
                            ...formData.general,
                            tagline: { ...formData.general.tagline, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Default Public Language</label>
                    <select
                      className="form-select"
                      value={formData.general?.defaultLanguage || 'en'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          general: { ...formData.general, defaultLanguage: e.target.value },
                        })
                      }
                    >
                      <option value="en">English</option>
                      <option value="mr">मराठी (Marathi)</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Default Timezone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.timezone || 'Asia/Kolkata'}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Currency Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.general?.currency || 'INR'}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. BUSINESS PROFILE */}
            {activeTab === 'business' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Business Identity & Operations</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Business Name (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.business?.name?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            name: { ...formData.business.name, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">व्यवसायाचे नाव (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.business?.name?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            name: { ...formData.business.name, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Short Description (English)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.business?.shortDescription?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            shortDescription: { ...formData.business.shortDescription, en: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">संक्षिप्त माहिती (मराठी)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.business?.shortDescription?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            shortDescription: { ...formData.business.shortDescription, mr: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Address (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.business?.address?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            address: { ...formData.business.address, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">पत्ता (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.business?.address?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: {
                            ...formData.business,
                            address: { ...formData.business.address, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">Years of Experience</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.business?.experienceYears || 15}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: { ...formData.business, experienceYears: Number(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label small fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.business?.city || 'Pune'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business: { ...formData.business, city: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. CONTACT DETAILS */}
            {activeTab === 'contact' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Public Contact Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Primary Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.contact?.primaryPhone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, primaryPhone: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">WhatsApp Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.contact?.whatsappNumber || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, whatsappNumber: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Secondary / Landline Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.contact?.secondaryPhone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, secondaryPhone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Public Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.contact?.email || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Google Maps URL / Location Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.contact?.mapUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, mapUrl: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. BRANDING */}
            {activeTab === 'branding' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Logo & Branding Assets</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Website Logo URL</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="https://.../logo.png"
                      value={formData.branding?.logoUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, logoUrl: e.target.value },
                        })
                      }
                    />
                    {formData.branding?.logoUrl && (
                      <div className="p-3 bg-light rounded border text-center">
                        <img
                          src={formData.branding.logoUrl}
                          alt="Logo Preview"
                          style={{ maxHeight: '80px', maxWidth: '100%' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Favicon URL</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="https://.../favicon.ico"
                      value={formData.branding?.faviconUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, faviconUrl: e.target.value },
                        })
                      }
                    />
                    {formData.branding?.faviconUrl && (
                      <div className="p-3 bg-light rounded border text-center">
                        <img
                          src={formData.branding.faviconUrl}
                          alt="Favicon Preview"
                          style={{ height: '32px', width: '32px' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. HOMEPAGE */}
            {activeTab === 'homepage' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Homepage Content & Section Visibility</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Hero Heading (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.homepage?.heroTitle?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homepage: {
                            ...formData.homepage,
                            heroTitle: { ...formData.homepage.heroTitle, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">मुख्य शीर्षक (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.homepage?.heroTitle?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homepage: {
                            ...formData.homepage,
                            heroTitle: { ...formData.homepage.heroTitle, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Hero Subtitle (English)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.homepage?.heroSubtitle?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homepage: {
                            ...formData.homepage,
                            heroSubtitle: { ...formData.homepage.heroSubtitle, en: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">उपशीर्षक (मराठी)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.homepage?.heroSubtitle?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homepage: {
                            ...formData.homepage,
                            heroSubtitle: { ...formData.homepage.heroSubtitle, mr: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Hero Background Image URL</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={formData.homepage?.heroImageUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homepage: { ...formData.homepage, heroImageUrl: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <h6 className="fw-bold text-dark mb-2">Homepage Sections Toggle</h6>
                <div className="row g-2 p-3 bg-light rounded border mb-3">
                  {[
                    { key: 'about', label: 'About Section (आमच्याबद्दल)' },
                    { key: 'services', label: 'Services Showcase (सेवा)' },
                    { key: 'packages', label: 'Packages Section (पॅकेजेस)' },
                    { key: 'gallery', label: 'Photo Gallery (गॅलरी)' },
                    { key: 'awards', label: 'Awards & Honors (पुरस्कार)' },
                    { key: 'reviews', label: 'Customer Reviews (अभिप्राय)' },
                    { key: 'contactCta', label: 'Contact CTA Banner (संपर्क)' },
                  ].map((sec) => (
                    <div className="col-12 col-md-4" key={sec.key}>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`sec-${sec.key}`}
                          checked={formData.homepage?.sectionsVisibility?.[sec.key] ?? true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              homepage: {
                                ...formData.homepage,
                                sectionsVisibility: {
                                  ...formData.homepage.sectionsVisibility,
                                  [sec.key]: e.target.checked,
                                },
                              },
                            })
                          }
                        />
                        <label className="form-check-label small fw-semibold" htmlFor={`sec-${sec.key}`}>
                          {sec.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. FOOTER */}
            {activeTab === 'footer' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Footer Content</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Footer About Summary (English)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.footer?.aboutText?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            aboutText: { ...formData.footer.aboutText, en: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">फूटर माहिती (मराठी)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.footer?.aboutText?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            aboutText: { ...formData.footer.aboutText, mr: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Copyright Text (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.footer?.copyrightText?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            copyrightText: { ...formData.footer.copyrightText, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">कॉपीराइट मजकूर (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.footer?.copyrightText?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: {
                            ...formData.footer,
                            copyrightText: { ...formData.footer.copyrightText, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. SOCIAL LINKS */}
            {activeTab === 'social' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Social Media Links</h5>
                <p className="text-muted small">Enable or update URLs for social media accounts.</p>
                <div className="row g-3">
                  {(formData.socialLinks || []).map((item, idx) => (
                    <div className="col-12 col-md-6" key={item.platform || idx}>
                      <div className="card p-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold text-capitalize">
                            <i className={`bi bi-${item.platform} me-2 text-primary`}></i>
                            {item.platform}
                          </span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item.enabled}
                              onChange={(e) => {
                                const copy = [...formData.socialLinks];
                                copy[idx].enabled = e.target.checked;
                                setFormData({ ...formData, socialLinks: copy });
                              }}
                            />
                          </div>
                        </div>
                        <input
                          type="url"
                          className="form-control form-control-sm"
                          placeholder="https://..."
                          value={item.url}
                          onChange={(e) => {
                            const copy = [...formData.socialLinks];
                            copy[idx].url = e.target.value;
                            setFormData({ ...formData, socialLinks: copy });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. SEO SETTINGS */}
            {activeTab === 'seo' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Search Engine Optimization (SEO) Defaults</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Default Meta Title (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.seo?.metaTitle?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaTitle: { ...formData.seo.metaTitle, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">एसईओ शीर्षक (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.seo?.metaTitle?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaTitle: { ...formData.seo.metaTitle, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Meta Description (English)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.seo?.metaDescription?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaDescription: { ...formData.seo.metaDescription, en: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">मेटा वर्णन (मराठी)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={formData.seo?.metaDescription?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaDescription: { ...formData.seo.metaDescription, mr: e.target.value },
                          },
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Canonical Domain URL</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://aditicaterers.in"
                      value={formData.seo?.canonicalUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, canonicalUrl: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 9. ENQUIRY FORM SETTINGS */}
            {activeTab === 'enquiry' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Public Enquiry Form Configuration</h5>
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enquiryEnabled"
                    checked={formData.enquiry?.enabled ?? true}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enquiry: { ...formData.enquiry, enabled: e.target.checked },
                      })
                    }
                  />
                  <label className="form-check-label fw-semibold" htmlFor="enquiryEnabled">
                    Accept Public Online Enquiries
                  </label>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Form Heading (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.enquiry?.heading?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enquiry: {
                            ...formData.enquiry,
                            heading: { ...formData.enquiry.heading, en: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">फॉर्म शीर्षक (मराठी)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.enquiry?.heading?.mr || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enquiry: {
                            ...formData.enquiry,
                            heading: { ...formData.enquiry.heading, mr: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 10. NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Enquiry Alerts & Notification Routing</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="card p-3 border">
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="emailNotif"
                          checked={formData.notifications?.adminEmailNotification ?? true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                adminEmailNotification: e.target.checked,
                              },
                            })
                          }
                        />
                        <label className="form-check-label fw-semibold" htmlFor="emailNotif">
                          Email Notification for New Enquiries
                        </label>
                      </div>
                      <label className="form-label small text-muted">Admin Recipient Email</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={formData.notifications?.adminEmailRecipient || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              adminEmailRecipient: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="card p-3 border">
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="waNotif"
                          checked={formData.notifications?.whatsappNotification ?? true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                whatsappNotification: e.target.checked,
                              },
                            })
                          }
                        />
                        <label className="form-check-label fw-semibold" htmlFor="waNotif">
                          WhatsApp Alert for New Enquiries
                        </label>
                      </div>
                      <label className="form-label small text-muted">WhatsApp Phone Number</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formData.notifications?.whatsappRecipient || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              whatsappRecipient: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Form Actions */}
            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReset}
                disabled={saving}
              >
                {ws.resetBtn || 'Reset to Saved'}
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-1"></i>
                    {ws.saveBtn || 'Save Changes'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
