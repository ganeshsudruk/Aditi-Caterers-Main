import { useLanguage } from '../../../context/LanguageContext';
import { foodPreferencesList, mealTypesList } from '../../../services/bookingService';

export default function PackageMenuPreferencesForm({
  formData,
  onChange,
  packages = [],
}) {
  const { language, t } = useLanguage();
  const sec = t.bookingPage?.sections || {};
  const f = t.bookingPage?.fields || {};

  return (
    <div className="ac-form-section">
      <h2 className="ac-form-section-title">
        <i className="bi bi-egg-fried" aria-hidden="true" />
        <span>{sec.packageMenu || (language === 'mr' ? 'पॅकेज आणि मेनू पसंती' : 'Package & Menu Preferences')}</span>
      </h2>
      <p className="ac-form-section-desc">
        {sec.packageMenuDesc || (language === 'mr' ? 'उपलब्ध पॅकेज निवडा किंवा आवश्यक पदार्थांची यादी द्या.' : 'Select an existing package or specify your desired menu items.')}
      </p>

      <div className="row g-3">
        {/* Package Selection */}
        <div className="col-12 col-md-6">
          <label htmlFor="packageId" className="form-label">
            {f.package || (language === 'mr' ? 'पॅकेज निवड (पर्यायी)' : 'Package Selection (Optional)')}
          </label>
          <select
            id="packageId"
            name="packageId"
            className="form-select"
            value={formData.packageId}
            onChange={onChange}
          >
            <option value="">
              {f.selectPackage || (language === 'mr' ? '-- पॅकेज निवडा --' : '-- Select a Package --')}
            </option>
            <option value="custom">
              {f.customPackage || (language === 'mr' ? 'कस्टम पॅकेज / विशेष कोटेशन' : 'Custom Package / Custom Quotation')}
            </option>
            <option value="need-guidance">
              {f.needGuidancePackage || (language === 'mr' ? 'निश्चित नाही / मार्गदर्शन हवे आहे' : 'Not Sure / Need Guidance')}
            </option>
            {packages.map((pkg) => {
              const pkgName = pkg.name?.[language] || pkg.name?.en || pkg.slug;
              return (
                <option key={pkg.id || pkg.slug} value={pkg.slug || pkg.id}>
                  {pkgName}
                </option>
              );
            })}
          </select>
        </div>

        {/* Food Preference */}
        <div className="col-12 col-md-6">
          <label htmlFor="foodPreference" className="form-label">
            {f.foodPreference || (language === 'mr' ? 'खाद्यपदार्थ पसंती' : 'Food Preference')}
          </label>
          <select
            id="foodPreference"
            name="foodPreference"
            className="form-select"
            value={formData.foodPreference}
            onChange={onChange}
          >
            {foodPreferencesList.map((fp) => (
              <option key={fp.id} value={fp.id}>
                {fp.label[language] || fp.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Meal Type */}
        <div className="col-12 col-md-6">
          <label htmlFor="mealType" className="form-label">
            {f.mealType || (language === 'mr' ? 'जेवणाचा प्रकार (पर्यायी)' : 'Meal Type (Optional)')}
          </label>
          <select
            id="mealType"
            name="mealType"
            className="form-select"
            value={formData.mealType}
            onChange={onChange}
          >
            <option value="">
              {f.selectMealType || (language === 'mr' ? '-- जेवणाचा प्रकार निवडा --' : '-- Select Meal Type --')}
            </option>
            {mealTypesList.map((mt) => (
              <option key={mt.id} value={mt.id}>
                {mt.label[language] || mt.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Special Dietary / Fasting Requirements */}
        <div className="col-12 col-md-6">
          <label htmlFor="specialDietary" className="form-label">
            {f.specialDietary || (language === 'mr' ? 'विशेष आहार / उपवास गरजा (पर्यायी)' : 'Special Dietary / Fasting Requirements (Optional)')}
          </label>
          <input
            type="text"
            id="specialDietary"
            name="specialDietary"
            className="form-control"
            placeholder={f.specialDietaryPlaceholder || 'e.g. Jain food for 20 guests, Upvas items'}
            value={formData.specialDietary}
            onChange={onChange}
          />
        </div>

        {/* Selected Dishes (pre-filled or free text) */}
        <div className="col-12">
          <label htmlFor="selectedDishes" className="form-label">
            {f.selectedDishes || (language === 'mr' ? 'आवडते / आवश्यक खाद्यपदार्थ (पर्यायी)' : 'Selected / Desired Dishes (Optional)')}
          </label>
          <textarea
            id="selectedDishes"
            name="selectedDishes"
            rows="2"
            className="form-control"
            placeholder={f.selectedDishesPlaceholder || 'List dishes you would like (e.g. Puran Poli, Ukadiche Modak, Paneer Butter Masala)'}
            value={formData.selectedDishes}
            onChange={onChange}
          />
          <div className="form-text small text-muted">
            {language === 'mr'
              ? 'तुम्ही आमच्या फूड मेनूमधून शॉर्टलिस्ट केलेले पदार्थ येथे आपोआप दिसतील किंवा स्वतः लिहू शकता.'
              : 'Dishes shortlisted from our Food Menu will appear here automatically, or you can type your preferred dishes.'}
          </div>
        </div>
      </div>
    </div>
  );
}
