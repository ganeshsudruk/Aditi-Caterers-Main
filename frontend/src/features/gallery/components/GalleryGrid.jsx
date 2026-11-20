import GalleryCard from './GalleryCard';
import GalleryEmptyState from './GalleryEmptyState';

export default function GalleryGrid({
  items = [],
  onOpenLightbox,
  categoryMap = {},
  onResetCategory,
}) {
  if (items.length === 0) {
    return <GalleryEmptyState onReset={onResetCategory} />;
  }

  return (
    <div className="row g-4" aria-label="Photo Gallery Grid">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id || index}
          item={item}
          categoryName={categoryMap[item.category]}
          onClick={() => onOpenLightbox(index)}
        />
      ))}
    </div>
  );
}
