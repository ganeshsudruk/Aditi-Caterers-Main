export default function AboutSectionLoader({ message = 'Loading...' }) {
  return (
    <div className="py-5 text-center my-4" role="status">
      <div
        className="spinner-border"
        style={{ color: 'var(--ac-maroon)', width: '2.5rem', height: '2.5rem' }}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted small">{message}</p>
    </div>
  );
}
