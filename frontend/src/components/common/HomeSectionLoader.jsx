export default function HomeSectionLoader({ message = 'Loading...' }) {
  return (
    <div className="py-5 text-center my-4">
      <div className="spinner-border text-maroon" role="status" style={{ color: 'var(--ac-maroon)' }}>
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted small">{message}</p>
    </div>
  );
}
