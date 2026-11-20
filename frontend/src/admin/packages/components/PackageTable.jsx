export default function PackageTable({
  packages,
  onEdit,
  onPreview,
  onPublish,
  onUnpublish,
  onArchive,
  onRestore,
  onReorder,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return (
          <span className="badge bg-success-subtle text-success border border-success-subtle">
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
            Draft
          </span>
        );
      case 'unpublished':
        return (
          <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle">
            Unpublished
          </span>
        );
      case 'archived':
        return <span className="badge bg-secondary-subtle text-secondary border">Archived</span>;
      default:
        return <span className="badge bg-light text-dark border">{status}</span>;
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light border-bottom">
            <tr>
              <th scope="col" className="ps-4" style={{ width: '80px' }}>Order</th>
              <th scope="col" style={{ width: '64px' }}>Image</th>
              <th scope="col">Package Name</th>
              <th scope="col">Guest Capacity</th>
              <th scope="col">Price & Basis</th>
              <th scope="col">Service Type</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => {
              const updatedStr = pkg.updatedAt
                ? new Date(pkg.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              const priceStr =
                pkg.price?.amount > 0
                  ? `₹${Number(pkg.price.amount).toLocaleString('en-IN')}`
                  : 'Contact for Quote';

              const basisStr =
                pkg.price?.pricingBasis === 'per_person'
                  ? 'Per Person / Plate'
                  : pkg.price?.amount > 0
                  ? `Fixed for ${pkg.guestCount?.fixed || 100} guests`
                  : 'Custom';

              const isWithMaterial = (pkg.serviceTypes || []).includes('with_material');
              const isWithoutMaterial = (pkg.serviceTypes || []).includes('without_material');

              return (
                <tr key={pkg.id}>
                  {/* Order & Reorder */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold text-dark me-1" style={{ width: '20px' }}>
                        {pkg.displayOrder}
                      </span>
                      <div className="btn-group-vertical btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(pkg.id, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          aria-label={`Move ${pkg.name?.en} up`}
                        >
                          <i className="bi bi-chevron-up"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-light text-secondary p-0"
                          style={{ fontSize: '0.65rem', lineHeight: 1 }}
                          onClick={() => onReorder(pkg.id, 'down')}
                          disabled={index === packages.length - 1}
                          title="Move Down"
                          aria-label={`Move ${pkg.name?.en} down`}
                        >
                          <i className="bi bi-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td>
                    {pkg.image?.url ? (
                      <img
                        src={pkg.image.url}
                        alt={pkg.image?.alt?.en || pkg.name?.en}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '44px', height: '44px' }}
                      />
                    ) : (
                      <div
                        className="rounded-3 bg-light border d-flex align-items-center justify-content-center text-muted"
                        style={{ width: '44px', height: '44px', fontSize: '1.1rem' }}
                      >
                        <i className="bi bi-box-seam"></i>
                      </div>
                    )}
                  </td>

                  {/* Package Name */}
                  <td>
                    <div className="fw-bold text-dark d-flex align-items-center gap-1">
                      <span>{pkg.name?.en || 'Untitled Package'}</span>
                      {pkg.featured && (
                        <span className="badge bg-danger-subtle text-danger" style={{ fontSize: '0.65rem' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>
                      {pkg.name?.mr || <span className="text-warning fst-italic">मराठी नाव बाकी</span>}
                    </div>
                  </td>

                  {/* Guest Capacity */}
                  <td>
                    <span className="small text-dark fw-medium">
                      {pkg.guestCount?.fixed ? `${pkg.guestCount.fixed} Guests` : `${pkg.guestCount?.min || 50} - ${pkg.guestCount?.max || 1000}`}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <div className="fw-bold text-dark">{priceStr}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      {basisStr}
                    </div>
                  </td>

                  {/* Service Type */}
                  <td>
                    <div className="d-flex flex-column gap-1">
                      {isWithMaterial && (
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle" style={{ fontSize: '0.7rem' }}>
                          With Material
                        </span>
                      )}
                      {isWithoutMaterial && (
                        <span className="badge bg-secondary-subtle text-secondary border" style={{ fontSize: '0.7rem' }}>
                          Without Material
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(pkg.status)}</td>

                  {/* Updated */}
                  <td className="small text-muted">{updatedStr}</td>

                  {/* Actions */}
                  <td className="text-end pe-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Package actions">
                      {/* Preview */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onPreview(pkg)}
                        title="Preview Public Package"
                        aria-label={`Preview ${pkg.name?.en}`}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => onEdit(pkg)}
                        title="Edit Package"
                        aria-label={`Edit ${pkg.name?.en}`}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      {/* Publish / Unpublish */}
                      {pkg.status === 'published' ? (
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={() => onUnpublish(pkg)}
                          title="Unpublish Package"
                          aria-label={`Unpublish ${pkg.name?.en}`}
                        >
                          <i className="bi bi-eye-slash-fill"></i>
                        </button>
                      ) : pkg.status !== 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onPublish(pkg)}
                          title="Publish Package"
                          aria-label={`Publish ${pkg.name?.en}`}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                        </button>
                      ) : null}

                      {/* Archive / Restore */}
                      {pkg.status === 'archived' ? (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() => onRestore(pkg)}
                          title="Restore Package"
                          aria-label={`Restore ${pkg.name?.en}`}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => onArchive(pkg)}
                          title="Archive Package"
                          aria-label={`Archive ${pkg.name?.en}`}
                        >
                          <i className="bi bi-archive-fill"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
