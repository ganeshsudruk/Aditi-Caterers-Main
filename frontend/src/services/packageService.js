import api from './api';

export const defaultPackageTypes = [
  {
    id: 'with-material',
    type: 'with-material',
    slug: 'with-material',
    icon: 'bi-box-seam-fill',
    name: {
      en: 'With Material Catering',
      mr: 'साहित्यांसह केटरिंग',
    },
    shortDescription: {
      en: 'A catering arrangement where food ingredients and other agreed materials are arranged as part of the service.',
      mr: 'या पर्यायामध्ये ठरल्याप्रमाणे खाद्यपदार्थांचे साहित्य आणि आवश्यक वस्तूंची व्यवस्था केटरिंग सेवेमध्ये समाविष्ट केली जाते.',
    },
    actionText: {
      en: 'View Details',
      mr: 'अधिक माहिती',
    },
    badge: {
      en: 'All-Inclusive Material',
      mr: 'साहित्यासह व्यवस्था',
    },
    route: '/packages/with-material',
  },
  {
    id: 'without-material',
    type: 'without-material',
    slug: 'without-material',
    icon: 'bi-person-check-fill',
    name: {
      en: 'Without Material Catering',
      mr: 'साहित्याशिवाय केटरिंग',
    },
    shortDescription: {
      en: 'A catering arrangement where the customer and catering team agree on the responsibilities for ingredients and materials before the event.',
      mr: 'या पर्यायामध्ये खाद्यपदार्थांचे साहित्य कोण उपलब्ध करून देणार याबाबत ग्राहक आणि केटरिंग टीम यांच्यात आधीच चर्चा करून निर्णय घेतला जाईल.',
    },
    actionText: {
      en: 'View Details',
      mr: 'अधिक माहिती',
    },
    badge: {
      en: 'Cooking & Service Only',
      mr: 'स्वयंपाक व सेवा',
    },
    route: '/packages/without-material',
  },
  {
    id: 'custom',
    type: 'custom',
    slug: 'custom-catering',
    icon: 'bi-sliders2-vertical',
    name: {
      en: 'Custom Catering Package',
      mr: 'कस्टम केटरिंग पॅकेज',
    },
    shortDescription: {
      en: 'Discuss your event requirements with our team to plan a customized catering arrangement tailored to your budget and menu.',
      mr: 'तुमच्या कार्यक्रमाच्या गरजेनुसार योग्य मेनू आणि केटरिंगची व्यवस्था ठरवण्यासाठी आमच्या टीमशी चर्चा करा.',
    },
    actionText: {
      en: 'Request Custom Quote',
      mr: 'कस्टम कोटेशन मागवा',
    },
    badge: {
      en: 'Tailored Menu & Scale',
      mr: 'मागणीनुसार नियोजन',
    },
    route: '/packages/custom-catering',
  },
];

// Section 5.5.1: Budget-Based Packages (बजेटनुसार पॅकेजेस)
export const defaultBudgetPackages = [
  {
    id: 'pkg-budget-basic',
    slug: 'basic-budget-package',
    category: 'basic',
    name: {
      en: 'Basic Budget Package',
      mr: 'बेसिक बजेट पॅकेज',
    },
    tagline: {
      en: 'Simple & Affordable Catering for 100 People',
      mr: '१०० लोकांसाठी साधी व परवडणारी जेवण व्यवस्था',
    },
    packageType: 'with-material',
    price: {
      amount: 10000,
      unit: 'fixed',
      guestBase: 100,
      approxPerPerson: 100,
    },
    minimumGuests: 100,
    shortDescription: {
      en: 'A simple, affordable 100-person catering menu featuring 1 Bhaji, Rice, and Chapati OR Puri.',
      mr: '१०० लोकांसाठी १ भाजी, भात, आणि पोळी किंवा पुरी या पर्यायांसह साधा व परवडणारा मेनू.',
    },
    fullDescription: {
      en: 'The Basic Budget Package is designed as an accessible, cost-effective option for 100 attendees. It includes one freshly prepared vegetable dish (Bhaji), steaming hot rice, and the customer choice of either fresh Chapatis OR crisp Puris. Freshly prepared with verified hygiene standards.',
      mr: 'बेसिक बजेट पॅकेज हे १०० लोकांसाठी अत्यंत परवडणारा व उत्कृष्ट पर्याय आहे. यामध्ये १ चवदार भाजी, वाफाळलेला भात आणि ग्राहकांच्या पसंतीनुसार गरमागरम पोळी किंवा पुरी यापैकी एकाची निवड समाविष्ट आहे. स्वच्छता आणि घरगुती चवीची पूर्ण खात्री.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Basic Budget Catering Feast',
        mr: 'बेसिक बजेट केटरिंग जेवण',
      },
    },
    sampleMenuStructure: [
      { category: { en: 'Bhaji (भाजी)', mr: 'भाजी' }, items: { en: '1 Type (Batata / Mix Veg / Chana)', mr: '१ प्रकार (बटाटा / मिक्स व्हेज / चवळी)' } },
      { category: { en: 'Rice (भात)', mr: 'भात' }, items: { en: '1 Type (Steamed Rice / Plain Rice)', mr: '१ प्रकार (साधा भात)' } },
      { category: { en: 'Chapati OR Puri (पोळी किंवा पुरी)', mr: 'पोळी किंवा पुरी' }, items: { en: 'Choose Any One (पोळी किंवा पुरी यापैकी एक)', mr: 'पोळी किंवा पुरी यापैकी कोणताही एक पर्याय' }, isAlternative: true },
    ],
    menuHighlights: [
      { en: '1 Type of Vegetable Dish (Bhaji)', mr: '१ प्रकारची भाजी' },
      { en: 'Steamed Rice', mr: 'वाफाळलेला भात' },
      { en: 'Chapati OR Puri (Choose any one)', mr: 'पोळी किंवा पुरी यापैकी एक पर्याय' },
      { en: 'Basic Utensils & Fresh Cooking', mr: 'स्वच्छ स्वयंपाक व आवश्यक भांडी' },
    ],
    inclusions: [
      {
        title: { en: 'Food Preparation by Skilled Cooks', mr: 'अनुभवी स्वयंपाक्यांकडून स्वयंपाक' },
        description: { en: 'Cooked fresh on event day adhering to hygiene standards.', mr: 'कार्यक्रमाच्या दिवशी स्वच्छतेत ताजा स्वयंपाक तयार केला जातो.' },
        status: 'included',
      },
      {
        title: { en: 'Food Ingredients (As Agreed)', mr: 'खाद्यसाहित्य (ठरल्याप्रमाणे)' },
        description: { en: 'Standard grocery ingredients provided under With Material terms.', mr: 'साहित्यासह केटरिंग अंतर्गत प्रमाणित किराणा व भाज्या.' },
        status: 'included',
      },
      {
        title: { en: 'Serving Assistance', mr: 'वाढप मदत' },
        description: { en: 'Basic assistance for buffet counter replenishment.', mr: 'बुफे काउंटरवर अन्न ठेवण्यासाठी सहाय्य.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Proposed price of ₹10,000 is based on 100 guests (~₹100/person). Choice between Chapati OR Puri must be finalized during booking. Unconfigured guest counts require a custom quotation.',
      mr: '₹१०,००० चा प्रस्तावित दर १०० पाहुण्यांसाठी आहे (~₹१००/व्यक्ती). पोळी किंवा पुरी यापैकी एकाची निवड आधी निश्चित करावी लागते. वेगळ्या पाहुण्यांच्या संख्येसाठी कोटेशन आवश्यक.',
    },
    isFeatured: true,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'pkg-budget-standard',
    slug: 'standard-budget-package',
    category: 'standard',
    name: {
      en: 'Standard Budget Package',
      mr: 'स्टँडर्ड बजेट पॅकेज',
    },
    tagline: {
      en: 'Wholesome Multi-Course Feast for 100 People',
      mr: '१०० लोकांसाठी परिपूर्ण पारंपारिक मेजवानी',
    },
    packageType: 'with-material',
    price: {
      amount: 20000,
      unit: 'fixed',
      guestBase: 100,
      approxPerPerson: 200,
    },
    minimumGuests: 100,
    shortDescription: {
      en: 'A balanced 100-person feast with 2 Bhajis, Dal/Amti, Rice, Chapati OR Puri, Koshimbir, Pickle & 1 Sweet.',
      mr: '१०० लोकांसाठी २ भाज्या, डाळ/आमटी, भात, पोळी किंवा पुरी, कोशिंबीर, लोणचे आणि १ गोड पदार्थ.',
    },
    fullDescription: {
      en: 'The Standard Budget Package delivers a rich, wholesome meal experience for 100 guests. It expands the menu to 2 vegetable dishes, comforting Dal or traditional Amti, rice, salad/koshimbir, pickle, delicious celebration sweet, and choice of Chapati OR Puri.',
      mr: 'स्टँडर्ड बजेट पॅकेजमध्ये १०० पाहुण्यांसाठी उत्तम आणि तृप्त करणारे भोजन दिले जाते. यामध्ये २ प्रकारच्या भाज्या, चवदार आमटी/डाळ, भात, पोळी किंवा पुरी, कोशिंबीर, लोणचे आणि खास मिठाईचा समावेश आहे.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Standard Budget Catering Feast',
        mr: 'स्टँडर्ड बजेट केटरिंग जेवण',
      },
    },
    sampleMenuStructure: [
      { category: { en: 'Bhaji (भाजी)', mr: 'भाज्या' }, items: { en: '2 Types (e.g., Sukhi Bhaji & Rassa Bhaji)', mr: '२ प्रकार (सुकी भाजी व रस्सा भाजी)' } },
      { category: { en: 'Dal / Amti (डाळ / आमटी)', mr: 'डाळ / आमटी' }, items: { en: '1 Type (Maharashtrian Amti / Varan / Dal Tadka)', mr: '१ प्रकार (अस्सल आमटी / वरण)' } },
      { category: { en: 'Rice (भात)', mr: 'भात' }, items: { en: '1 Type (Steamed Rice / Jeera Rice)', mr: '१ प्रकार (भात / जिरा राईस)' } },
      { category: { en: 'Chapati OR Puri (पोळी किंवा पुरी)', mr: 'पोळी किंवा पुरी' }, items: { en: 'Choose Any One (पोळी किंवा पुरी यापैकी एक)', mr: 'पोळी किंवा पुरी यापैकी कोणताही एक पर्याय' }, isAlternative: true },
      { category: { en: 'Salad / Koshimbir (कोशिंबीर)', mr: 'कोशिंबीर' }, items: { en: '1 Type (Kakdi / Tomato Koshimbir)', mr: '१ प्रकारची खमंग कोशिंबीर' } },
      { category: { en: 'Pickle (लोणचे)', mr: 'लोणचे' }, items: { en: 'Included (Mango / Mixed Pickle)', mr: 'पारंपारिक लोणचे समाविष्ट' } },
      { category: { en: 'Sweet (गोड पदार्थ)', mr: 'गोड पदार्थ' }, items: { en: '1 Type (Gulab Jamun / Jalebi / Sheera)', mr: '१ प्रकारचा गोड पदार्थ (गुलाबजाम/जिलेबी/शिरा)' } },
    ],
    menuHighlights: [
      { en: '2 Types of Vegetables (Sukhi & Gravy)', mr: '२ प्रकारच्या भाज्या (सुकी व रस्सा)' },
      { en: '1 Traditional Dal or Maharashtrian Amti', mr: '१ चवदार आमटी किंवा डाळ' },
      { en: 'Steamed Rice', mr: 'भात' },
      { en: 'Chapati OR Puri (Choose any one)', mr: 'पोळी किंवा पुरी यापैकी एक पर्याय' },
      { en: 'Fresh Koshimbir & Traditional Pickle', mr: 'ताजी कोशिंबीर व लोणचे' },
      { en: '1 Celebration Sweet (Gulab Jamun / Jalebi)', mr: '१ गोड पदार्थ (गुलाबजाम / जिलेबी)' },
    ],
    inclusions: [
      {
        title: { en: 'Full Chef & Helper Team', mr: 'मुख्य महाराज व मदतनीस' },
        description: { en: 'Complete on-site meal preparation for 100 guests.', mr: '१०० लोकांसाठी वेळेवर ताजा व चविष्ट स्वयंपाक.' },
        status: 'included',
      },
      {
        title: { en: 'Agreed Food Ingredients', mr: 'सर्व ठरलेले खाद्यसाहित्य' },
        description: { en: 'Quality grocery, vegetables, cooking oil, and dairy.', mr: 'उत्कृष्ट दर्जाचा किराणा, तेल, भाजीपाला व दूध.' },
        status: 'included',
      },
      {
        title: { en: 'Buffet Counter Setup & Staff', mr: 'बुफे काउंटर मांडणी व वाढपी' },
        description: { en: 'Hot buffet counter maintenance and dining support.', mr: 'बुफे काउंटर व्यवस्था व आवश्यक वाढपी सहाय्य.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Proposed price of ₹20,000 is calculated for 100 people (~₹200/person). Choice of Chapati OR Puri and specific sweet must be confirmed prior to event date.',
      mr: '₹२०,००० चा प्रस्तावित दर १०० पाहुण्यांसाठी आहे (~₹२००/व्यक्ती). पोळी किंवा पुरी आणि गोड पदार्थाची निवड पूर्वचर्चेत निश्चित करावी लागते.',
    },
    isFeatured: true,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'pkg-budget-premium',
    slug: 'premium-budget-package',
    category: 'premium',
    name: {
      en: 'Premium Budget Package',
      mr: 'प्रीमियम बजेट पॅकेज',
    },
    tagline: {
      en: 'Grand Festive Spread with Both Chapati & Puri for 100 People',
      mr: '१०० लोकांसाठी पोळी व पुरी दोन्हीसह भव्य पक्वान्न मेजवानी',
    },
    packageType: 'with-material',
    price: {
      amount: 30000,
      unit: 'fixed',
      guestBase: 100,
      approxPerPerson: 300,
    },
    minimumGuests: 100,
    shortDescription: {
      en: 'A grand feast featuring 1 Starter, 2 Bhajis (Special Paneer + Regular), Dal, Rice/Pulao, Both Chapati & Puri, Koshimbir, Papad & Dessert.',
      mr: '१०० लोकांसाठी १ स्टार्टर, २ भाज्या (स्पेशल + साधी), डाळ, भात/पुलाव, पोळी आणि पुरी दोन्ही, कोशिंबीर, पापड व गोड पदार्थ.',
    },
    fullDescription: {
      en: 'The Premium Budget Package is our most popular celebratory offering for 100 guests. Featuring hot appetizers, a special Paneer or festive preparation, a traditional seasonal vegetable, Amti, fragrant Pulao or Rice, both Chapatis and Puris together, crispy papad, salad, and a signature traditional dessert.',
      mr: 'प्रीमियम बजेट पॅकेज हे १०० लोकांसाठी अत्यंत लोकप्रिय मंगल पॅकेज आहे. यामध्ये खमंग स्टार्टर्स, स्पेशल पनीर किंवा सणाची भाजी, पारंपारिक भाजी, आमटी, पुलाव किंवा भात, पोळी आणि पुरी दोन्ही, कुरकुरीत पापड, कोशिंबीर आणि अस्सल गोड पक्वान्न दिले जाते.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Premium Budget Festive Feast',
        mr: 'प्रीमियम बजेट सण मेजवानी',
      },
    },
    sampleMenuStructure: [
      { category: { en: 'Starter (स्टार्टर)', mr: 'स्टार्टर' }, items: { en: '1 Type (Veg Cutlet / Kothimbir Vadi / Samosa)', mr: '१ प्रकार (कोथिंबीर वडी / कटलेट / समोसा)' } },
      { category: { en: 'Special Bhaji (स्पेशल भाजी)', mr: 'स्पेशल भाजी' }, items: { en: '1 Type (Paneer Masala / Veg Kolhapuri / Kaju Curry)', mr: '१ स्पेशल भाजी (पनीर मसाला / व्हेज कोल्हापुरी)' } },
      { category: { en: 'Regular Bhaji (साधी भाजी)', mr: 'साधी भाजी' }, items: { en: '1 Type (Batata Bhaji / Chana / Bhendi Masala)', mr: '१ साधी भाजी (बटाटा भाजी / भेंडी / चवळी)' } },
      { category: { en: 'Dal / Amti (डाळ / आमटी)', mr: 'डाळ / आमटी' }, items: { en: '1 Type (Katachi Amti / Dal Tadka)', mr: '१ प्रकारची आमटी किंवा डाळ' } },
      { category: { en: 'Rice OR Pulao (भात किंवा पुलाव)', mr: 'भात किंवा पुलाव' }, items: { en: 'Choose Any One (Steamed Rice or Veg Pulao)', mr: 'भात किंवा पुलाव यापैकी एक पर्याय' }, isAlternative: true },
      { category: { en: 'Chapati (पोळी)', mr: 'पोळी' }, items: { en: 'Included (Fresh Hot Chapatis)', mr: 'गरमागरम पोळ्या समाविष्ट' } },
      { category: { en: 'Puri (पुरी)', mr: 'पुरी' }, items: { en: 'Included (Crisp Puris)', mr: 'खुसखुशीत पुऱ्या समाविष्ट' } },
      { category: { en: 'Salad / Koshimbir (कोशिंबीर)', mr: 'कोशिंबीर' }, items: { en: '1 Type (Koshimbir / Cucumber Salad)', mr: '१ प्रकारची कोशिंबीर' } },
      { category: { en: 'Papad (पापड)', mr: 'पापड' }, items: { en: 'Included (Udad Papad / Kurdaya)', mr: 'पापड व कुरडई समाविष्ट' } },
      { category: { en: 'Sweet / Dessert (गोड पदार्थ)', mr: 'गोड पदार्थ' }, items: { en: '1 Type (Shrikhand / Basundi / Gulab Jamun)', mr: '१ खास गोड पदार्थ (श्रीखंड / बासुंदी / गुलाबजाम)' } },
    ],
    menuHighlights: [
      { en: '1 Crispy Starter (Kothimbir Vadi / Cutlet)', mr: '१ खमंग स्टार्टर (कोथिंबीर वडी / कटलेट)' },
      { en: '1 Special Paneer Bhaji + 1 Regular Seasonal Bhaji', mr: '१ स्पेशल पनीर भाजी + १ साधी भाजी' },
      { en: 'Fragrant Rice OR Veg Pulao', mr: 'सुवासिक भात किंवा व्हेज पुलाव' },
      { en: 'Both Hot Chapati AND Crisp Puri Included', mr: 'पोळी आणि पुरी दोन्ही समाविष्ट' },
      { en: 'Papad, Koshimbir, Pickle & Accompaniments', mr: 'पापड, कोशिंबीर, लोणचे' },
      { en: '1 Signature Sweet (Shrikhand / Basundi / Jamun)', mr: '१ खास गोड पदार्थ (श्रीखंड / बासुंदी / गुलाबजाम)' },
    ],
    inclusions: [
      {
        title: { en: 'Experienced Master Cook & Staff', mr: 'अनुभवी मुख्य आचारी व पूर्ण पथक' },
        description: { en: 'Experienced team ensuring rich flavor and immaculate hygiene.', mr: 'उत्कृष्ट चव आणि पावित्र्य राखणारे आचारी व मदतनीस.' },
        status: 'included',
      },
      {
        title: { en: 'All Agreed Premium Materials', mr: 'सर्व ठरलेले दर्जेदार खाद्यसाहित्य' },
        description: { en: 'Quality paneer, pure ghee, dairy, and fresh produce.', mr: 'उत्कृष्ट पनीर, साजूक तूप, दूध आणि ताजी भाजी.' },
        status: 'included',
      },
      {
        title: { en: 'Uniformed Serving Staff & Buffet Setup', mr: 'गणवेशातील वाढपी व बुफे मांडणी' },
        description: { en: 'Full dining support and table service management.', mr: 'संपूर्ण डायनिंग हॉल व बुफे व्यवस्थापन.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Proposed price of ₹30,000 is based on 100 people (~₹300/person). Includes both Chapati and Puri. Custom additions or special sweet requests can be confirmed during consultation.',
      mr: '₹३०,००० चा प्रस्तावित दर १०० पाहुण्यांसाठी आहे (~₹३००/व्यक्ती). पोळी व पुरी दोन्ही समाविष्ट. इतर विशेष मागण्यांसाठी पूर्वचर्चा केली जाते.',
    },
    isFeatured: true,
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'pkg-budget-luxury',
    slug: 'luxury-custom-package',
    category: 'luxury',
    name: {
      en: 'Luxury / Customized Package',
      mr: 'लक्झरी / कस्टमाइज्ड पॅकेज',
    },
    tagline: {
      en: 'Bespoke Multi-Cuisine Banquet Tailored to Your Vision',
      mr: 'तुमच्या संकल्पनेनुसार भव्य व शाही मेजवानी',
    },
    packageType: 'custom',
    price: {
      amount: null,
      unit: 'custom-quote',
      guestBase: null,
      approxPerPerson: null,
    },
    minimumGuests: 50,
    shortDescription: {
      en: 'A bespoke royal banquet with welcome drinks, live counters, multi-course dishes, paneer specialties, assorted breads, and luxury desserts.',
      mr: 'स्वागत पेये, थेट स्टॉल्स, पनीर स्पेशल, विविध मुख्य पदार्थ, रोट्या आणि आईस्क्रीमसह शाही भोजन व्यवस्था.',
    },
    fullDescription: {
      en: 'Our Luxury & Customized Package provides an elite hospitality experience with zero constraints. Choose welcome mocktails, live chaat stalls, rich multi-cuisine main courses (Paneer, Kofta, Dal Makhani, Biryani), freshly made tandoor/hot tawa breads, traditional sweets, and ice cream counters. Tailored entirely to your guest scale and budget.',
      mr: 'लक्झरी व कस्टमाइज्ड पॅकेजमध्ये कोणत्याही मर्यादेशिवाय शाही व्यवस्था दिली जाते. वेलकम ड्रिंक्स, थेट चाट स्टॉल्स, पनीर व कोफ्ता स्पेशल भाज्या, बिर्याणी, गरमागरम पोळी/नान/भाकरी, अस्सल मिठाया आणि आईस्क्रीम काउंटर यासह सर्व व्यवस्था तुमच्या आवडीनुसार कस्टमाइज केली जाते.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Luxury Royal Catering Banquet',
        mr: 'शाही लक्झरी केटरिंग मेजवानी',
      },
    },
    sampleMenuStructure: [
      { category: { en: 'Welcome Drinks (स्वागत पेय)', mr: 'स्वागत पेय' }, items: { en: 'Mocktails, Fresh Fruit Juice, Sharbat', mr: 'मॉकटेल्स, ताजी सरबते व फ्रूट ज्यूस' } },
      { category: { en: 'Multiple Starters (विविध स्टार्टर)', mr: 'विविध स्टार्टर्स' }, items: { en: '2-3 Hot Appetizers (Paneer Tikka, Crispy Rolls, Hara Bhara Kabab)', mr: '२-३ खमंग स्टार्टर्स (पनीर टिक्का, रोल्स, कबाब)' } },
      { category: { en: 'Special Bhaji & Curries (स्पेशल भाज्या)', mr: 'स्पेशल भाज्या' }, items: { en: 'Paneer Butter Masala, Veg Kofta, Kolhapuri Dum Aloo', mr: 'पनीर बटर मसाला, कोफ्ता, दम आलू' } },
      { category: { en: 'Dal & Rice Specialties (डाळ व भात)', mr: 'डाळ व भात' }, items: { en: 'Dal Makhani / Tadka with Shahi Veg Biryani & Jeera Rice', mr: 'शाही व्हेज बिर्याणी, पुलाव, दाल मखनी' } },
      { category: { en: 'Assorted Breads (पोळी / पुरी / रोटी)', mr: 'रोट्या व पुऱ्या' }, items: { en: 'Chapati, Puri, Butter Naan, Jowar/Bajra Bhakri', mr: 'पोळी, पुरी, बटर नान, भाकरी' } },
      { category: { en: 'Salads & Accompaniments (कोशिंबीर व तोंडी लावणी)', mr: 'कोशिंबीर व तोंडी लावणी' }, items: { en: 'Green Salad, Boondi Raita, Papad, Chutney, Pickles', mr: 'ग्रीन सॅलड, रायता, पापड, चटण्या व लोणचे' } },
      { category: { en: 'Multiple Sweets & Ice Cream (मिठाया व आईस्क्रीम)', mr: 'मिठाया व आईस्क्रीम' }, items: { en: 'Shrikhand/Basundi + Hot Gulab Jamun + Ice Cream', mr: 'श्रीखंड/बासुंदी + गरम गुलाबजाम + आईस्क्रीम' } },
    ],
    menuHighlights: [
      { en: 'Welcome Drinks & Mocktails Station', mr: 'स्वागत पेय व मॉकटेल्स काउंटर' },
      { en: 'Multiple Live Starters & Chaat Options', mr: '२-३ थेट स्टार्टर्स व चाट' },
      { en: 'Royal Multi-Cuisine Main Course (Paneer & Regional Specials)', mr: 'शाही पनीर व पारंपारिक मुख्य जेवण' },
      { en: 'Shahi Veg Biryani & Dal Makhani / Tadka', mr: 'शाही व्हेज बिर्याणी व दाल मखनी' },
      { en: 'Assorted Breads: Chapati, Puri, Naan or Bhakri', mr: 'पोळी, पुरी, नान व भाकरी' },
      { en: 'Multiple Sweets + Premium Ice Cream', mr: '२ खास मिठाया व आईस्क्रीम' },
    ],
    inclusions: [
      {
        title: { en: 'Executive Catering Coordinator', mr: 'स्वतंत्र केटरिंग समन्वयक' },
        description: { en: 'End-to-end event planning, guest flow, and timing management.', mr: 'कार्यक्रमाची संपूर्ण आखणी आणि वेळेचे समन्वय व्यवस्थापन.' },
        status: 'included',
      },
      {
        title: { en: 'Live Stalls & Specialized Cooking Counters', mr: 'थेट स्टॉल्स व खास काउंटर्स' },
        description: { en: 'Live hot roti, chaat, or dessert stations.', mr: 'गरमागरम रोट्या, चाट व मिठाईचे लाइव्ह स्टॉल्स.' },
        status: 'included',
      },
      {
        title: { en: 'Uniformed Elite Serving Team', mr: 'गणवेशातील प्रशिक्षित वाढपी' },
        description: { en: 'Dedicated hospitality personnel ensuring flawless service.', mr: 'अखंड आदरातिथ्य आणि तत्पर सेवा देणारे वाढपी.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Price on Request. Custom quotation is prepared following consultation regarding total guest count, preferred courses, and venue facilities.',
      mr: 'किंमत चौकशीनुसार. पाहुण्यांची संख्या, मेनू आणि जागेच्या स्वरूपानुसार सविस्तर चर्चा करून अचूक कोटेशन दिले जाते.',
    },
    isFeatured: true,
    displayOrder: 4,
    isActive: true,
  },
];

// Combine all packages (budget packages + full service packages)
export const defaultPackages = [
  ...defaultBudgetPackages,
  {
    id: 'pkg-with-material',
    slug: 'with-material',
    category: 'with-material',
    name: {
      en: 'With Material Catering Model',
      mr: 'साहित्यांसह केटरिंग मॉडेल',
    },
    packageType: 'with-material',
    shortDescription: {
      en: 'A comprehensive catering arrangement where food ingredients and agreed materials are arranged as part of the service.',
      mr: 'या पर्यायामध्ये ठरल्याप्रमाणे खाद्यपदार्थांचे साहित्य आणि आवश्यक वस्तूंची व्यवस्था केटरिंग सेवेमध्ये समाविष्ट केली जाते.',
    },
    fullDescription: {
      en: 'With Material Catering provides a completely hands-off experience for the host. Our team arranges all agreed groceries, vegetables, dairy, and spices according to the chosen menu, providing hygienic on-site cooking and polite dining service.',
      mr: 'साहित्यांसह केटरिंगमध्ये यजमानांना कोणताही त्रास न होता संपूर्ण व्यवस्था आमची टीम सांभाळते. किराणा, भाज्या व सर्व खाद्यसाहित्य आम्ही उपलब्ध करून देतो आणि उत्तम स्वयंपाक व आदरातिथ्य करतो.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      alt: { en: 'With Material Catering Feast', mr: 'साहित्यांसह केटरिंग' },
    },
    price: { amount: null, unit: 'custom-quote' },
    minimumGuests: 50,
    foodPreferences: ['Veg', 'Pure Vegetarian'],
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    menuHighlights: [
      { en: 'All Raw Food Materials & Groceries Arranged', mr: 'सर्व कच्चा माल व किराणा आम्ही आणतो' },
      { en: 'Fresh On-Site Cooking by Master Cooks', mr: 'अनुभवी आचाऱ्यांकडून ताजा स्वयंपाक' },
      { en: 'Courteous Uniformed Serving Staff', mr: 'प्रशिक्षित व नम्र वाढपी व्यवस्था' },
      { en: 'Buffet Stations & Utensil Setup Included', mr: 'बुफे काउंटर व स्वयंपाकाची भांडी' },
    ],
    inclusions: [
      {
        title: { en: 'Food Ingredients & Materials', mr: 'खाद्यपदार्थांचे सर्व साहित्य' },
        description: { en: 'Fresh vegetables, grocery, spices, and cooking oil procured as agreed.', mr: 'ठरल्यानुसार ताजी भाजी, किराणा, मसाले आणि खाद्यतेल आणले जाते.' },
        status: 'included',
      },
      {
        title: { en: 'Cooking Team', mr: 'स्वयंपाकी पथक' },
        description: { en: 'Experienced cooks prepare meals according to taste preferences.', mr: 'अनुभवी आचाऱ्यांकडून चवदार जेवण बनवले जाते.' },
        status: 'included',
      },
      {
        title: { en: 'Serving Staff', mr: 'वाढपी सेवा' },
        description: { en: 'Staff to manage buffet counters and guest service.', mr: 'पाहुण्यांच्या जेवणासाठी वाढपी पथक उपलब्ध.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Inclusion boundaries and quotation are confirmed transparently prior to event booking.',
      mr: 'बुकिंग करण्यापूर्वी सर्व अटी व कोटेशन स्पष्टपणे ठरवले जातात.',
    },
    isFeatured: true,
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'pkg-without-material',
    slug: 'without-material',
    category: 'without-material',
    name: {
      en: 'Without Material Catering Model',
      mr: 'साहित्याशिवाय केटरिंग मॉडेल',
    },
    packageType: 'without-material',
    shortDescription: {
      en: 'A catering arrangement where the customer arranges materials using our recipe list, and our team handles the cooking and service.',
      mr: 'ग्राहकांनी आमच्या यादीनुसार साहित्य आणून द्यायचे असते आणि आमचे आचारी केवळ स्वयंपाक व वाढपाची जबाबदारी सांभाळतात.',
    },
    fullDescription: {
      en: 'Without Material Catering is designed for hosts who prefer to purchase grocery, vegetables, and cooking materials directly. Aditi Caterers provides an itemized grocery measurement list and dispatches experienced master cooks and serving staff to manage cooking and hospitality.',
      mr: 'साहित्याशिवाय केटरिंग हा पर्याय अशा ग्राहकांसाठी आहे ज्यांना किराणा स्वतः आणायचा असतो. आम्ही आवश्यक साहित्याची अचूक यादी देतो आणि आमचे महाराज चविष्ट स्वयंपाक करून वाढप करतात.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      alt: { en: 'Without Material Catering Feast', mr: 'साहित्याशिवाय केटरिंग' },
    },
    price: { amount: null, unit: 'custom-quote' },
    minimumGuests: 30,
    foodPreferences: ['Veg', 'Pure Vegetarian'],
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    menuHighlights: [
      { en: 'Accurate Ingredient Quantity List Provided', mr: 'किराणा व साहित्याची अचूक यादी' },
      { en: 'Skilled Master Cooks (Maharaj & Helpers)', mr: 'तज्ज्ञ महाराज व स्वयंपाकी' },
      { en: 'Traditional Pangat or Buffet Serving Staff', mr: 'पंगत किंवा बुफेसाठी वाढपी' },
      { en: 'Hygienic Cooking Using Host Raw Materials', mr: 'यजमानांच्या साहित्यातून स्वच्छ स्वयंपाक' },
    ],
    inclusions: [
      {
        title: { en: 'Ingredient Quantity Measurement', mr: 'साहित्याचे अचूक प्रमाण व यादी' },
        description: { en: 'Provided to host well in advance for grocery purchase.', mr: 'किराणा खरेदीसाठी यजमानांना वेळेवर प्रमाण देणे.' },
        status: 'included',
      },
      {
        title: { en: 'Expert Cooking Team', mr: 'तज्ज्ञ स्वयंपाकी' },
        description: { en: 'Skillful cooking using customer-provided raw ingredients.', mr: 'ग्राहकांच्या साहित्यातून उत्कृष्ट स्वयंपाक.' },
        status: 'included',
      },
      {
        title: { en: 'Raw Food Grocery', mr: 'कच्चा किराणा' },
        description: { en: 'Procured and arranged directly by the customer.', mr: 'ग्राहकांनी स्वतः खरेदी करून द्यायचा असतो.' },
        status: 'not-included',
      },
    ],
    conditions: {
      en: 'Raw materials must be available on-site before cooking start time. Kitchen water and gas access are coordinated with the venue.',
      mr: 'स्वयंपाकापूर्वी सर्व साहित्य हॉलवर उपलब्ध असणे आवश्यक आहे. पाणी व गॅसची व्यवस्था हॉलच्या नियमांनुसार केली जाते.',
    },
    isFeatured: true,
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'pkg-custom-catering',
    slug: 'custom-catering',
    category: 'custom',
    name: {
      en: 'Custom Catering Package',
      mr: 'कस्टम केटरिंग पॅकेज',
    },
    packageType: 'custom',
    shortDescription: {
      en: 'Discuss your event requirements with our team to plan a customized catering arrangement tailored to your scale and preferences.',
      mr: 'तुमच्या कार्यक्रमाच्या गरजेनुसार योग्य मेनू आणि केटरिंगची व्यवस्था ठरवण्यासाठी आमच्या टीमशी चर्चा करा.',
    },
    fullDescription: {
      en: 'Every event is unique. Our Custom Catering Package gives you complete freedom to tailor food items, dining styles (seated pangat, modern buffet, or live food stations), multiple meal timelines, and sourcing models. Discuss your vision with our team to receive an itemized, transparent quotation.',
      mr: 'प्रत्येक कार्यक्रम खास असतो. कस्टम केटरिंग पॅकेजमुळे तुम्हाला मेनू, जेवणाची पद्धत (पंगत, बुफे किंवा थेट स्टॉल्स), वेळापत्रक आणि साहित्याची पद्धत निवडण्याचे पूर्ण स्वातंत्र्य मिळते. आमच्या टीमशी संपर्क साधून तुमच्या बजेटनुसार अचूक कोटेशन मिळवा.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      alt: { en: 'Custom Catering Planning', mr: 'कस्टम केटरिंग' },
    },
    price: { amount: null, unit: 'custom-quote' },
    minimumGuests: 25,
    foodPreferences: ['Veg', 'Pure Vegetarian', 'Custom Choices'],
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    menuHighlights: [
      { en: 'Tailored Multi-Course Menu Design', mr: 'मागणीनुसार मेनूची रचना' },
      { en: 'Flexible Material Sourcing Options', mr: 'साहित्याची लवचिक निवड' },
      { en: 'Live Stalls: Chaat, Dosa, Jalebi, Mocktails', mr: 'थेट स्टॉल्स: चाट, डोसा, जिलेबी' },
      { en: 'Transparent Itemized Quotation', mr: 'पारदर्शक आणि तपशीलवार कोटेशन' },
    ],
    inclusions: [
      {
        title: { en: 'Personalized Menu Design', mr: 'वैयक्तिक मेनू आखणी' },
        description: { en: 'Curated dishes selected across diverse regional cuisines.', mr: 'पसंतीनुसार मेनूची रचना.' },
        status: 'included',
      },
      {
        title: { en: 'Direct Catering Coordination', mr: 'थेट केटरिंग समन्वय' },
        description: { en: 'Direct guidance on portions, timeline, and food counters.', mr: 'प्रमाण आणि वेळेवर थेट मार्गदर्शन.' },
        status: 'included',
      },
    ],
    conditions: {
      en: 'Quotation and feasibility are shared following discussion of guest count, venue, and requested menu items.',
      mr: 'पाहुण्यांची संख्या आणि मेनूच्या सविस्तर चर्चेनंतर कोटेशन दिले जाते.',
    },
    isFeatured: true,
    displayOrder: 7,
    isActive: true,
  },
];

// Section 5.5.1 B: Budget Comparison Table (Matching Matrix)
export const defaultBudgetComparison = [
  {
    feature: { en: 'Guest Count', mr: 'पाहुण्यांची संख्या' },
    basic: { en: '100 People', mr: '१०० लोक' },
    standard: { en: '100 People', mr: '१०० लोक' },
    premium: { en: '100 People', mr: '१०० लोक' },
    luxury: { en: 'Custom (50 to 1000+)', mr: 'गरजेनुसार (५० ते १०००+)' },
  },
  {
    feature: { en: 'Bhaji (भाज्या)', mr: 'भाज्या' },
    basic: { en: '1 Type', mr: '१ प्रकार' },
    standard: { en: '2 Types', mr: '२ प्रकार' },
    premium: { en: '2 Types (1 Special + 1 Regular)', mr: '२ प्रकार (१ स्पेशल + १ साधी)' },
    luxury: { en: 'Multiple Special & Paneer Options', mr: 'विविध स्पेशल व पनीर पर्याय' },
  },
  {
    feature: { en: 'Dal / Amti (डाळ / आमटी)', mr: 'डाळ / आमटी' },
    basic: { en: '—', mr: '—' },
    standard: { en: '1 Type', mr: '१ प्रकार' },
    premium: { en: '1 Type', mr: '१ प्रकार' },
    luxury: { en: 'Dal Makhani / Shahi Dal Tadka', mr: 'दाल मखनी / तडका' },
  },
  {
    feature: { en: 'Rice (भात)', mr: 'भात' },
    basic: { en: '1 Type (Steamed)', mr: '१ प्रकार (साधा भात)' },
    standard: { en: '1 Type (Steamed / Jeera)', mr: '१ प्रकार (भात / जिरा)' },
    premium: { en: 'Rice OR Pulao (Choose any one)', mr: 'भात किंवा पुलाव (कोणताही एक)' },
    luxury: { en: 'Multiple: Shahi Biryani, Pulao, Jeera Rice', mr: 'बिर्याणी, पुलाव, जिरा राईस' },
  },
  {
    feature: { en: 'Chapati / Puri (पोळी / पुरी)', mr: 'पोळी / पुरी' },
    basic: { en: 'Choose Any One (Chapati OR Puri)', mr: 'पोळी किंवा पुरी (कोणताही एक)' },
    standard: { en: 'Choose Any One (Chapati OR Puri)', mr: 'पोळी किंवा पुरी (कोणताही एक)' },
    premium: { en: 'Both Chapati AND Puri Included', mr: 'पोळी आणि पुरी दोन्ही समाविष्ट' },
    luxury: { en: 'Chapati, Puri, Naan, Bhakri', mr: 'पोळी, पुरी, नान, भाकरी' },
  },
  {
    feature: { en: 'Starter / Appetizer (स्टार्टर)', mr: 'स्टार्टर' },
    basic: { en: '—', mr: '—' },
    standard: { en: '—', mr: '—' },
    premium: { en: '1 Type (Crispy Cutlet / Vadi)', mr: '१ प्रकार (कटलेट / वडी)' },
    luxury: { en: 'Multiple Live Starters & Chaat', mr: '२-३ थेट स्टार्टर्स व चाट' },
  },
  {
    feature: { en: 'Salad / Koshimbir (कोशिंबीर)', mr: 'कोशिंबीर' },
    basic: { en: '—', mr: '—' },
    standard: { en: '1 Type (Fresh Koshimbir + Pickle)', mr: '१ प्रकारची कोशिंबीर + लोणचे' },
    premium: { en: '1 Type + Papad Included', mr: '१ कोशिंबीर + पापड समाविष्ट' },
    luxury: { en: 'Green Salad, Boondi Raita, Papad', mr: 'सॅलड, रायता, पापड, चटण्या' },
  },
  {
    feature: { en: 'Sweet / Dessert (गोड पदार्थ)', mr: 'गोड पदार्थ' },
    basic: { en: '—', mr: '—' },
    standard: { en: '1 Type (Gulab Jamun / Jalebi)', mr: '१ प्रकार (गुलाबजाम / जिलेबी)' },
    premium: { en: '1 Type (Shrikhand / Basundi / Jamun)', mr: '१ प्रकार (श्रीखंड / बासुंदी / जामून)' },
    luxury: { en: 'Multiple Sweets + Ice Cream Counter', mr: '२ खास मिठाया + आईस्क्रीम' },
  },
  {
    feature: { en: 'Proposed Price (100 Guests)', mr: 'प्रस्तावित दर (१०० पाहुणे)' },
    basic: { en: '₹10,000 (~₹100/person)', mr: '₹१०,००० (~₹१००/व्यक्ती)' },
    standard: { en: '₹20,000 (~₹200/person)', mr: '₹२०,००० (~₹२००/व्यक्ती)' },
    premium: { en: '₹30,000 (~₹300/person)', mr: '₹३०,००० (~₹३००/व्यक्ती)' },
    luxury: { en: 'Price on Request (Quotation)', mr: 'किंमत चौकशीनुसार (कोटेशन)' },
  },
];

// Section 5.7: Service Models Comparison
export const defaultPackageComparison = [
  {
    feature: { en: 'Food Material Arrangement', mr: 'खाद्यसाहित्य व्यवस्था' },
    withMaterial: { en: 'Procured & arranged by Aditi Caterers', mr: 'अदिती केटरर्सकडून ठरल्याप्रमाणे आणले जाते' },
    withoutMaterial: { en: 'Purchased by Customer (using our list)', mr: 'ग्राहकांनी आमच्या यादीनुसार आणायचे असते' },
    custom: { en: 'Flexible: As agreed during consultation', mr: 'लवचिक: चर्चेनुसार ठरवले जाते' },
  },
  {
    feature: { en: 'Menu Selection & Planning', mr: 'मेनू निवड व नियोजन' },
    withMaterial: { en: 'Approved package menu', mr: 'ठरलेला निश्चित मेनू' },
    withoutMaterial: { en: 'Agreed traditional/event menu', mr: 'चर्चेनुसार ठरलेला मेनू' },
    custom: { en: 'Fully customizable multi-cuisine', mr: 'पूर्णपणे मागणीनुसार कस्टमाइज्ड' },
  },
  {
    feature: { en: 'Expert Chefs & Helpers', mr: 'अनुभवी महाराज व स्वयंपाकी' },
    withMaterial: { en: 'Included', mr: 'समाविष्ट' },
    withoutMaterial: { en: 'Included', mr: 'समाविष्ट' },
    custom: { en: 'Included', mr: 'समाविष्ट' },
  },
  {
    feature: { en: 'Serving Staff & Dining Support', mr: 'वाढपी पथक व आदरातिथ्य' },
    withMaterial: { en: 'Included (Buffet / Counters)', mr: 'समाविष्ट (बुफे / काउंटर्स)' },
    withoutMaterial: { en: 'Included (Pangat / Buffet)', mr: 'समाविष्ट (पंगत / बुफे)' },
    custom: { en: 'Tailored to guest count & style', mr: 'पाहुण्यांच्या संख्येनुसार व्यवस्था' },
  },
  {
    feature: { en: 'Cooking Equipment & Utensils', mr: 'स्वयंपाकाची भांडी' },
    withMaterial: { en: 'Included as agreed', mr: 'ठरल्याप्रमाणे समाविष्ट' },
    withoutMaterial: { en: 'On Request / Mutually agreed', mr: 'मागणीनुसार / परस्पर चर्चेनुसार' },
    custom: { en: 'Configured per event need', mr: 'कार्यक्रमानुसार व्यवस्था' },
  },
  {
    feature: { en: 'Minimum Guest Capacity', mr: 'किमान पाहुण्यांची मर्यादा' },
    withMaterial: { en: 'Typically 50+ guests', mr: 'साधारण ५०+ पाहुणे' },
    withoutMaterial: { en: 'Typically 30+ guests', mr: 'साधारण ३०+ पाहुणे' },
    custom: { en: 'Discussed with team (25+)', mr: 'चर्चेनुसार (२५+ पाहुणे)' },
  },
  {
    feature: { en: 'Pricing & Quotation', mr: 'दर व कोटेशन' },
    withMaterial: { en: 'Transparent Quote / Price on Request', mr: 'पारदर्शक कोटेशन / चौकशीनुसार' },
    withoutMaterial: { en: 'Labor Quote / Price on Request', mr: 'सेवा कोटेशन / चौकशीनुसार' },
    custom: { en: 'Customized itemized quotation', mr: 'तपशीलवार कस्टम कोटेशन' },
  },
];

// Section 5.8: What's Included
export const defaultWhatsIncluded = [
  {
    id: 'food-prep',
    icon: 'bi-fire',
    title: { en: 'Food Preparation & Cooking', mr: 'स्वयंपाक व अन्न तयार करणे' },
    description: {
      en: 'Skilled cooks prepare freshly cooked dishes adhering strictly to hygiene and agreed taste profiles.',
      mr: 'अनुभवी स्वयंपाकी स्वच्छतेचे आणि ठरलेल्या चवीचे काटेकोर पालन करून ताजे अन्न तयार करतात.',
    },
    status: 'included',
  },
  {
    id: 'ingredients',
    icon: 'bi-basket2-fill',
    title: { en: 'Food Ingredients & Grocery', mr: 'खाद्यसाहित्य व किराणा' },
    description: {
      en: 'Included under With Material; provided by the customer under Without Material arrangements.',
      mr: 'साहित्यासह केटरिंगमध्ये समाविष्ट असते; साहित्याशिवाय पर्यायामध्ये ग्राहक उपलब्ध करून देतात.',
    },
    status: 'on-request',
  },
  {
    id: 'serving-staff',
    icon: 'bi-person-badge-fill',
    title: { en: 'Courteous Serving Staff', mr: 'प्रशिक्षित व नम्र वाढपी' },
    description: {
      en: 'Trained personnel assist with guest dining, serving counters, and hot food refilling.',
      mr: 'पाहुण्यांच्या जेवणासाठी, अन्न वाढण्यासाठी आणि काउंटर्स भरण्यासाठी प्रशिक्षित मदतनीस.',
    },
    status: 'included',
  },
  {
    id: 'serving-setup',
    icon: 'bi-grid-3x3-gap-fill',
    title: { en: 'Serving Arrangements (Buffet / Pangat)', mr: 'वाढप मांडणी (बुफे किंवा पंगत)' },
    description: {
      en: 'Structured table arrangements for traditional seated dining or multi-counter buffets.',
      mr: 'पारंपारिक पंगतीची किंवा आधुनिक बुफे काउंटर्सची व्यवस्थित मांडणी.',
    },
    status: 'included',
  },
  {
    id: 'equipment',
    icon: 'bi-gear-wide-connected',
    title: { en: 'Cooking Utensils & Equipment', mr: 'स्वयंपाकाची भांडी व उपकरणे' },
    description: {
      en: 'Large cooking cauldrons, ladles, and food warmers provided based on prior agreement.',
      mr: 'स्वयंपाकाची मोठी भांडी, कढया आणि हॉट फूड कंटेनर्स परस्पर चर्चेनुसार दिले जातात.',
    },
    status: 'on-request',
  },
  {
    id: 'transport',
    icon: 'bi-truck',
    title: { en: 'Transportation & Logistics', mr: 'वाहतूक व लॉजिस्टिक' },
    description: {
      en: 'Equipment and material transportation coordinated based on distance and venue location.',
      mr: 'हॉलचे अंतर आणि परिसराच्या सोयीनुसार वाहतूक व्यवस्था समन्वयित केली जाते.',
    },
    status: 'on-request',
  },
  {
    id: 'cleanup',
    icon: 'bi-stars',
    title: { en: 'Counter Setup & Cleanup', mr: 'काउंटर मांडणी व स्वच्छता' },
    description: {
      en: 'Initial food counter setup and post-meal service area clearing and tidying.',
      mr: 'जेवणापूर्वी काउंटर्सची मांडणी आणि जेवणानंतर फूड काउंटर परिसराची स्वच्छता.',
    },
    status: 'included',
  },
];

// Section 5.10: How It Works
export const defaultPackageProcess = [
  {
    num: '01',
    icon: 'bi-box-seam',
    title: { en: 'Choose a Package', mr: 'पॅकेज निवडा' },
    desc: {
      en: 'Select Basic, Standard, Premium, Luxury, With Material, or Without Material options.',
      mr: 'बेसिक, स्टँडर्ड, प्रीमियम, लक्झरी किंवा साहित्यासह/साहित्याशिवाय पर्यायांपैकी योग्य पर्याय निवडा.',
    },
  },
  {
    num: '02',
    icon: 'bi-calendar-event',
    title: { en: 'Share Event Details', mr: 'कार्यक्रमाची माहिती द्या' },
    desc: {
      en: 'Provide your event date, venue location, estimated guest count, and preferred meal type.',
      mr: 'कार्यक्रमाची तारीख, ठिकाण, पाहुण्यांची संख्या आणि जेवणाची वेळ आम्हाला सांगा.',
    },
  },
  {
    num: '03',
    icon: 'bi-chat-dots',
    title: { en: 'Discuss Requirements', mr: 'गरजांबद्दल चर्चा करा' },
    desc: {
      en: 'Our catering coordinator connects with you to discuss menu items and logistical arrangements.',
      mr: 'आमचे केटरिंग समन्वयक तुमच्याशी संपर्क साधून मेनू आणि व्यवस्थेवर सविस्तर चर्चा करतात.',
    },
  },
  {
    num: '04',
    icon: 'bi-file-earmark-text',
    title: { en: 'Receive Quotation', mr: 'कोटेशन मिळवा' },
    desc: {
      en: 'Receive a transparent, itemized quotation customized to your confirmed specifications.',
      mr: 'तुमच्या गरजेनुसार तयार केलेले पारदर्शक आणि अचूक कोटेशन मिळवा.',
    },
  },
  {
    num: '05',
    icon: 'bi-check-circle-fill',
    title: { en: 'Confirm Booking', mr: 'बुकिंग निश्चित करा' },
    desc: {
      en: 'Lock in your booking date and relax while our team prepares your event catering.',
      mr: 'तारीख निश्चित करून बुकिंग कन्फर्म करा आणि निश्चिंतपणे कार्यक्रमाचा आनंद घ्या.',
    },
  },
];

// Section 5.11: Package FAQs
export const defaultPackageFaqs = [
  {
    id: 1,
    q: {
      en: 'What is the difference between With Material and Without Material Catering?',
      mr: 'साहित्यांसह आणि साहित्याशिवाय केटरिंगमध्ये काय फरक आहे?',
    },
    a: {
      en: 'In With Material Catering, Aditi Caterers sources all agreed groceries, spices, and fresh ingredients. In Without Material Catering, the host procures ingredients according to our detailed estimation list, and our team handles the cooking, kitchen management, and serving.',
      mr: 'साहित्यांसह केटरिंगमध्ये किराणा, मसाले व सर्व खाद्यसाहित्य आमची टीम आणते. साहित्याशिवाय केटरिंगमध्ये ग्राहक आमच्या यादीनुसार साहित्य आणून देतात आणि आमचे आचारी व वाढपी केवळ उत्कृष्ट स्वयंपाक व वाढपाची सेवा देतात.',
    },
  },
  {
    id: 2,
    q: {
      en: 'Can I customize my catering package menu?',
      mr: 'मी माझे केटरिंग पॅकेज कस्टमाइज करू शकतो का?',
    },
    a: {
      en: 'Yes, absolutely. All packages can be tailored with your choice of Maharashtrian, North Indian, sweet, snack, and beverage options.',
      mr: 'होय, नक्कीच. प्रत्येक पॅकेजमधील मेनू तुमच्या आवडीनुसार महाराष्ट्रीयन, उत्तर भारतीय, मिठाई आणि नाश्त्याच्या पदार्थांसह बदलता येतो.',
    },
  },
  {
    id: 3,
    q: {
      en: 'How is the package price calculated?',
      mr: 'पॅकेजची किंमत कशी ठरवली जाते?',
    },
    a: {
      en: 'Pricing depends on the selected package type (with or without material), total guest count, specific dishes selected, and venue service requirements. We provide itemized quotations upfront with zero hidden charges.',
      mr: 'पॅकेजचा प्रकार (साहित्यासह की साहित्याशिवाय), पाहुण्यांची संख्या, निवडलेले पदार्थ आणि हॉलच्या गरजेनुसार किंमत ठरवली जाते. आम्ही कोणताही लपवलेला खर्च न ठेवता पारदर्शक कोटेशन देतो.',
    },
  },
  {
    id: 4,
    q: {
      en: 'Can I select my own food menu combinations?',
      mr: 'मी माझ्या आवडीचा मेनू निवडू शकतो का?',
    },
    a: {
      en: 'Yes. You can explore our Food Menu page and request specific starter, main course, bread, rice, and dessert combinations.',
      mr: 'होय. तुम्ही आमच्या "मेनू" पृष्ठावरून आवडते स्टार्टर्स, मुख्य जेवण, रोट्या, भात आणि गोड पदार्थांची निवड करू शकता.',
    },
  },
  {
    id: 5,
    q: {
      en: 'Can I enquire before confirming a booking?',
      mr: 'बुकिंग निश्चित करण्यापूर्वी मी चौकशी करू शकतो का?',
    },
    a: {
      en: 'Yes. You can freely submit an enquiry through our website or call/WhatsApp us at +91 9975959391 to discuss feasibility and pricing before committing.',
      mr: 'होय. बुकिंग निश्चित करण्यापूर्वी तुम्ही वेबसाइटवरून मोफत चौकशी करू शकता किंवा थेट +91 9975959391 वर संपर्क साधून सर्व माहिती घेऊ शकता.',
    },
  },
  {
    id: 6,
    q: {
      en: 'How can I get a quotation for my event?',
      mr: 'माझ्या कार्यक्रमासाठी कोटेशन कसे मिळेल?',
    },
    a: {
      en: 'Click "Request a Custom Quote" or "Enquire Now" on any package, provide your guest count and date, and our coordinator will share a tailored estimate promptly.',
      mr: 'कोणत्याही पॅकेजवरील "कस्टम कोटेशन मागवा" किंवा "चौकशी करा" बटणावर क्लिक करून माहिती भरा, आमची टीम तुम्हाला लगेच योग्य कोटेशन देईल.',
    },
  },
];

export const defaultGuestCountOptions = [
  { value: 50, label: '50 People / लोक' },
  { value: 100, label: '100 People / लोक (Standard)' },
  { value: 150, label: '150 People / लोक' },
  { value: 200, label: '200 People / लोक' },
  { value: 300, label: '300 People / लोक' },
  { value: 500, label: '500+ People / लोक' },
];

// API Functions
export async function getAllPackages() {
  try {
    const res = await api.get('/public/packages');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Check storage for admin packages
  }

  try {
    const stored = JSON.parse(localStorage.getItem('aditi_admin_packages') || '[]');
    if (Array.isArray(stored) && stored.length > 0) {
      const published = stored.filter((p) => p.status === 'published');
      if (published.length > 0) {
        published.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        return published;
      }
    }
  } catch {
    // fallback
  }

  return defaultPackages;
}

export async function getBudgetPackages() {
  try {
    const res = await api.get('/public/packages/budget');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
    return defaultBudgetPackages;
  } catch {
    return defaultBudgetPackages;
  }
}

export async function getPackageBySlug(slug) {
  try {
    const res = await api.get(`/public/packages/${slug}`);
    if (res?.data?.data) {
      return res.data.data;
    }
  } catch {
    // Fall back to local search
  }
  const match = defaultPackages.find(
    (p) => p.slug?.toLowerCase() === slug?.toLowerCase() || p.id?.toLowerCase() === slug?.toLowerCase()
  );
  return match || null;
}

export async function getFeaturedPackages() {
  try {
    const res = await api.get('/public/packages/featured');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  return defaultPackages.filter((p) => p.isFeatured);
}

export async function getPackagesByType(type) {
  try {
    const res = await api.get(`/public/packages/type/${type}`);
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  if (!type || type === 'all') return defaultPackages;
  return defaultPackages.filter((p) => p.packageType === type || p.category === type);
}

export async function getRelatedPackages(currentSlug, limit = 3) {
  try {
    const res = await api.get(`/public/packages/${currentSlug}/related`);
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // Fall back
  }
  return defaultPackages.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export default {
  getAllPackages,
  getBudgetPackages,
  getPackageBySlug,
  getFeaturedPackages,
  getPackagesByType,
  getRelatedPackages,
  defaultPackageTypes,
  defaultBudgetPackages,
  defaultPackages,
  defaultBudgetComparison,
  defaultPackageComparison,
  defaultWhatsIncluded,
  defaultPackageProcess,
  defaultPackageFaqs,
  defaultGuestCountOptions,
};
