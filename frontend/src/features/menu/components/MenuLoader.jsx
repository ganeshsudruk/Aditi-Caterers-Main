export default function MenuLoader() {
  return (
    <div className="container-xl py-5 text-center">
      <div
        className="spinner-border"
        style={{ color: 'var(--ac-maroon, #641e2b)', width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted small">Loading menu…</p>
    </div>
  );
}
