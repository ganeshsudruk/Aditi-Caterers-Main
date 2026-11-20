export default function GalleryLoader() {
  return (
    <div className="row g-4" role="status" aria-label="Loading gallery images">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="col-12 col-sm-6 col-lg-4">
          <div className="ac-gallery-skeleton-card">
            <div className="ac-gallery-skeleton-img" />
            <div className="p-3">
              <div className="ac-gallery-skeleton-line" style={{ width: '65%' }} />
              <div className="ac-gallery-skeleton-line" style={{ width: '90%' }} />
              <div className="ac-gallery-skeleton-line" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
