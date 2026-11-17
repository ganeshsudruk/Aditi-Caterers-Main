import { useLanguage } from '../../../context/LanguageContext';
import AwardCard from './AwardCard';
import AwardsEmptyState from './AwardsEmptyState';
import SectionHeading from '../../../components/common/SectionHeading';

/** Skeleton card shown while loading */
function AwardSkeleton() {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="ac-award-skeleton shadow-sm">
        <div className="ac-skeleton-img" />
        <div className="p-4">
          <div className="ac-skeleton-line" style={{ width: '40%' }} />
          <div className="ac-skeleton-line" style={{ width: '70%' }} />
          <div className="ac-skeleton-line" style={{ width: '90%' }} />
          <div className="ac-skeleton-line" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

export default function AwardsGrid({ awards, loading, onViewAward }) {
  const { language, t } = useLanguage();
  const gallery = t.awardsPage?.gallery || {};

  return (
    <section
      className="py-5"
      style={{ backgroundColor: 'var(--ac-bg-light, #fdf8f0)' }}
      aria-label="Awards Gallery"
      id="awards-gallery"
    >
      <div className="container-xl py-2">
        <SectionHeading
          tag={gallery.tag || (language === 'mr' ? 'सन्मान आणि प्रमाणपत्रे' : 'Honors & Certificates')}
          title={gallery.heading || (language === 'mr' ? 'आमचे पुरस्कार आणि सन्मान' : 'Our Awards & Recognitions')}
          description={gallery.description || (language === 'mr'
            ? 'केटरिंग क्षेत्रातील आमच्या सर्वात अभिमानास्पद कामगिरींचा संग्रह.'
            : 'A collection of our proudest achievements in the catering industry.')}
          centered={true}
        />

        <div className="row g-4 mt-2">
          {loading ? (
            /* Skeleton placeholders */
            [1, 2, 3].map((n) => <AwardSkeleton key={n} />)
          ) : awards.length === 0 ? (
            /* Empty state */
            <div className="col-12">
              <AwardsEmptyState />
            </div>
          ) : (
            /* Award cards */
            awards.map((award) => (
              <AwardCard
                key={award._id || award.id}
                award={award}
                onView={onViewAward}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
