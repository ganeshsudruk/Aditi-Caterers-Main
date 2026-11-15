/**
 * SectionHeading Component
 * Standardized heading across all public sections.
 * 
 * Props:
 * - tag: Optional pill badge / subtitle text
 * - title: Main H2 title
 * - description: Optional supporting descriptive sentence
 * - centered: Boolean (defaults to true)
 * - light: Boolean (for dark / maroon backgrounds)
 */
export default function SectionHeading({
  tag,
  title,
  description,
  centered = true,
  light = false,
  className = '',
}) {
  return (
    <div
      className={`ac-section-header ${centered ? 'text-center mx-auto' : ''} ${className}`}
      style={{ maxWidth: '780px' }}
    >
      {tag && (
        <span className={`ac-section-badge ${light ? 'ac-badge-light' : ''}`}>
          {tag}
        </span>
      )}
      <h2 className={`ac-section-title ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`ac-section-desc ${light ? 'text-white-50' : ''}`}>
          {description}
        </p>
      )}
      <div className={`ac-heading-line ${centered ? 'mx-auto' : ''} ${light ? 'ac-line-light' : ''}`} />
    </div>
  );
}
