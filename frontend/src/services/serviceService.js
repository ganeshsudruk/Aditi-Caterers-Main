import api from './api';

export const defaultServices = [
  {
    id: 'wedding',
    slug: 'wedding',
    sortOrder: 1,
    isActive: true,
    isFeatured: true,
    icon: 'bi-heart-fill',
    name: {
      en: 'Wedding Catering',
      mr: 'लग्न समारंभ केटरिंग',
    },
    heroHeading: {
      en: 'Wedding Catering Services',
      mr: 'लग्न समारंभासाठी केटरिंग सेवा',
    },
    shortDescription: {
      en: 'Plan your wedding food arrangements with catering options suitable for your celebration and guest requirements.',
      mr: 'तुमच्या लग्नसोहळ्यासाठी कार्यक्रम आणि पाहुण्यांच्या गरजेनुसार योग्य केटरिंग व्यवस्थेचे नियोजन करा.',
    },
    fullDescription: {
      en: 'Make your wedding celebration special with catering arrangements planned according to your event requirements, guest count, and food preferences. From welcome drinks to authentic Maharashtrian feasts and multi-course dining, we ensure seamless hospitality for you and your guests.',
      mr: 'तुमच्या लग्नसोहळ्यासाठी कार्यक्रमाचे स्वरूप, पाहुण्यांची संख्या आणि खाद्यपदार्थांची पसंती लक्षात घेऊन केटरिंग व्यवस्थेचे नियोजन करा. स्वागत पेयांपासून ते अस्सल महाराष्ट्रीयन जेवण आणि विविध पक्वान्नांपर्यंत आम्ही सर्व पाहुण्यांसाठी उत्तम व्यवस्था करतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Wedding catering feast arrangement',
        mr: 'लग्न समारंभ केटरिंग व्यवस्था',
      },
    },
    eventRequirements: {
      en: [
        'Expected guest count discussion (50 to 1000+ guests)',
        'Selection of catering type (With Material or Without Material)',
        'Timeline scheduling (Breakfast, Muhurat lunch, Evening snacks, Reception dinner)',
        'Venue layout & dining setup (Buffet counters, seated dining, live food stalls)',
        'Customized sweet & dessert preferences',
      ],
      mr: [
        'अपेक्षित पाहुण्यांची संख्या (५० ते १०००+ पाहुणे)',
        'केटरिंग प्रकाराची निवड (साहित्यासह किंवा साहित्याशिवाय)',
        'वेळापत्रक नियोजन (सकाळचा नाश्ता, मुहूर्ताचे जेवण, संध्याकाळचा नाश्ता, रिसेप्शन डिनर)',
        'जागेचे स्वरूप व मांडणी (बुफे काउंटर, पंगत मांडणी, थेट फूड स्टॉल्स)',
        'मिठाई आणि गोड पदार्थांची पसंती',
      ],
    },
    menuCategories: [
      { id: 'welcomeDrinks', en: 'Welcome Drinks', mr: 'स्वागत पेये', icon: 'bi-cup-straw' },
      { id: 'starters', en: 'Starters & Snacks', mr: 'स्टार्टर्स व नाश्ता', icon: 'bi-egg-fried' },
      { id: 'maharashtrian', en: 'Maharashtrian Special', mr: 'अस्सल महाराष्ट्रीयन', icon: 'bi-fire' },
      { id: 'punjabi', en: 'Punjabi & North Indian', mr: 'पंजाबी व उत्तर भारतीय', icon: 'bi-grid' },
      { id: 'mainCourse', en: 'Main Course & Breads', mr: 'मुख्य जेवण व पोळी/रोटी', icon: 'bi-basket' },
      { id: 'desserts', en: 'Traditional Sweets & Desserts', mr: 'पारंपारिक मिठाई व गोड पदार्थ', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Initial Consultation', desc: 'Discuss your wedding date, muhurat timing, estimated guest count, and catering preference.' },
        { title: 'Menu Curation', desc: 'Customize welcome drinks, breakfast, lunch, and dinner menus suited to your traditions.' },
        { title: 'Logistics Planning', desc: 'Coordinate kitchen space, buffet tables, serving staff, and equipment requirements.' },
        { title: 'Live Execution', desc: 'Punctual, hygienic, and warm food preparation and guest serving on the wedding day.' },
      ],
      mr: [
        { title: 'सुरुवातीची चर्चा', desc: 'लग्नाची तारीख, मुहूर्ताची वेळ, पाहुण्यांची संख्या आणि केटरिंग पर्यायांवर सविस्तर चर्चा.' },
        { title: 'मेनू निवड', desc: 'तुमच्या परंपरेनुसार स्वागत पेये, नाश्ता, जेवण आणि पक्वान्नांचा मेनू तयार करणे.' },
        { title: 'जागेचे नियोजन', desc: 'स्वयंपाकघर, बुफे काउंटर, वाढपी पथक आणि आवश्यक साधनांचे पूर्व-नियोजन.' },
        { title: 'उत्तम व्यवस्था', desc: 'लग्नाच्या दिवशी वेळेवर, स्वच्छतेत आणि आदरपूर्वक जेवण बनवून पाहुण्यांचे आदरातिथ्य.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Grand Wedding Dining Setup', mr: 'भव्य लग्न जेवण मांडणी' },
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Buffet Catering Counters', mr: 'बुफे केटरिंग काउंटर्स' },
      },
      {
        url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Authentic Maharashtrian Feast', mr: 'अस्सल महाराष्ट्रीयन जेवण' },
      },
      {
        url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Wedding Sweets & Desserts', mr: 'समारंभातील मिठाया' },
      },
    ],
    faqs: [
      {
        q: { en: 'Do you offer both With Material and Without Material options for weddings?', mr: 'लग्नासाठी साहित्यासह आणि साहित्याशिवाय दोन्ही पर्याय उपलब्ध आहेत का?' },
        a: {
          en: 'Yes. You can opt for Catering With Material (where we source and manage all agreed food materials) or Catering Without Material (where you provide the raw materials according to our ingredient list and our team handles the cooking and service).',
          mr: 'होय. तुम्ही साहित्यासह केटरिंग (सर्व ठरलेले साहित्य आम्ही आणतो) किंवा साहित्याशिवाय केटरिंग (साहित्य तुम्ही आणून देता आणि आमचे महाराज स्वयंपाक व वाढप करतात) दोन्हीपैकी योग्य पर्याय निवडू शकता.',
        },
      },
      {
        q: { en: 'How early should we book wedding catering?', mr: 'लग्नाचे केटरिंग किती दिवस आधी बुक करावे?' },
        a: {
          en: 'We recommend booking 3 to 6 weeks in advance, especially during the auspicious wedding season, to reserve dates and finalize menu arrangements.',
          mr: 'विशेषतः लग्नसराईच्या काळात तारखा राखीव ठेवण्यासाठी आणि मेनूचे नियोजन करण्यासाठी किमान ३ ते ६ आठवडे आधी संपर्क साधण्याचा सल्ला आम्ही देतो.',
        },
      },
      {
        q: { en: 'Can we customize the wedding menu according to our family traditions?', mr: 'आम्ही आमच्या कौटुंबिक पद्धतीनुसार लग्न मेनू बदलू शकतो का?' },
        a: {
          en: 'Absolutely. We specialize in tailored menus including traditional Maharashtrian, North Indian, and fusion dishes tailored to your family preferences.',
          mr: 'नक्कीच. आम्ही तुमच्या कौटुंबिक पसंतीनुसार अस्सल महाराष्ट्रीयन, उत्तर भारतीय आणि इतर पक्वान्नांचा मेनू तयार करून देतो.',
        },
      },
    ],
  },
  {
    id: 'birthday',
    slug: 'birthday',
    sortOrder: 2,
    isActive: true,
    isFeatured: true,
    icon: 'bi-balloon-fill',
    name: {
      en: 'Birthday Catering',
      mr: 'वाढदिवस समारंभ केटरिंग',
    },
    heroHeading: {
      en: 'Birthday Catering Services',
      mr: 'वाढदिवसासाठी केटरिंग सेवा',
    },
    shortDescription: {
      en: 'Arrange food and catering services for birthday celebrations of different sizes.',
      mr: 'लहान किंवा मोठ्या वाढदिवसाच्या कार्यक्रमांसाठी जेवण आणि केटरिंगची व्यवस्था करा.',
    },
    fullDescription: {
      en: 'Celebrate birthdays with food arrangements planned according to your guest count, event preferences, and selected menu. Whether it is an intimate kids party, milestone 50th or 75th birthday, or evening family celebration, we deliver fresh, flavorful food that all age groups enjoy.',
      mr: 'पाहुण्यांची संख्या, कार्यक्रमाची गरज आणि निवडलेला मेनू लक्षात घेऊन वाढदिवसासाठी जेवणाची व्यवस्था करा. मुलांच्या वाढदिवसाचा नाश्ता असो किंवा ५० व्या/७५ व्या वाढदिवसाचे कौटुंबिक जेवण, सर्व वयोगटातील पाहुण्यांना आवडेल अशा स्वादिष्ट अन्नाची उत्तम सोय आम्ही करतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Birthday party celebration catering',
        mr: 'वाढदिवस केटरिंग व्यवस्था',
      },
    },
    eventRequirements: {
      en: [
        'Expected guest count (kids & adults)',
        'Timing preference (Evening high tea, snack counters, or dinner buffet)',
        'Kids-friendly food options alongside traditional courses',
        'Serving model (Self-service buffet or attended counters)',
        'Selection of catering type (With or Without Material)',
      ],
      mr: [
        'अपेक्षित पाहुण्यांची संख्या (मुले आणि मोठे पाहुणे)',
        'वेळेची निवड (संध्याकाळचा नाश्ता, स्नॅक्स काउंटर किंवा रात्रीचे जेवण)',
        'लहान मुलांच्या आवडीचे हलके पदार्थ आणि मुख्य जेवण',
        'वाढप पद्धत (सेल्फ-सर्व्हिस बुफे किंवा वाढपी व्यवस्था)',
        'केटरिंग प्रकाराची निवड (साहित्यासह किंवा साहित्याशिवाय)',
      ],
    },
    menuCategories: [
      { id: 'starters', en: 'Appetizers & Quick Bites', mr: 'खमंग स्टार्टर्स व स्नॅक्स', icon: 'bi-egg-fried' },
      { id: 'streetFood', en: 'Chaat & Snack Counters', mr: 'चाट व नाश्ता पर्याय', icon: 'bi-cup-straw' },
      { id: 'mainCourse', en: 'Dinner / Lunch Specials', mr: 'जेवणाचा मुख्य मेनू', icon: 'bi-basket' },
      { id: 'desserts', en: 'Ice Creams & Sweets', mr: 'आईस्क्रीम व गोड पदार्थ', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Discuss Party Concept', desc: 'Share your party size, timing, and preferred food styles (snacks or full meal).' },
        { title: 'Custom Menu Design', desc: 'Combine crowd-pleasing snacks, main dishes, and delightful desserts.' },
        { title: 'On-time Setup', desc: 'Punctual setup of live snack stalls or dinner buffet counters before guests arrive.' },
        { title: 'Hassle-free Service', desc: 'Warm hospitality ensuring your family enjoys the celebration stress-free.' },
      ],
      mr: [
        { title: 'संकल्पनेवर चर्चा', desc: 'कार्यक्रमाची वेळ, पाहुण्यांची संख्या आणि मेनूचे स्वरूप (स्नॅक्स की पूर्ण जेवण) ठरवणे.' },
        { title: 'मेनू निवड', desc: 'मुले आणि मोठ्यांना आवडतील असे चटपटीत स्टार्टर्स आणि स्वादिष्ट जेवणाची निवड.' },
        { title: 'वेळेवर मांडणी', desc: 'पाहुणे येण्यापूर्वी नाश्ता आणि जेवणाचे काउंटर्स वेळेवर तयार ठेवणे.' },
        { title: 'तणावमुक्त सोहळा', desc: 'तुम्ही आणि तुमचे कुटुंबीय वाढदिवसाचा आनंद निश्चिंतपणे घेऊ शकाल अशी तत्पर सेवा.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Celebration Feast Atmosphere', mr: 'वाढदिवसाचे उत्सवी वातावरण' },
      },
      {
        url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Hot Starters & Evening Bites', mr: 'खमंग स्टार्टर्स व स्नॅक्स' },
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Party Buffet Arrangement', mr: 'पार्टी बुफे मांडणी' },
      },
    ],
    faqs: [
      {
        q: { en: 'Do you provide cake, entertainment, or venue decoration?', mr: 'तुम्ही केक, मनोरंजन किंवा हॉल सजावट देता का?' },
        a: {
          en: 'No, we specialize exclusively in catering food preparation and dining service. Decorations, cakes, and entertainment are managed by the host or separate event planners.',
          mr: 'नाही, आम्ही केवळ खाद्यपदार्थ तयार करणे आणि केटरिंग सेवेवर भर देतो. केक, सजावट व मनोरंजन व्यवस्था आयोजक अथवा स्वतंत्र इव्हेंट प्लॅनर करतात.',
        },
      },
      {
        q: { en: 'Can we arrange a snacks-only party for a birthday?', mr: 'वाढदिवसासाठी फक्त स्नॅक्स आणि नाश्त्याची व्यवस्था करता येईल का?' },
        a: {
          en: 'Yes. We offer flexible snack-focused catering with mocktails, chaat, hot appetizers, and desserts as per your preference.',
          mr: 'होय. तुमच्या आवडीनुसार वेलकम ड्रिंक्स, स्टार्टर्स, चाट आणि मिठाई असा नाश्त्याचा मेनू आम्ही सहज तयार करून देतो.',
        },
      },
    ],
  },
  {
    id: 'engagement',
    slug: 'engagement',
    sortOrder: 3,
    isActive: true,
    isFeatured: true,
    icon: 'bi-gem',
    name: {
      en: 'Engagement Catering',
      mr: 'साखरपुडा समारंभ केटरिंग',
    },
    heroHeading: {
      en: 'Engagement Catering Services',
      mr: 'साखरपुडा समारंभासाठी केटरिंग सेवा',
    },
    shortDescription: {
      en: 'Explore catering arrangements for engagement ceremonies and family gatherings.',
      mr: 'साखरपुडा समारंभ आणि कौटुंबिक कार्यक्रमांसाठी केटरिंगची व्यवस्था जाणून घ्या.',
    },
    fullDescription: {
      en: 'Plan your engagement celebration with suitable catering arrangements for family members and guests. Celebrate the auspicious union with delicious traditional meals, welcome drinks, and impeccable hospitality suited to family traditions.',
      mr: 'कुटुंबीय आणि पाहुण्यांसाठी योग्य केटरिंग व्यवस्थेसह तुमचा साखरपुडा समारंभ नियोजित करा. दोन्ही परिवारांच्या आनंदाच्या क्षणी पारंपारिक चवदार जेवण, पेय आणि आदरातिथ्य देऊन आम्ही हा दिवस गोड करतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Engagement ceremony banquet and catering',
        mr: 'साखरपुडा केटरिंग व्यवस्था',
      },
    },
    eventRequirements: {
      en: [
        'Estimated count of attendees from both families',
        'Ceremony timings (Morning engagement followed by lunch, or evening reception)',
        'Traditional sweet delicacies for ceremony rituals & distribution',
        'Arrangement choice (With Material or Without Material)',
        'Beverage & welcome counter setup',
      ],
      mr: [
        'दोन्ही परिवारांकडील अपेक्षित पाहुण्यांची संख्या',
        'वेळापत्रक (सकाळचा कार्यक्रम व दुपारचे जेवण किंवा संध्याकाळचा समारंभ)',
        'विधी व वाटपासाठी पारंपारिक खास मिठाया',
        'केटरिंग पद्धत (साहित्यासह किंवा साहित्याशिवाय)',
        'वेलकम ड्रिंक आणि पेय व्यवस्था',
      ],
    },
    menuCategories: [
      { id: 'welcome', en: 'Welcome Drinks & Sharbat', mr: 'स्वागत पेये व सरबत', icon: 'bi-cup-straw' },
      { id: 'appetizers', en: 'Crispy Appetizers', mr: 'खमंग स्टार्टर्स', icon: 'bi-egg-fried' },
      { id: 'traditionalThali', en: 'Traditional Festive Meal', mr: 'सणासुदीचे पारंपारिक जेवण', icon: 'bi-fire' },
      { id: 'sweets', en: 'Auspicious Sweets (Pedha/Laddoo/Jalebi)', mr: 'शुभ मिठाई व गोड पदार्थ', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Family Consultation', desc: 'Discuss preferences from both families regarding food flavors and meal timing.' },
        { title: 'Auspicious Menu Setup', desc: 'Select authentic festive dishes and celebration sweets for the occasion.' },
        { title: 'Professional Readiness', desc: 'Kitchen and service station preparation well ahead of ceremony start.' },
        { title: 'Warm Serving', desc: 'Attentive, courteous dining service honoring all guests.' },
      ],
      mr: [
        { title: 'कौटुंबिक चर्चा', desc: 'दोन्ही कुटुंबांच्या आवडीनिवडी आणि जेवणाच्या वेळेबद्दल चर्चा.' },
        { title: 'मंगल मेनू निश्चिती', desc: 'समारंभास शोभणारे पारंपारिक पदार्थ आणि खास मिठायांची निवड.' },
        { title: 'पूर्व-तयारी', desc: 'विधी सुरू होण्यापूर्वी स्वयंपाक आणि डायनिंग हॉलची चोख मांडणी.' },
        { title: 'आदरातिथ्य', desc: 'सर्व पाहुण्यांना सन्मानाने आणि प्रेमाने जेवण वाढण्याची जबाबदारी.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Festive Engagement Dining', mr: 'साखरपुडा मंगल जेवण' },
      },
      {
        url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Traditional Thali Presentation', mr: 'पारंपारिक थाळी मांडणी' },
      },
    ],
    faqs: [
      {
        q: { en: 'Can you provide special sweet boxes for distribution?', mr: 'तुम्ही पाहुण्यांना वाटण्यासाठी मिठाईचे बॉक्स तयार करून देता का?' },
        a: {
          en: 'Yes, special sweet preparations and packaging can be arranged upon prior discussion and confirmation.',
          mr: 'होय, पूर्वचर्चेनंतर आणि ऑर्डर निश्चितीनुसार मिठाईची विशेष तयारी व पॅकिंग करून दिले जाऊ शकते.',
        },
      },
    ],
  },
  {
    id: 'reception',
    slug: 'reception',
    sortOrder: 4,
    isActive: true,
    isFeatured: true,
    icon: 'bi-stars',
    name: {
      en: 'Reception Catering',
      mr: 'स्वागत समारंभ केटरिंग',
    },
    heroHeading: {
      en: 'Reception Catering Services',
      mr: 'स्वागत समारंभासाठी केटरिंग सेवा',
    },
    shortDescription: {
      en: 'Plan food arrangements for your reception with suitable menu and catering options.',
      mr: 'तुमच्या स्वागत समारंभासाठी योग्य मेनू आणि केटरिंग पर्यायांसह जेवणाचे नियोजन करा.',
    },
    fullDescription: {
      en: 'Arrange food and catering services for your reception according to the event schedule, guest requirements, and selected menu. Featuring elegant buffet layouts, interactive food counters, live hot rotis/naans, and multi-cuisine spreads that leave lasting impressions.',
      mr: 'कार्यक्रमाचे वेळापत्रक, पाहुण्यांची संख्या आणि निवडलेला मेनू लक्षात घेऊन तुमच्या स्वागत समारंभासाठी केटरिंगची व्यवस्था करा. आकर्षक बुफे मांडणी, थेट गरम पोळी-रोटी व स्वादिष्ट पदार्थांच्या विस्तीर्ण निवडीने आम्ही स्वागत समारंभ अविस्मरणीय बनवतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Reception grand buffet dinner catering',
        mr: 'स्वागत समारंभ बुफे केटरिंग',
      },
    },
    eventRequirements: {
      en: [
        'Large-scale crowd management & guest flow planning',
        'Multiple buffet counter setups to avoid queuing',
        'Live hot breads and starter counters',
        'Dessert & mocktail presentation stations',
        'Service duration and venue handover timings',
      ],
      mr: [
        'मोठ्या प्रमाणातील गर्दीचे व्यवस्थापन व पाहुण्यांची सोय',
        'रांगा लागू नयेत म्हणून अनेक बुफे काउंटर्सची मांडणी',
        'थेट गरम पोळी, रोटी आणि स्टार्टर्स काउंटर',
        'मिठाई, आईस्क्रीम आणि वेलकम ड्रिंक्स स्टेशन',
        'कार्यक्रमाचा कालावधी आणि हॉलच्या वेळेचे नियोजन',
      ],
    },
    menuCategories: [
      { id: 'beverages', en: 'Mocktails & Welcome Refreshments', mr: 'मॉकटेल्स व स्वागत पेये', icon: 'bi-cup-straw' },
      { id: 'starters', en: 'Live Starters & Appetizers', mr: 'थेट स्टार्टर्स व खमंग स्नॅक्स', icon: 'bi-egg-fried' },
      { id: 'multiCuisine', en: 'Multi-Cuisine Main Course', mr: 'विविध खाद्यसंस्कृतीचे मुख्य जेवण', icon: 'bi-basket' },
      { id: 'riceAndBreads', en: 'Biryani, Pulao & Fresh Breads', mr: 'पुलाव, बिर्याणी व गरमागरम रोट्या', icon: 'bi-grid' },
      { id: 'desserts', en: 'Assorted Desserts & Ice Creams', mr: 'विविध मिठाया व आईस्क्रीम', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Venue Walkthrough & Flow', desc: 'Coordinate counter placement and guest movement at the venue.' },
        { title: 'Menu Structuring', desc: 'Balance hearty appetizers, royal main courses, and decadent desserts.' },
        { title: 'Multi-Station Setup', desc: 'Organize parallel buffet stations with uniform quality and heating.' },
        { title: 'Continuous Refilling & Service', desc: 'Active replenishment and courteous table service throughout the evening.' },
      ],
      mr: [
        { title: 'जागेची पाहणी', desc: 'काउंटर्सची योग्य जागा आणि पाहुण्यांची गर्दी न होता सुरळीत फिरण्याची व्यवस्था.' },
        { title: 'शाही मेनू निश्चिती', desc: 'स्टार्टर्स, मुख्य जेवण आणि आकर्षक मिठायांचा परिपूर्ण ताळमेळ.' },
        { title: 'मल्टी-काउंटर मांडणी', desc: 'गरम आणि ताजे अन्न देण्यासाठी समांतर बुफे काउंटर्सची सज्जता.' },
        { title: 'अखंड सेवा', desc: 'कार्यक्रम संपेपर्यंत अन्नाचा सातत्यपूर्ण पुरवठा आणि आदरयुक्त सेवा.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Grand Reception Buffet Spread', mr: 'स्वागत समारंभाचा भव्य बुफे' },
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Elegant Dining Arrangement', mr: 'सुंदर डायनिंग व्यवस्था' },
      },
    ],
    faqs: [
      {
        q: { en: 'How do you handle large guest turnouts at receptions?', mr: 'स्वागत समारंभात अचानक जास्त पाहुणे आल्यास नियोजन कसे असते?' },
        a: {
          en: 'We establish duplicate buffet lines and maintain buffer food preparation to ensure seamless service even during peak arrival hours.',
          mr: 'आम्ही गर्दी टाळण्यासाठी दोन किंवा अधिक बुफे लाइन्स लावतो आणि गर्दीच्या वेळीही अन्न कमी पडू नये म्हणून योग्य बफर नियोजन ठेवतो.',
        },
      },
    ],
  },
  {
    id: 'corporate',
    slug: 'corporate',
    sortOrder: 5,
    isActive: true,
    isFeatured: true,
    icon: 'bi-briefcase-fill',
    name: {
      en: 'Corporate Catering',
      mr: 'कॉर्पोरेट कार्यक्रम केटरिंग',
    },
    heroHeading: {
      en: 'Corporate Event Catering',
      mr: 'कॉर्पोरेट कार्यक्रमांसाठी केटरिंग',
    },
    shortDescription: {
      en: 'Explore catering arrangements for business meetings, office events, corporate gatherings, and other professional occasions.',
      mr: 'व्यावसायिक बैठका, ऑफिस कार्यक्रम, कॉर्पोरेट मेळावे आणि इतर व्यावसायिक प्रसंगांसाठी केटरिंग व्यवस्थेची माहिती घ्या.',
    },
    fullDescription: {
      en: 'Explore catering arrangements for business meetings, office events, corporate gatherings, and other professional occasions. We offer punctual, clean, and nutritious catering options from executive breakfast spreads to formal lunch buffets.',
      mr: 'व्यावसायिक बैठका, ऑफिस कार्यक्रम, कॉर्पोरेट मेळावे आणि इतर व्यावसायिक प्रसंगांसाठी केटरिंग व्यवस्थेची माहिती घ्या. नाश्त्यापासून ते दुपारच्या फॉर्मल बुफे जेवणापर्यंत वेळेचे काटेकोर पालन आणि स्वच्छतेची पूर्ण खात्री आम्ही देतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Corporate event and business lunch catering',
        mr: 'कॉर्पोरेट कार्यक्रम केटरिंग',
      },
    },
    eventRequirements: {
      en: [
        'Strict timing adherence aligned with event agendas',
        'Menu tailored for professional comfort (light, wholesome, balanced)',
        'Compact and organized setup fitting office cafeterias or conference spaces',
        'Beverage & tea/coffee services if requested',
        'Both With Material & Without Material catering options supported',
      ],
      mr: [
        'कामाच्या वेळापत्रकानुसार वेळेचे काटेकोर पालन',
        'हलका, पौष्टिक आणि संतुलित मेनू',
        'ऑफिस कॅफेटेरिया किंवा कॉन्फरन्स हॉलला साजेसी व्यवस्थित मांडणी',
        'चहा, कॉफी आणि पाण्याची स्वतंत्र व्यवस्था',
        'साहित्यासह किंवा साहित्याशिवाय दोन्ही पर्याय उपलब्ध',
      ],
    },
    menuCategories: [
      { id: 'breakfast', en: 'Executive Breakfast & High Tea', mr: 'सकाळचा नाश्ता व चहा-कॉफी', icon: 'bi-cup-straw' },
      { id: 'lunchBuffet', en: 'Corporate Lunch Buffet', mr: 'कॉर्पोरेट लंच बुफे', icon: 'bi-basket' },
      { id: 'salads', en: 'Fresh Salads & Light Dishes', mr: 'सॅलड व पौष्टिक पदार्थ', icon: 'bi-egg-fried' },
      { id: 'dessert', en: 'Light Desserts', mr: 'हलकी मिठाई', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Agenda Alignment', desc: 'Review exact meeting schedules, tea breaks, and lunch windows.' },
        { title: 'Menu Customization', desc: 'Select fresh, non-messy, nutritious dishes suited for office environments.' },
        { title: 'Prompt Delivery & Setup', desc: 'Punctual setup guaranteed before break intervals commence.' },
        { title: 'Clean Wrap-up', desc: 'Discreet and tidy clearing maintaining office decorum.' },
      ],
      mr: [
        { title: 'वेळापत्रक समन्वय', desc: 'बैठकीच्या अचूक वेळा, टी-ब्रेक आणि दुपारच्या जेवणाची वेळ समजून घेणे.' },
        { title: 'संतुलित मेनू निवड', desc: 'ऑफिसच्या वातावरणाला शोभेल असा हलका व स्वादिष्ट मेनू.' },
        { title: 'काटेकोर वेळेत मांडणी', desc: 'ब्रेक सुरू होण्यापूर्वी सर्व व्यवस्था पूर्ण करण्याची खात्री.' },
        { title: 'स्वच्छता व आवराआवर', desc: 'जेवणानंतर परिसराची त्वरित व व्यवस्थित स्वच्छता.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Professional Event Catering', mr: 'व्यावसायिक कार्यक्रम व्यवस्था' },
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Executive Lunch Spread', mr: 'एक्झिक्युटिव्ह लंच बुफे' },
      },
    ],
    faqs: [
      {
        q: { en: 'Can we order single-day catering for a company workshop?', mr: 'कंपनीच्या एका दिवसाच्या कार्यशाळेसाठी केटरिंग करता येईल का?' },
        a: {
          en: 'Yes. We cater single-day seminars, client meetings, annual gatherings, and milestone celebrations.',
          mr: 'होय. आम्ही एका दिवसाचे सेमिनार, स्नेहसंमेलन आणि विशेष मीटिंगसाठी केटरिंग सेवा देतो.',
        },
      },
    ],
  },
  {
    id: 'religious',
    slug: 'religious',
    sortOrder: 6,
    isActive: true,
    isFeatured: true,
    icon: 'bi-flower1',
    name: {
      en: 'Religious Event Catering',
      mr: 'धार्मिक कार्यक्रम केटरिंग',
    },
    heroHeading: {
      en: 'Religious Event Catering',
      mr: 'धार्मिक कार्यक्रमांसाठी केटरिंग',
    },
    shortDescription: {
      en: 'Arrange food for religious functions and traditional family occasions according to your preferences and event requirements.',
      mr: 'तुमच्या पसंतीनुसार आणि कार्यक्रमाच्या गरजेनुसार धार्मिक समारंभ व पारंपरिक कौटुंबिक कार्यक्रमांसाठी जेवणाची व्यवस्था करा.',
    },
    fullDescription: {
      en: 'Arrange food for religious functions, pujas, satyanarayan ceremonies, and traditional family occasions according to your preferences and event requirements. We prepare pure vegetarian, authentic satvik food with sacred reverence and strict hygiene.',
      mr: 'तुमच्या पसंतीनुसार आणि कार्यक्रमाच्या गरजेनुसार धार्मिक समारंभ, सत्यनारायण पूजा व पारंपरिक कौटुंबिक कार्यक्रमांसाठी जेवणाची व्यवस्था करा. पूर्ण शाकाहारी, सात्त्विक आणि पवित्रतेची पूर्ण काळजी घेऊन आम्ही स्वादिष्ट महाप्रसाद बनवतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Religious ceremony traditional food prasadam catering',
        mr: 'धार्मिक कार्यक्रम महाप्रसाद केटरिंग',
      },
    },
    eventRequirements: {
      en: [
        'Adherence to satvik preparation (No onion / garlic upon request)',
        'Traditional Mahaprasad dishes (Sheera, Puran Poli, Varan Bhaat, Koshimbir)',
        'Pangat / Seated traditional serving or buffet according to preference',
        'Punctual timing following aarti and puja rituals',
        'Catering With Material or Without Material',
      ],
      mr: [
        'सात्त्विक स्वयंपाकाचे पालन (मागणीनुसार कांदा-लसूण विरहित)',
        'पारंपारिक महाप्रसाद (शिरा, पुरणपोळी, वरण-भात, भाजी, कोशिंबीर)',
        'पंगत पद्धत किंवा बुफे मांडणीची निवड',
        'आरती आणि पूजेच्या वेळेनुसार जेवणाची अचूक सज्जता',
        'साहित्यासह किंवा साहित्याशिवाय दोन्ही पद्धतींची सोय',
      ],
    },
    menuCategories: [
      { id: 'prasad', en: 'Pooja Prasad & Sweets', mr: 'पूजा प्रसाद व मिठाया', icon: 'bi-cake' },
      { id: 'satvikMeal', en: 'Pure Satvik Maharashtrian Thali', mr: 'शुद्ध सात्त्विक महाराष्ट्रीयन जेवण', icon: 'bi-fire' },
      { id: 'traditionalSides', en: 'Chutneys, Koshimbir & Savories', mr: 'चटणी, कोशिंबीर व तोंडी लावणी', icon: 'bi-basket' },
      { id: 'fastingFood', en: 'Upwas / Fasting Specials (if needed)', mr: 'उपवासाचे खास पदार्थ (गरजेनुसार)', icon: 'bi-egg-fried' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Ritual Understanding', desc: 'Discuss puja timings, aarti schedules, and dietary restrictions (e.g. no onion/garlic).' },
        { title: 'Pure Menu Selection', desc: 'Curate holy prasadam, traditional dal, rice, puran poli, and seasonal vegetable preparations.' },
        { title: 'Sacred Clean Preparation', desc: 'Cook in immaculate hygiene with separate utensils and fresh ingredients.' },
        { title: 'Respectful Serving', desc: 'Humble and warm traditional service for devotees and family members.' },
      ],
      mr: [
        { title: 'विधींची वेळ समजून घेणे', desc: 'पूजा समाप्तीची वेळ, आरती आणि नैवेद्याचे नियम समजून घेणे.' },
        { title: 'सात्त्विक मेनू निवड', desc: 'प्रसाद, पुरणपोळी, वरण-भात आणि अस्सल पारंपारिक भाज्यांची निवड.' },
        { title: 'पवित्र व स्वच्छ स्वयंपाक', desc: 'संपूर्ण पावित्र्य, वेगळी भांडी आणि शुद्ध साहित्याचा वापर.' },
        { title: 'आदराने वाढप', desc: 'भाविक आणि आप्तेष्टांना नम्रतेने व तृप्ती होईपर्यंत वाढणे.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Authentic Mahaprasad Spread', mr: 'अस्सल महाप्रसाद ताट' },
      },
      {
        url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Puran Poli & Festive Delicacies', mr: 'पुरणपोळी व पारंपारिक मिठाया' },
      },
    ],
    faqs: [
      {
        q: { en: 'Can you prepare food completely without onion and garlic (Jain/Satvik)?', mr: 'कांदा-लसूण विरहित (सात्त्विक/जैन) जेवण बनवता येईल का?' },
        a: {
          en: 'Yes. Upon request, we prepare pure satvik meals prepared strictly without onion or garlic.',
          mr: 'होय. ग्राहकांच्या मागणीनुसार आम्ही कांदा आणि लसूण न वापरता पूर्ण सात्त्विक जेवण बनवतो.',
        },
      },
    ],
  },
  {
    id: 'family-functions',
    slug: 'family-functions',
    sortOrder: 7,
    isActive: true,
    isFeatured: true,
    icon: 'bi-people-fill',
    name: {
      en: 'Family Function Catering',
      mr: 'कौटुंबिक कार्यक्रम केटरिंग',
    },
    heroHeading: {
      en: 'Family Function Catering',
      mr: 'कौटुंबिक कार्यक्रमांसाठी केटरिंग',
    },
    shortDescription: {
      en: 'Plan food arrangements for family gatherings, anniversaries, naming ceremonies, and other special family occasions.',
      mr: 'कौटुंबिक मेळावे, लग्नाचे वाढदिवस, नामकरण समारंभ आणि इतर खास कौटुंबिक कार्यक्रमांसाठी जेवणाचे नियोजन करा.',
    },
    fullDescription: {
      en: 'Plan food arrangements for family gatherings, anniversaries, naming ceremonies (Barse), housewarming (Vastu Shanti), and other special family occasions. We bring warmth, authentic home-style flavors, and attentive hospitality so your family can celebrate together.',
      mr: 'कौटुंबिक मेळावे, लग्नाचे वाढदिवस, नामकरण समारंभ (बारसे), वास्तुशांती आणि इतर खास कौटुंबिक कार्यक्रमांसाठी जेवणाचे नियोजन करा. घरगुती चव, आपुलकीचे आदरातिथ्य आणि चोख व्यवस्थेमुळे तुमच्या कुटुंबाचा आनंद द्विगुणीत होतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Family function celebration dining',
        mr: 'कौटुंबिक कार्यक्रम जेवण व्यवस्था',
      },
    },
    eventRequirements: {
      en: [
        'Occasion type (Anniversary, Vastu Shanti, Naming ceremony, Baby shower)',
        'Guest count (From intimate 25 guests to 300+ relatives)',
        'Preference between traditional seated dining (Pangat) or modern buffet',
        'Choice of Catering With Material or Without Material',
        'Special menu requests for seniors and young children',
      ],
      mr: [
        'कार्यक्रमाचे स्वरूप (वास्तुशांती, बारसे, डोहाळे जेवण, लग्नाचा वाढदिवस)',
        'पाहुण्यांची संख्या (२५ पाहुण्यांच्या छोट्या मेळाव्यापासून ते ३००+ नातेवाईक)',
        'पंगत पद्धत किंवा आधुनिक बुफेची निवड',
        'साहित्यासह किंवा साहित्याशिवाय पर्यायाची निवड',
        'ज्येष्ठ नागरिक आणि लहान मुलांसाठी सोयीस्कर मेनू',
      ],
    },
    menuCategories: [
      { id: 'welcomeDrinks', en: 'Cool Drinks & Tea', mr: 'शीतपेये व चहा-कॉफी', icon: 'bi-cup-straw' },
      { id: 'traditionalMenu', en: 'Homestyle Maharashtrian Feast', mr: 'घरगुती पद्धतीचे रुचकर जेवण', icon: 'bi-fire' },
      { id: 'festiveSweets', en: 'Festival Sweets & Shrikhand / Basundi', mr: 'श्रीखंड, बासुंदी व सणाचे गोड पदार्थ', icon: 'bi-cake' },
      { id: 'sides', en: 'Appetizers & Crispy Farsan', mr: 'खमंग फरसाण व स्टार्टर्स', icon: 'bi-basket' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Gather Family Details', desc: 'Understand your occasion, family traditions, and guest profile.' },
        { title: 'Homestyle Menu Design', desc: 'Select dishes that evoke nostalgic, authentic warmth and delicious taste.' },
        { title: 'Home / Venue Coordination', desc: 'Adapt food stations to residential spaces or community banquet halls.' },
        { title: 'Heartfelt Hospitality', desc: 'Caring, polite food service making every relative feel truly welcome.' },
      ],
      mr: [
        { title: 'कार्यक्रमाची माहिती', desc: 'कार्यक्रमाचा प्रसंग, कौटुंबिक चालीरीती आणि पाहुण्यांची संख्या समजून घेणे.' },
        { title: 'घरगुती मेनू निवड', desc: 'अस्सल घरगुती चव आणि सर्वांना तृप्त करणारे आवडते पदार्थ.' },
        { title: 'घर किंवा हॉलची मांडणी', desc: 'घराच्या अंगणात, टेरेसवर किंवा हॉलमध्ये जागेनुसार चोख मांडणी.' },
        { title: 'आपुलकीचे आदरातिथ्य', desc: 'प्रत्येक नातेवाईकाला आणि पाहुण्याला घरच्यासारखा सन्मान देणारी सेवा.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Family Dining Celebration', mr: 'कौटुंबिक भोजन सोहळा' },
      },
      {
        url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Traditional Festive Feast', mr: 'सणाचा पारंपारिक बेत' },
      },
    ],
    faqs: [
      {
        q: { en: 'What is the minimum guest count for family function catering?', mr: 'कौटुंबिक कार्यक्रमासाठी किमान किती लोकांचे केटरिंग करता येते?' },
        a: {
          en: 'We generally cater for groups starting from 30–50 guests. Please contact us to discuss your specific guest count and arrangement.',
          mr: 'आम्ही साधारणपणे ३० ते ५० पाहुण्यांपासून पुढे केटरिंग करतो. तुमच्या संख्येनुसार योग्य व्यवस्थेसाठी कृपया थेट संपर्क साधा.',
        },
      },
    ],
  },
  {
    id: 'other',
    slug: 'other',
    sortOrder: 8,
    isActive: true,
    isFeatured: true,
    icon: 'bi-grid-fill',
    name: {
      en: 'Other Special Events',
      mr: 'इतर खास कार्यक्रम केटरिंग',
    },
    heroHeading: {
      en: 'Catering for Other Special Events',
      mr: 'इतर खास कार्यक्रमांसाठी केटरिंग',
    },
    shortDescription: {
      en: 'Have another event in mind? Contact Aditi Caterers to discuss your event requirements and possible catering arrangements.',
      mr: 'तुमचा वेगळा कार्यक्रम आहे का? तुमच्या कार्यक्रमाच्या गरजा आणि केटरिंगच्या संभाव्य व्यवस्थेबद्दल चर्चा करण्यासाठी अदिती केटरर्सशी संपर्क साधा.',
    },
    fullDescription: {
      en: 'Have another event in mind? Contact Aditi Caterers to discuss your event requirements and possible catering arrangements. From sports events, community gatherings, cultural festivals, retirement felicitations to society celebrations, we tailor catering to your unique vision.',
      mr: 'तुमचा वेगळा कार्यक्रम आहे का? तुमच्या कार्यक्रमाच्या गरजा आणि केटरिंगच्या संभाव्य व्यवस्थेबद्दल चर्चा करण्यासाठी अदिती केटरर्सशी संपर्क साधा. सोसायटी स्नेहसंमेलन, सांस्कृतिक कार्यक्रम, निवृत्ती सत्कार किंवा क्रीडा स्पर्धा—प्रत्येक प्रसंगाला साजेसे जेवण आम्ही देतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Community and special event catering',
        mr: 'विशेष व इतर कार्यक्रम केटरिंग',
      },
    },
    eventRequirements: {
      en: [
        'Nature of event and venue logistics',
        'Custom menu requirements (Snacks, box meals, buffet, or feast)',
        'Estimated attendee count and serving timeline',
        'Catering With Material or Without Material choice',
        'Advance discussion to confirm availability and feasibility',
      ],
      mr: [
        'कार्यक्रमाचे स्वरूप आणि जागेची उपलब्धता',
        'मागणीनुसार मेनू (नाश्ता, जेवणाचे डबे, बुफे किंवा पंगत)',
        'अपेक्षित लोकांची संख्या आणि जेवणाची वेळ',
        'साहित्यासह किंवा साहित्याशिवाय पर्यायाची निवड',
        'उपलब्धता आणि योग्य नियोजनासाठी पूर्वचर्चा',
      ],
    },
    menuCategories: [
      { id: 'customSnacks', en: 'All-Day Snacks & Refreshments', mr: 'नाश्ता व अल्पोपहार', icon: 'bi-cup-straw' },
      { id: 'buffetMeals', en: 'Buffet Meals & Rice Plates', mr: 'बुफे जेवण व थाळी', icon: 'bi-basket' },
      { id: 'sweets', en: 'Custom Sweets & Desserts', mr: 'गोड पदार्थ व मिठाई', icon: 'bi-cake' },
    ],
    cateringOptions: ['with-material', 'without-material'],
    process: {
      en: [
        { title: 'Discuss Your Unique Need', desc: 'Tell us about your event concept, guest flow, and timing requirements.' },
        { title: 'Customized Proposal', desc: 'Receive tailored food and service recommendations fitted to your budget.' },
        { title: 'Arrangement Confirmation', desc: 'Finalize date, venue, and catering format with our management.' },
        { title: 'Dependable Service', desc: 'Flawless execution delivering tasty meals and respectful hospitality.' },
      ],
      mr: [
        { title: 'गरजांची मांडणी', desc: 'कार्यक्रमाचे स्वरूप, वेळ आणि पाहुण्यांच्या पद्धतीबद्दल माहिती देणे.' },
        { title: 'योग्य उपाययोजना', desc: 'तुमच्या गरजेनुसार आणि बजेटनुसार योग्य मेनू व सेवेचे नियोजन.' },
        { title: 'नियोजन निश्चिती', desc: 'तारीख, ठिकाण आणि केटरिंग प्रकाराची अंतिम निश्चिती करणे.' },
        { title: 'विश्वासार्ह सेवा', desc: 'ठरल्याप्रमाणे चविष्ट भोजन आणि उत्तम आदरातिथ्य देणे.' },
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Special Event Food Counters', mr: 'विशेष कार्यक्रमातील फूड काउंटर्स' },
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        caption: { en: 'Buffet Setup for Gatherings', mr: 'स्नेहसंमेलनासाठी बुफे व्यवस्था' },
      },
    ],
    faqs: [
      {
        q: { en: 'How do I check if my custom event can be catered?', mr: 'माझ्या विशेष कार्यक्रमासाठी केटरिंग शक्य आहे का हे कसे जाणून घ्यावे?' },
        a: {
          en: 'Simply call us or submit a booking enquiry specifying your event details. We will evaluate and discuss the best catering arrangement for you.',
          mr: 'तुम्ही थेट फोन करू शकता किंवा बुकिंग फॉर्म भरून कार्यक्रमाची माहिती देऊ शकता. आम्ही तुमच्या गरजेनुसार योग्य चर्चा करू.',
        },
      },
    ],
  },
];

export const defaultCateringOptions = [
  {
    id: 'with-material',
    type: 'with-material',
    icon: 'bi-box-seam-fill',
    title: {
      en: 'Catering With Material',
      mr: 'साहित्यासह केटरिंग',
    },
    badge: {
      en: 'All-Inclusive Service',
      mr: 'सर्वसमावेशक व्यवस्था',
    },
    description: {
      en: 'We arrange the agreed food materials and provide catering services according to your event requirements.',
      mr: 'कार्यक्रमाच्या गरजेनुसार ठरलेले खाद्यपदार्थांचे साहित्य आम्ही उपलब्ध करून देतो आणि केटरिंग सेवा पुरवतो.',
    },
    features: {
      en: [
        'Food materials as agreed',
        'Menu planning discussion',
        'Catering service arrangements',
        'Event-based food planning',
      ],
      mr: [
        'ठरल्यानुसार खाद्यपदार्थांचे साहित्य',
        'सविस्तर मेनू नियोजन व चर्चा',
        'केटरिंग व वाढप व्यवस्था',
        'कार्यक्रमानुसार जेवणाचे परिपूर्ण नियोजन',
      ],
    },
    actionText: {
      en: 'Enquire for With Material',
      mr: 'साहित्यासह सेवेसाठी चौकशी करा',
    },
    bookingParam: 'with-material',
  },
  {
    id: 'without-material',
    type: 'without-material',
    icon: 'bi-person-check-fill',
    badge: {
      en: 'Labor & Cooking Service',
      mr: 'स्वयंपाक व वाढप सेवा',
    },
    title: {
      en: 'Catering Without Material',
      mr: 'साहित्याशिवाय केटरिंग',
    },
    description: {
      en: 'We provide catering services using the food materials arranged by the customer, according to the agreed requirements.',
      mr: 'ग्राहकांनी उपलब्ध करून दिलेल्या खाद्यपदार्थांच्या साहित्याचा वापर करून ठरलेल्या गरजेनुसार आम्ही केटरिंग सेवा पुरवतो.',
    },
    features: {
      en: [
        'Customer-arranged materials',
        'Catering service arrangements',
        'Menu and quantity discussion',
        'Event-based planning',
      ],
      mr: [
        'ग्राहकांकडून साहित्य उपलब्ध करणे',
        'अनुभवी आचारी व केटरिंग सेवा',
        'मेनू व साहित्याच्या प्रमाणावर चर्चा',
        'कार्यक्रमानुसार स्वयंपाक नियोजन',
      ],
    },
    actionText: {
      en: 'Enquire for Without Material',
      mr: 'साहित्याशिवाय सेवेसाठी चौकशी करा',
    },
    bookingParam: 'without-material',
  },
];

export const defaultEventsWeServe = [
  { id: 'weddings', icon: 'bi-heart-fill', en: 'Weddings & Muhurat Lunches', mr: 'लग्न सोहळा व मुहूर्ताचे जेवण', route: '/services/wedding' },
  { id: 'engagements', icon: 'bi-gem', en: 'Engagement Ceremonies', mr: 'साखरपुडा समारंभ', route: '/services/engagement' },
  { id: 'receptions', icon: 'bi-stars', en: 'Reception Banquets', mr: 'स्वागत समारंभ व रिसेप्शन', route: '/services/reception' },
  { id: 'birthdays', icon: 'bi-balloon-fill', en: 'Birthdays & Anniversaries', mr: 'वाढदिवस व लग्न वाढदिवस', route: '/services/birthday' },
  { id: 'corporate', icon: 'bi-briefcase-fill', en: 'Corporate Lunches & Seminars', mr: 'कॉर्पोरेट लंच व बैठका', route: '/services/corporate' },
  { id: 'religious', icon: 'bi-flower1', en: 'Pujas, Satyanarayan & Prasadam', mr: 'पूजा, सत्यनारायण व महाप्रसाद', route: '/services/religious' },
  { id: 'family', icon: 'bi-people-fill', en: 'Vastu Shanti & Naming Ceremonies', mr: 'वास्तुशांती व बारसे', route: '/services/family-functions' },
  { id: 'gatherings', icon: 'bi-grid-fill', en: 'Festivals & Society Gatherings', mr: 'उत्सव व स्नेहसंमेलन', route: '/services/other' },
];

export const defaultServicesGallery = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Traditional Wedding Feast Arrangement',
      mr: 'पारंपारिक लग्न जेवण व्यवस्था',
    },
    category: { en: 'Wedding', mr: 'लग्न' },
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Deluxe Buffet & Food Counters',
      mr: 'भव्य बुफे व फूड काउंटर्स',
    },
    category: { en: 'Buffet', mr: 'बुफे' },
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Authentic Maharashtrian Thali & Prasadam',
      mr: 'अस्सल महाराष्ट्रीयन थाळी व महाप्रसाद',
    },
    category: { en: 'Traditional', mr: 'पारंपारिक' },
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Hot Crispy Starters & Savories',
      mr: 'गरमागरम खमंग स्टार्टर्स व स्नॅक्स',
    },
    category: { en: 'Starters', mr: 'स्टार्टर्स' },
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Festive Celebration Sweets',
      mr: 'समारंभातील गोड पक्वान्ने',
    },
    category: { en: 'Desserts', mr: 'मिठाई' },
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: {
      en: 'Engagement & Family Reception Setup',
      mr: 'साखरपुडा व कौटुंबिक स्नेहभोजन',
    },
    category: { en: 'Celebration', mr: 'समारंभ' },
  },
];

export const defaultServicesFaqs = [
  {
    id: 1,
    q: {
      en: 'What is the difference between Catering With Material and Catering Without Material?',
      mr: 'साहित्यासह केटरिंग आणि साहित्याशिवाय केटरिंग यामध्ये काय फरक आहे?',
    },
    a: {
      en: 'In Catering With Material, our team purchases and brings all the agreed ingredients, prepares the food, and manages dining service. In Catering Without Material, the customer purchases raw materials as per our detailed grocery list, and our team provides skilled chefs and serving personnel.',
      mr: 'साहित्यासह केटरिंगमध्ये ठरलेले सर्व खाद्यसाहित्य आमची टीम आणते आणि स्वयंपाक व वाढप करते. साहित्याशिवाय केटरिंगमध्ये ग्राहक आमच्या यादीनुसार किराणा व साहित्य आणून देतात आणि आमचे आचारी व वाढपी केवळ बनवण्याची व वाढण्याची सेवा देतात.',
    },
  },
  {
    id: 2,
    q: {
      en: 'Can the menu be tailored to our specific budget and taste preferences?',
      mr: 'आमच्या बजेट आणि आवडीनुसार मेनूमध्ये बदल करता येतो का?',
    },
    a: {
      en: 'Yes, we work closely with you to tailor the menu to suit your occasion, guest preferences, dietary requirements, and budget.',
      mr: 'होय, तुमच्या कार्यक्रमाचे स्वरूप, पाहुण्यांची पसंती, विशिष्ट पथ्ये आणि बजेटनुसार आम्ही मेनू पूर्णपणे कस्टमाइज करून देतो.',
    },
  },
  {
    id: 3,
    q: {
      en: 'How do I book catering for an upcoming event?',
      mr: 'आगामी कार्यक्रमासाठी केटरिंग कसे बुक करावे?',
    },
    a: {
      en: 'You can click "Book Your Event" or "Book This Service" on any service page, choose your event type, or directly call/WhatsApp us at +91 9975959391.',
      mr: 'तुम्ही कोणत्याही सेवा पृष्ठावरील "कार्यक्रम बुक करा" बटणावर क्लिक करू शकता, किंवा थेट आम्हाला +91 9975959391 या क्रमांकावर कॉल किंवा व्हॉट्सॲप करू शकता.',
    },
  },
  {
    id: 4,
    q: {
      en: 'Do you cater for events outside Pune / in rural locations?',
      mr: 'तुम्ही पुण्याच्या बाहेर किंवा ग्रामीण भागातील कार्यक्रमांसाठी सेवा देता का?',
    },
    a: {
      en: 'Yes, we cater across Pune, nearby districts, and adjoining regions depending on the event scale and prior booking confirmation.',
      mr: 'होय, कार्यक्रमाचे प्रमाण आणि पूर्वनोंदणीनुसार आम्ही पुणे व लगतच्या भागांमध्ये केटरिंग सेवा पुरवतो.',
    },
  },
];

export async function getAllServices() {
  try {
    const res = await api.get('/public/services');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Check local storage for admin managed services
  }

  try {
    const stored = JSON.parse(localStorage.getItem('aditi_admin_services') || '[]');
    if (Array.isArray(stored) && stored.length > 0) {
      // Only return published services, sorted by displayOrder
      const published = stored.filter((s) => s.status === 'published');
      if (published.length > 0) {
        published.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        return published;
      }
    }
  } catch {
    // fallback
  }

  return defaultServices;
}

export async function getServiceBySlug(slug) {
  try {
    const res = await api.get(`/public/services/${slug}`);
    if (res?.data?.data) {
      return res.data.data;
    }
  } catch {
    // Fall back to local search
  }
  const match = defaultServices.find(
    (s) => s.slug.toLowerCase() === slug?.toLowerCase() || s.id.toLowerCase() === slug?.toLowerCase()
  );
  return match || null;
}

export async function getFeaturedServices() {
  try {
    const res = await api.get('/public/services/featured');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  return defaultServices.filter((s) => s.isFeatured);
}

export async function getRelatedServices(currentSlug, limit = 3) {
  try {
    const res = await api.get(`/public/services/${currentSlug}/related`);
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  return defaultServices.filter((s) => s.slug !== currentSlug).slice(0, limit);
}

export default {
  getAllServices,
  getServiceBySlug,
  getFeaturedServices,
  getRelatedServices,
  defaultServices,
  defaultCateringOptions,
  defaultEventsWeServe,
  defaultServicesGallery,
  defaultServicesFaqs,
};
