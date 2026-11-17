import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useMenuSelection } from '../../../context/MenuSelectionContext';

export default function SelectedMenuDrawer() {
  const { language, t } = useLanguage();
  const {
    selectedItems,
    selectedCount,
    removeItem,
    clearMenu,
    groupedByCourse,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useMenuSelection();

  if (selectedCount === 0) return null;

  const drawerText = t.menuPage?.drawer || {};
  const trayTitle = drawerText.trayTitle || (language === 'mr' ? 'तुमचा निवडलेला मेनू' : 'Your Event Shortlist');
  const viewBtn = drawerText.viewBtn || (language === 'mr' ? 'मेनू पहा' : 'View Menu');
  const clearBtn = drawerText.clearBtn || (language === 'mr' ? 'सर्व काढा' : 'Clear All');
  const enquireBtn = drawerText.enquireBtn || (language === 'mr' ? 'या मेनूसाठी चौकशी करा' : 'Enquire for this Menu');
  const itemsLabel = language === 'mr' ? 'पदार्थ निवडले' : 'items selected';

  // Construct items query string for booking
  const itemNames = selectedItems.map((i) => i.name[language] || i.name.en).join(', ');
  const bookingUrl = `/booking?selectedDishes=${encodeURIComponent(itemNames)}`;

  // WhatsApp Enquiry Link
  const waMessage =
    language === 'mr'
      ? `नमस्कार अदिती केटरर्स, मी वेबसाइटवरून माझ्या कार्यक्रमासाठी खालील मेनू निवडला आहे:\n${selectedItems
          .map((i, idx) => `${idx + 1}. ${i.name.mr}`)
          .join('\n')}\n\nकृपया या मेनूसाठी कोटेशन द्यावे.`
      : `Hello Aditi Caterers, I shortlisted the following dishes on your website for my event:\n${selectedItems
          .map((i, idx) => `${idx + 1}. ${i.name.en}`)
          .join('\n')}\n\nPlease share availability and quotation.`;

  const waUrl = `https://wa.me/919975959391?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      {/* 1. Floating Bottom Tray */}
      <div className="ac-shortlist-tray">
        <div className="d-flex align-items-center gap-2">
          <span className="ac-shortlist-counter">{selectedCount}</span>
          <div className="d-none d-sm-block">
            <span className="fw-bold text-dark d-block" style={{ fontSize: '0.85rem' }}>
              {trayTitle}
            </span>
            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
              {selectedCount} {itemsLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-maroon px-3 py-1 rounded-pill text-white fw-semibold"
          style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <i className="bi bi-list-check me-1" />
          <span>{viewBtn}</span>
        </button>
      </div>

      {/* 2. Slide-over Drawer & Backdrop */}
      {isDrawerOpen && (
        <>
          <div
            className="ac-shortlist-drawer-backdrop"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          <aside className="ac-shortlist-drawer" aria-label="Selected Event Menu Drawer">
            {/* Header */}
            <div className="ac-drawer-header d-flex align-items-center justify-content-between">
              <div>
                <h2 className="h5 fw-bold mb-0 text-white d-flex align-items-center gap-2">
                  <i className="bi bi-journal-bookmark-fill text-gold" />
                  <span>{trayTitle}</span>
                </h2>
                <span className="text-white-50 small">
                  {selectedCount} {itemsLabel}
                </span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="ac-drawer-body">
              {Object.keys(groupedByCourse).map((catSlug) => {
                const groupItems = groupedByCourse[catSlug];
                return (
                  <div key={catSlug} className="mb-4">
                    <span className="badge bg-light text-maroon border px-3 py-1 rounded-pill fw-semibold small mb-2 text-uppercase">
                      {catSlug}
                    </span>
                    <div className="d-flex flex-column">
                      {groupItems.map((item) => (
                        <div key={item.id} className="ac-drawer-item-row">
                          <div className="d-flex align-items-center gap-2 text-truncate pe-2">
                            <span className="ac-veg-symbol flex-shrink-0" />
                            <span className="text-dark small fw-medium text-truncate">
                              {item.name[language] || item.name.en}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-link text-danger p-0"
                            onClick={() => removeItem(item.id)}
                            title="Remove"
                            aria-label={`Remove ${item.name[language] || item.name.en}`}
                          >
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="ac-drawer-footer">
              <div className="d-flex flex-column gap-2">
                <Link
                  to={bookingUrl}
                  className="btn btn-maroon w-100 py-2 rounded-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  style={{ backgroundColor: 'var(--ac-maroon, #641e2b)' }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <i className="bi bi-calendar2-check-fill" />
                  <span>{enquireBtn}</span>
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success w-100 py-2 rounded-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-whatsapp" />
                  <span>{language === 'mr' ? 'WhatsApp वर मेनू पाठवा' : 'Send Menu on WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary w-100 mt-1 py-1 rounded-pill"
                  onClick={clearMenu}
                >
                  <i className="bi bi-trash me-1" />
                  <span>{clearBtn}</span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
