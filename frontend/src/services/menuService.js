import api from './api';

export const defaultCategories = [
  {
    id: 'breakfast',
    slug: 'breakfast',
    sortOrder: 1,
    icon: 'bi-cup-hot-fill',
    name: {
      en: 'Breakfast & Snacks',
      mr: 'सकाळचा नाश्ता व स्नॅक्स',
    },
    shortDescription: {
      en: 'Freshly prepared traditional morning breakfasts and evening high-tea savories.',
      mr: 'गरमागरम पारंपारिक नाश्ता आणि संध्याकाळच्या चहासाठी स्वादिष्ट खमंग स्नॅक्स.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Authentic Indian breakfast spread', mr: 'पारंपारिक नाश्ता' },
    },
    itemCount: 8,
  },
  {
    id: 'starters',
    slug: 'starters',
    sortOrder: 2,
    icon: 'bi-fire',
    name: {
      en: 'Starters & Appetizers',
      mr: 'स्टार्टर्स व तोंडी लावणी',
    },
    shortDescription: {
      en: 'Crispy fried and tandoor appetizers that kickstart celebratory dining in style.',
      mr: 'कार्यक्रमाची रंगत वाढवणारे कुरकुरीत आणि खमंग पारंपारिक व आधुनिक स्टार्टर्स.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Maharashtrian fried snacks and starters', mr: 'खमंग स्टार्टर्स' },
    },
    itemCount: 8,
  },
  {
    id: 'maharashtrian',
    slug: 'maharashtrian',
    sortOrder: 3,
    icon: 'bi-flower1',
    name: {
      en: 'Maharashtrian Special Feasts',
      mr: 'अस्सल महाराष्ट्रीयन जेवण',
    },
    shortDescription: {
      en: 'Traditional festival and wedding feasts made with authentic spices and home-style pure ghee.',
      mr: 'लग्न, सण व मंगलकार्यासाठी अस्सल गावरान चवीचे पारंपारिक व मानाचे पक्वान्ने.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Traditional Maharashtrian Thali feast', mr: 'महाराष्ट्रीयन भोजन थाळी' },
    },
    itemCount: 10,
    isFeatured: true,
  },
  {
    id: 'punjabi',
    slug: 'punjabi',
    sortOrder: 4,
    icon: 'bi-egg-fried',
    name: {
      en: 'North Indian & Punjabi',
      mr: 'पंजाबी व उत्तर भारतीय पक्वान्ने',
    },
    shortDescription: {
      en: 'Rich paneer curries, creamy gravies, and aromatic North Indian specialties.',
      mr: 'शाही पनीर, चमचमीत भाज्या आणि भरगच्च पंजाबी ग्रेव्हीच्या लोकप्रिय पदार्थांची मेजवानी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Paneer Butter Masala curry', mr: 'शाही पनीर भाजी' },
    },
    itemCount: 8,
  },
  {
    id: 'rotis',
    slug: 'rotis',
    sortOrder: 5,
    icon: 'bi-disc-fill',
    name: {
      en: 'Rotis, Puris & Breads',
      mr: 'पोळी, भाकरी, पुरी व नान',
    },
    shortDescription: {
      en: 'Tawa-fresh wheat chapatis, piping hot puris, and wood-fired traditional bhakris.',
      mr: 'तव्यावरून थेट वाढल्या जाणाऱ्या मऊ पोळ्या, गरमागरम पुऱ्या आणि अस्सल ज्वारी-बाजरीच्या भाकरी.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Hot puffed puris and chapatis', mr: 'गरमागरम पोळी आणि पुऱ्या' },
    },
    itemCount: 6,
  },
  {
    id: 'rice',
    slug: 'rice',
    sortOrder: 6,
    icon: 'bi-cloud-sun-fill',
    name: {
      en: 'Rice, Pulao & Biryani',
      mr: 'सुवासिक भात, पुलाव व बिर्याणी',
    },
    shortDescription: {
      en: 'Festive Masale Bhaat, royal Veg Dum Biryani, and fragrant Basmati rice dishes.',
      mr: 'लग्नकार्याचा खास मसाले भात, शाही व्हेज दम बिर्याणी आणि सुवासिक जीरा राइस.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Flavored vegetable biryani with saffron', mr: 'मसाले भात व बिर्याणी' },
    },
    itemCount: 6,
  },
  {
    id: 'desserts',
    slug: 'desserts',
    sortOrder: 7,
    icon: 'bi-heart-fill',
    name: {
      en: 'Traditional Sweets & Desserts',
      mr: 'गोड पदार्थ व मिठाया',
    },
    shortDescription: {
      en: 'Signature handmade Ukadiche Modak, golden Basundi, Puran Poli, and royal desserts.',
      mr: 'अदिती केटरर्सचे खास उकडीचे मोदक, केशरी बासुंदी, गुळगुळीत पुरणपोळी व शाही मिठाया.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Traditional Indian sweets and modak', mr: 'उकडीचे मोदक व गोड पदार्थ' },
    },
    itemCount: 8,
    isFeatured: true,
  },
  {
    id: 'beverages',
    slug: 'beverages',
    sortOrder: 8,
    icon: 'bi-cup-straw',
    name: {
      en: 'Beverages, Raitas & Chutneys',
      mr: 'पेये, सरबते, कोशिंबीर व लोणचे',
    },
    shortDescription: {
      en: 'Cooling Solkadhi, spiced buttermilk, fresh salads, papad, and crunchy accompaniments.',
      mr: 'पाचक सोलकढी, मसाला ताक, आंबट-गोड कोशिंबीर, कुरकुरीत पापड आणि घरगुती लोणचे.',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Refreshing Indian welcome drinks and solkadhi', mr: 'सोलकढी व पेये' },
    },
    itemCount: 6,
  },
];

export const defaultMenuItems = [
  // ── BREAKFAST ──────────────────────────────────────────────
  {
    id: 'item-kanda-poha',
    slug: 'kanda-poha',
    categoryId: 'breakfast',
    categorySlug: 'breakfast',
    name: {
      en: 'Maharashtrian Kanda Poha',
      mr: 'पारंपारिक कांदा पोहे',
    },
    shortDescription: {
      en: 'Lightly spiced flattened rice cooked with crunchy onions, mustard, roasted peanuts, fresh coriander, and grated coconut.',
      mr: 'खमंग फोडणी, कांदा, भाजलेले शेंगदाणे, ताजी कोथिंबीर आणि ओल्या खोबऱ्याचे खोबरे घालून केलेले रुचकर पोहे.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Plate of garnished Kanda Poha', mr: 'कांदा पोहे' },
    },
    servingStyle: { en: 'Warm Buffet / Seated Breakfast', mr: 'गरमागरम बुफे किंवा पंगत नाश्ता' },
    idealFor: { en: 'Morning Events, Haldi Ceremonies, Office Breakfasts', mr: 'सकाळचे कार्यक्रम, हळदी समारंभ, ऑफिस नाश्ता' },
    ingredients: {
      en: ['Flattened Rice (Poha)', 'Onions', 'Peanuts', 'Green Chillies', 'Curry Leaves', 'Mustard Seeds', 'Fresh Coconut', 'Lemon'],
      mr: ['पोहे', 'कांदा', 'शेंगदाणे', 'हिरवी मिरची', 'कढीपत्ता', 'मोहरी', 'ओले खोबरे', 'लिंबू'],
    },
  },
  {
    id: 'item-misal-pav',
    slug: 'misal-pav',
    categoryId: 'breakfast',
    categorySlug: 'breakfast',
    name: {
      en: 'Kolhapuri Farsan Misal Pav',
      mr: 'झणझणीत मिसळ पाव',
    },
    shortDescription: {
      en: 'Spicy sprouted moth beans curry served with crunchy farsan, chopped onions, lemon, and soft pavs.',
      mr: 'मोड आलेल्या मटकीची तर्रीदार आमटी, त्यावर कुरकुरीत फरसाण, बारीक चिरलेला कांदा व गरमागरम पाव.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 3,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Spicy Misal Pav platter', mr: 'झणझणीत मिसळ पाव' },
    },
    servingStyle: { en: 'Live Counter / Breakfast Station', mr: 'थेट लाइव्ह काउंटर / बुफे नाश्ता' },
    idealFor: { en: 'Birthday Parties, Casual Get-Togethers, Youth Events', mr: 'वाढदिवस, स्नेहसंमेलन, तरुण मेळावे' },
    ingredients: {
      en: ['Sprouted Matki', 'Farsan', 'Onion', 'Special Kolhapuri Tarri', 'Ginger Garlic', 'Pav', 'Coriander'],
      mr: ['मोड आलेली मटकी', 'फरसाण', 'कांदा', 'कोल्हापुरी तर्री मसाला', 'आले लसूण', 'पाव', 'कोथिंबीर'],
    },
  },
  {
    id: 'item-sabudana-khichdi',
    slug: 'sabudana-khichdi',
    categoryId: 'breakfast',
    categorySlug: 'breakfast',
    name: {
      en: 'Fasting Special Sabudana Khichdi',
      mr: 'उपवासाची साबुदाणा खिचडी',
    },
    shortDescription: {
      en: 'Non-sticky soaked sago cooked in pure ghee with crushed roasted peanuts, cumin, and mild green chillies.',
      mr: 'साजूक तुपातील मोकळी साबुदाणा खिचडी, भाजलेल्या दाण्याचा कूट, जिरे आणि हिरव्या मिरच्यांची खमंग चव.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Sabudana Khichdi in bowl', mr: 'साबुदाणा खिचडी' },
    },
    servingStyle: { en: 'Fresh Hot Serving with Sweet Curd', mr: 'गरमागरम सर्व्हिंग, गोड दह्यासोबत' },
    idealFor: { en: 'Ekadashi, Fasting Days, Religious Poojas', mr: 'एकादशी, उपवास, सत्यनारायण महापूजा' },
    ingredients: {
      en: ['Tapioca Pearls (Sabudana)', 'Roasted Peanuts', 'Pure Ghee', 'Cumin', 'Green Chillies', 'Rock Salt (Sendha Namak)'],
      mr: ['साबुदाणा', 'भाजलेले शेंगदाणे', 'साजूक तूप', 'जिरे', 'हिरवी मिरची', 'सेंधव मीठ'],
    },
  },
  {
    id: 'item-upma',
    slug: 'upma',
    categoryId: 'breakfast',
    categorySlug: 'breakfast',
    name: {
      en: 'Rava Sanja Upma',
      mr: 'खमंग रवा उपमा (सांजा)',
    },
    shortDescription: {
      en: 'Roasted semolina cooked with seasoned mustard, ginger, curry leaves, and tender green peas.',
      mr: 'तूप-मोहरीच्या खमंग फोडणीत शिजवलेला मऊसुत रवा सांजा, वाटाणा आणि आल्याची छान चव.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 1,
    isPopular: false,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Fresh hot semolina upma', mr: 'रवा उपमा' },
    },
    servingStyle: { en: 'Buffet Breakfast with Coconut Chutney', mr: 'नारळाच्या चटणीसह बुफे नाश्ता' },
    idealFor: { en: 'Corporate Morning Meetings, Temple Gatherings', mr: 'सकाळच्या बैठका, धार्मिक कार्यक्रम' },
    ingredients: {
      en: ['Semolina (Rava)', 'Ginger', 'Green Chillies', 'Green Peas', 'Mustard Seeds', 'Ghee/Oil', 'Curry Leaves'],
      mr: ['रवा', 'आले', 'हिरवी मिरची', 'हिरवे मटार', 'मोहरी', 'तूप/तेल', 'कढीपत्ता'],
    },
  },

  // ── STARTERS ───────────────────────────────────────────────
  {
    id: 'item-kothimbir-vadi',
    slug: 'kothimbir-vadi',
    categoryId: 'starters',
    categorySlug: 'starters',
    name: {
      en: 'Crispy Kothimbir Vadi',
      mr: 'कुरकुरीत कोथिंबीर वडी',
    },
    shortDescription: {
      en: 'Steamed and crisp-fried gram flour cubes packed with fresh coriander leaves, white sesame, and mild spices.',
      mr: 'भरपूर ताजी कोथिंबीर, तीळ आणि बेसन यांचे मिश्रण वाफवून, कुरकुरीत तळून तयार केलेली अस्सल वडी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Golden fried Kothimbir Vadi', mr: 'कोथिंबीर वडी' },
    },
    servingStyle: { en: 'Plated Appetizer with Green Mint Chutney', mr: 'हिरव्या पुदिना चटणीसोबत स्टार्टर' },
    idealFor: { en: 'Wedding Welcome Meals, Muhurat Lunch, Anniversary Dinner', mr: 'लग्न स्वागत भोजन, मुहूर्त जेवण, वर्धापनदिन' },
    ingredients: {
      en: ['Fresh Coriander (Kothimbir)', 'Gram Flour (Besan)', 'White Sesame Seeds', 'Green Chillies', 'Garlic', 'Turmeric'],
      mr: ['ताजी कोथिंबीर', 'बेसन', 'पांढरे तीळ', 'हिरवी मिरची', 'लसूण', 'हळद'],
    },
  },
  {
    id: 'item-alu-vadi',
    slug: 'alu-vadi',
    categoryId: 'starters',
    categorySlug: 'starters',
    name: {
      en: 'Maharashtrian Alu Vadi (Patra)',
      mr: 'पारंपारिक अळूची वडी',
    },
    shortDescription: {
      en: 'Colocasia leaves layered with spiced sweet-and-sour tamarind gram flour paste, steamed and shallow-fried with sesame.',
      mr: 'अळूच्या पानांवर चिंच-गूळ आणि मसाल्यांचे बेसन लावून, सुरळी वाफवून तिळावर खमंग परतलेली वडी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Sliced spiced Alu Vadi', mr: 'अळूची वडी' },
    },
    servingStyle: { en: 'Appetizer Tray / Traditional Thali Placement', mr: 'तोंडी लावणी किंवा स्टार्टर' },
    idealFor: { en: 'Engagement Ceremonies, Festive Lunch', mr: 'साखरपुडा, सणाचे जेवण' },
    ingredients: {
      en: ['Colocasia Leaves (Alu Pane)', 'Gram Flour', 'Tamarind Pulp', 'Jaggery', 'Sesame Seeds', 'Garam Masala'],
      mr: ['अळूची पाने', 'बेसन', 'चिंचेचा कोळ', 'गूळ', 'तीळ', 'गरम मसाला'],
    },
  },
  {
    id: 'item-hara-bhara-kabab',
    slug: 'hara-bhara-kabab',
    categoryId: 'starters',
    categorySlug: 'starters',
    name: {
      en: 'Crispy Hara Bhara Kabab',
      mr: 'व्हेज हरा भरा कबाब',
    },
    shortDescription: {
      en: 'Pan-seared spinach, green peas, and paneer patties studded with cashew nuts and fragrant spices.',
      mr: 'पालक, हिरवे मटार आणि पनीरचे चविष्ट कबाब, वर काजूचे काप लावून खमंग भाजलेले.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Green Hara Bhara Kabab with cashews', mr: 'हरा भरा कबाब' },
    },
    servingStyle: { en: 'Cocktail Buffet & Live Griddle Service', mr: 'कॉकटेल बुफे किंवा थेट तव्यावरून' },
    idealFor: { en: 'Reception Dinner, Corporate Cocktails, Sangeet Nights', mr: 'रिसेप्शन डिनर, संगीत संध्या, कॉर्पोरेट इव्हेंट' },
    ingredients: {
      en: ['Spinach', 'Green Peas', 'Paneer', 'Potatoes', 'Cashews', 'Chaat Masala'],
      mr: ['पालक', 'हिरवे मटार', 'पनीर', 'बटाटा', 'काजू', 'चाट मसाला'],
    },
  },

  // ── MAHARASHTRIAN SPECIAL FEASTS ───────────────────────────
  {
    id: 'item-puran-poli',
    slug: 'puran-poli',
    categoryId: 'maharashtrian',
    categorySlug: 'maharashtrian',
    name: {
      en: 'Festive Puran Poli Feast',
      mr: 'खास सणाची पुरणपोळी (साजूक तुपासह)',
    },
    shortDescription: {
      en: 'Handmade melt-in-mouth sweet flatbread stuffed with chana dal, jaggery, nutmeg, and cardamom, served with pure homemade ghee.',
      mr: 'चना डाळ, गूळ, जायफळ व वेलचीचे सुवासिक पुरण भरून नाजूक हातांनी लाटलेली मऊ पुरणपोळी आणि सोबत साजूक तूप.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Golden Puran Poli served with pure ghee', mr: 'साजूक तुपातील पुरणपोळी' },
    },
    servingStyle: { en: 'Seated Feast / Unlimited Dining Counter with Warm Milk / Katachi Amti', mr: 'पंगत जेवण, कोमट दूध किंवा कटाच्या आमटीसह' },
    idealFor: { en: 'Wedding Lunch, Thread Ceremony (Munj), Gauri-Ganpati, Diwali', mr: 'लग्न जेवण, मुंज, गौरी-गणपती, दिवाळी' },
    ingredients: {
      en: ['Chana Dal', 'Pure Jaggery (Gul)', 'Nutmeg (Jaiphal)', 'Cardamom (Elaichi)', 'Wheat Flour', 'Pure Ghee'],
      mr: ['चना डाळ', 'सेंद्रिय गूळ', 'जायफळ', 'वेलची पूड', 'गव्हाची कणीक', 'साजूक तूप'],
    },
  },
  {
    id: 'item-katachi-amti',
    slug: 'katachi-amti',
    categoryId: 'maharashtrian',
    categorySlug: 'maharashtrian',
    name: {
      en: 'Authentic Katachi Amti',
      mr: 'झणझणीत कटाची आमटी',
    },
    shortDescription: {
      en: 'Traditional tangy and fiery thin dal made from chana dal stock, flavored with special goda masala, coconut, and curry leaves.',
      mr: 'पुरणाच्या डाळीचे पाणी काढून, कांदा-खोबऱ्याचे वाटण आणि खास गोडा मसाला घालून केलेली झणझणीत व पाचक आमटी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Steaming bowl of Katachi Amti with coriander', mr: 'कटाची आमटी' },
    },
    servingStyle: { en: 'Hot Gravy Course paired with Puran Poli and Steamed Rice', mr: 'पुरणपोळी आणि साध्या भातासोबत गरम वाढप' },
    idealFor: { en: 'Festive Maharashtrian Feasts', mr: 'सणाचे महाराष्ट्रीयन भोजन' },
    ingredients: {
      en: ['Chana Dal Stock (Kat)', 'Goda Masala', 'Dry Coconut Paste', 'Ginger Garlic', 'Curry Leaves', 'Tamarind', 'Jaggery'],
      mr: ['कटाचे पाणी', 'गोडा मसाला', 'सुक्या खोबऱ्याचे वाटण', 'आले लसूण', 'कढीपत्ता', 'चिंच-गूळ'],
    },
  },
  {
    id: 'item-bharli-vangi',
    slug: 'bharli-vangi',
    categoryId: 'maharashtrian',
    categorySlug: 'maharashtrian',
    name: {
      en: 'Traditional Bharli Vangi',
      mr: 'गावरान भरली वांगी',
    },
    shortDescription: {
      en: 'Tender baby brinjals stuffed with crushed peanuts, roasted coconut, sesame, and traditional Maharashtrian spices simmered to perfection.',
      mr: 'कोवळ्या वांग्यांमध्ये दाण्याचा कूट, भाजलेले खोबरे, तीळ आणि काळा मसाला भरून केलेली चवदार रस्सा भाजी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Spiced stuffed brinjals Bharli Vangi', mr: 'भरली वांगी' },
    },
    servingStyle: { en: 'Buffet or Pangat Dining with Jowar Bhakri or Poli', mr: 'ज्वारीच्या भाकरी किंवा पोळीसोबत' },
    idealFor: { en: 'Wedding Dinners, Village-Theme Feasts, Haldi Meals', mr: 'लग्न जेवण, गावरान मेजवानी, हळद' },
    ingredients: {
      en: ['Baby Eggplants (Vangi)', 'Roasted Peanuts', 'Grated Coconut', 'Kala Masala', 'Jaggery', 'Coriander'],
      mr: ['कोवळी वांगी', 'भाजलेले शेंगदाणे', 'खवलेले खोबरे', 'काळा मसाला', 'गूळ', 'कोथिंबीर'],
    },
  },
  {
    id: 'item-batata-sukhi-bhaji',
    slug: 'batata-sukhi-bhaji',
    categoryId: 'maharashtrian',
    categorySlug: 'maharashtrian',
    name: {
      en: 'Yellow Wedding Batata Bhaji',
      mr: 'हळदीची पिवळी बटाटा भाजी',
    },
    shortDescription: {
      en: 'Classic boiled potato cubes tempered with mustard, green chillies, turmeric, curry leaves, and fresh green coriander.',
      mr: 'मोहरी, कढीपत्ता, हिरवी मिरची आणि हळदीच्या खमंग फोडणीत केलेली लग्नकार्यातील पारंपरिक पिवळी बटाटा भाजी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Warm yellow potato curry Batata Bhaji', mr: 'पिवळी बटाटा भाजी' },
    },
    servingStyle: { en: 'Essential Component with Hot Puri / Chapati', mr: 'गरम पुरी किंवा पोळीसोबत हमखास पर्याय' },
    idealFor: { en: 'Weddings, Engagements, All Occasion Menus', mr: 'सर्व प्रकारच्या लग्न व मंगलकार्यांसाठी' },
    ingredients: {
      en: ['Boiled Potatoes', 'Mustard Seeds', 'Green Chillies', 'Turmeric', 'Curry Leaves', 'Coriander', 'Lemon'],
      mr: ['उकडलेले बटाटे', 'मोहरी', 'हिरवी मिरची', 'हळद', 'कढीपत्ता', 'कोथिंबीर', 'लिंबू'],
    },
  },

  // ── NORTH INDIAN & PUNJABI ────────────────────────────────
  {
    id: 'item-paneer-butter-masala',
    slug: 'paneer-butter-masala',
    categoryId: 'punjabi',
    categorySlug: 'punjabi',
    name: {
      en: 'Shahi Paneer Butter Masala',
      mr: 'शाही पनीर बटर मसाला',
    },
    shortDescription: {
      en: 'Soft fresh cottage cheese cubes cooked in a rich, buttery tomato and cashew nut gravy with aromatic kasuri methi.',
      mr: 'मऊ लुसलुशीत पनीर, काजू आणि टोमॅटोच्या मखमली बटर ग्रेव्हीत कसुरी मेथी घालून तयार केलेली शाही भाजी.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Creamy Paneer Butter Masala dish', mr: 'पनीर बटर मसाला' },
    },
    servingStyle: { en: 'Buffet Main Course with Butter Naan or Jeera Rice', mr: 'बटर नान किंवा जीरा राइससोबत बुफे डिश' },
    idealFor: { en: 'Wedding Receptions, Birthday Dinners, Corporate Galas', mr: 'लग्न रिसेप्शन, वाढदिवस, कॉर्पोरेट डिनर' },
    ingredients: {
      en: ['Fresh Malai Paneer', 'Cashew Paste', 'Ripe Tomatoes', 'Fresh Butter & Cream', 'Kasuri Methi', 'Shahi Garam Masala'],
      mr: ['ताजे मलाई पनीर', 'काजू पेस्ट', 'टोमॅटो', 'बटर व साय', 'कसुरी मेथी', 'शाही गरम मसाला'],
    },
  },
  {
    id: 'item-veg-kolhapuri',
    slug: 'veg-kolhapuri',
    categoryId: 'punjabi',
    categorySlug: 'punjabi',
    name: {
      en: 'Zanzanit Veg Kolhapuri',
      mr: 'चमचमीत व्हेज कोल्हापुरी',
    },
    shortDescription: {
      en: 'Mixed garden vegetables cooked in a fiery roasted red chilli and desiccated coconut gravy with authentic spice oils.',
      mr: 'गाजर, फरसबी, वाटाणा, फ्लॉवर आणि पनीरचे तुकडे कोल्हापुरी लवंगी मिरची व खवलेल्या खोबऱ्याच्या तिखट रश्श्यात.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 3,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Fiery Veg Kolhapuri curry with red chillies', mr: 'व्हेज कोल्हापुरी' },
    },
    servingStyle: { en: 'Hot Main Course with Tandoori Roti / Chapati', mr: 'तंदूर रोटी किंवा पोळीसोबत' },
    idealFor: { en: 'Reception Meals, Evening Celebrations', mr: 'संध्याकाळचे जेवण, रिसेप्शन' },
    ingredients: {
      en: ['Assorted Seasonal Vegetables', 'Kolhapuri Red Chillies', 'Dry Coconut', 'Paneer', 'Ginger Garlic', 'Spices'],
      mr: ['मिश्र ताज्या भाज्या', 'कोल्हापुरी लाल मिरची', 'सुके खोबरे', 'पनीर', 'आले लसूण', 'गरम मसाले'],
    },
  },
  {
    id: 'item-dal-makhani',
    slug: 'dal-makhani',
    categoryId: 'punjabi',
    categorySlug: 'punjabi',
    name: {
      en: 'Slow-Cooked Dal Makhani',
      mr: 'अस्सल दाल मखनी',
    },
    shortDescription: {
      en: 'Black lentils and kidney beans slow-simmered overnight with butter, fresh cream, and smoked spices.',
      mr: 'काळे उडीद आणि राजमा मंद आचेवर बटर व सायीसोबत शिजवून दिलेली मखमली दाल मखनी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 1,
    isPopular: false,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Bowl of Dal Makhani with swirl of cream', mr: 'दाल मखनी' },
    },
    servingStyle: { en: 'Hot Dal Station paired with Jeera Rice and Naan', mr: 'जीरा राइस आणि नानसोबत' },
    idealFor: { en: 'Corporate Banquets, Sangeet Dinners', mr: 'कॉर्पोरेट डिनर, संगीत पार्टी' },
    ingredients: {
      en: ['Whole Black Urad', 'Rajma (Kidney Beans)', 'White Butter', 'Fresh Cream', 'Tomato Puree', 'Kashmiri Chilli'],
      mr: ['काळे उडीद', 'राजमा', 'पांढरे लोणी', 'ताजी साय', 'टोमॅटो प्युरी', 'काश्मिरी मिरची'],
    },
  },

  // ── ROTIS & BREADS ─────────────────────────────────────────
  {
    id: 'item-ghadichi-poli',
    slug: 'ghadichi-poli',
    categoryId: 'rotis',
    categorySlug: 'rotis',
    name: {
      en: 'Traditional Ghadichi Poli (Chapati)',
      mr: 'मऊ लुसलुशीत घडीची पोळी',
    },
    shortDescription: {
      en: 'Three-layered soft whole wheat flatbread rolled with a touch of oil and roasted fresh on high flame tawa.',
      mr: 'गव्हाच्या उत्कृष्ट पिठाची, तेलाची घडी पाडून तव्यावर खमंग भाजलेली मऊ लुसलुशीत पारंपारिक पोळी.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: true },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Stack of soft whole wheat chapatis', mr: 'घडीची पोळी' },
    },
    servingStyle: { en: 'Fresh Hot Basket Serving during Pangat & Buffet', mr: 'गरमागरम टोपलीतून थेट पंगत व बुफेसाठी' },
    idealFor: { en: 'Weddings, Engagements, All Occasion Feasts', mr: 'लग्न, साखरपुडा, सर्व समारंभ' },
    ingredients: {
      en: ['Finest Whole Wheat Flour', 'Water', 'Refined Sunflower Oil', 'Pinch of Salt'],
      mr: ['उत्कृष्ट गव्हाचे पीठ', 'पाणी', 'सूर्यफूल तेल', 'किंचित मीठ'],
    },
  },
  {
    id: 'item-puri',
    slug: 'crisp-puri',
    categoryId: 'rotis',
    categorySlug: 'rotis',
    name: {
      en: 'Piping Hot Crisp Puris',
      mr: 'गरमागरम फुगलेल्या पुऱ्या',
    },
    shortDescription: {
      en: 'Golden, round puffed unleavened wheat breads fried fresh on the spot to crispy perfection.',
      mr: 'कार्यक्रमाच्या ठिकाणी थेट कढईतून तळून वाढल्या जाणाऱ्या टम्म फुगलेल्या सोनेरी पुऱ्या.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: true },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Basket of hot golden puffed puris', mr: 'फुगलेल्या पुऱ्या' },
    },
    servingStyle: { en: 'Live Frying Station / Hot Counter', mr: 'थेट कढईतून गरमागरम वाढप' },
    idealFor: { en: 'Wedding Lunch, Poojas, Birthday Celebrations', mr: 'लग्न भोजन, पूजा, वाढदिवस' },
    ingredients: {
      en: ['Whole Wheat Flour', 'Semolina (for crunch)', 'Pure Groundnut Oil', 'Salt'],
      mr: ['गव्हाचे पीठ', 'रवा (कुरकुरीतपणासाठी)', 'शेंगदाणा तेल', 'मीठ'],
    },
  },
  {
    id: 'item-jowar-bhakri',
    slug: 'jowar-bhakri',
    categoryId: 'rotis',
    categorySlug: 'rotis',
    name: {
      en: 'Traditional Jowar Bhakri',
      mr: 'गावरान ज्वारीची भाकरी',
    },
    shortDescription: {
      en: 'Hand-patted gluten-free sorghum flatbread baked on iron tawa and puffed over live flame.',
      mr: 'हाताने थापून लोखंडी तव्यावर भाजलेली आणि निखाऱ्यावर शेकलेली अस्सल खमंग ज्वारीची भाकरी.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: true },
    spiceLevel: 0,
    isPopular: false,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Traditional Jowar Bhakri on plate', mr: 'ज्वारीची भाकरी' },
    },
    servingStyle: { en: 'Fresh Hot with Pitla or Bharli Vangi', mr: 'पिठलं किंवा भरल्या वांग्यासोबत गरमागरम' },
    idealFor: { en: 'Village-Style Celebrations, Special Rustic Feasts', mr: 'गावरान मेजवानी, विशेष पारंपरिक कार्यक्रम' },
    ingredients: {
      en: ['Pure Sorghum Flour (Jowar)', 'Lukewarm Water', 'Salt'],
      mr: ['शुद्ध ज्वारीचे पीठ', 'कोमट पाणी', 'मीठ'],
    },
  },

  // ── RICE & PULAO ───────────────────────────────────────────
  {
    id: 'item-masale-bhaat',
    slug: 'masale-bhaat',
    categoryId: 'rice',
    categorySlug: 'rice',
    name: {
      en: 'Traditional Wedding Masale Bhaat',
      mr: 'लग्नकार्यातील मसाले भात (तुपातील)',
    },
    shortDescription: {
      en: 'Aromatic Indrayani or Basmati rice cooked with tendli (ivy gourd), green peas, goda masala, cashews, and fresh grated coconut in pure ghee.',
      mr: 'इंद्रायणी/बासमती तांदूळ, तोंडली, मटार, गोडा मसाला, काजू आणि ओले खोबरे घालून साजूक तुपात केलेला लग्नकार्याचा मानाचा मसाले भात.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Spiced aromatic Masale Bhaat with cashews', mr: 'मसाले भात' },
    },
    servingStyle: { en: 'Main Rice Course served with dollop of Pure Ghee', mr: 'साजूक तुपाच्या धारेसह प्रमुख भात कोर्स' },
    idealFor: { en: 'Weddings, Engagements, Thread Ceremonies, Housewarmings', mr: 'लग्न, साखरपुडा, मुंज, गृहप्रवेश' },
    ingredients: {
      en: ['Indrayani/Basmati Rice', 'Tendli (Ivy Gourd)', 'Green Peas', 'Authentic Goda Masala', 'Whole Cashews', 'Pure Ghee', 'Fresh Coconut'],
      mr: ['इंद्रायणी/बासमती तांदूळ', 'तोंडली', 'हिरवे मटार', 'पारंपारिक गोडा मसाला', 'काजू', 'साजूक तूप', 'ओले खोबरे'],
    },
  },
  {
    id: 'item-veg-dum-biryani',
    slug: 'veg-dum-biryani',
    categoryId: 'rice',
    categorySlug: 'rice',
    name: {
      en: 'Shahi Veg Dum Biryani',
      mr: 'शाही व्हेज दम बिर्याणी',
    },
    shortDescription: {
      en: 'Long-grain aged Basmati rice layered with marinated vegetables, saffron milk, fried brown onions, and fresh mint sealed on dum.',
      mr: 'उत्कृष्ट बासमती तांदूळ, भाज्यांचे मॅरिनेशन, केशर, तळलेला कांदा व पुदिना घालून दम देऊन शिजवलेली सुवासिक बिर्याणी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 2,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Steaming clay pot of Veg Dum Biryani', mr: 'व्हेज दम बिर्याणी' },
    },
    servingStyle: { en: 'Buffet Hot Pot with Boondi Raita and Mirchi Salan', mr: 'बुफे काउंटरवर रायत्यासह' },
    idealFor: { en: 'Receptions, Corporate Lunches, Evening Sangeet', mr: 'रिसेप्शन, ऑफिस जेवण, संगीत संध्या' },
    ingredients: {
      en: ['Aged Basmati Rice', 'Paneer & Veggies', 'Saffron (Kesar)', 'Biryani Spices', 'Fried Onions (Birista)', 'Mint'],
      mr: ['जुनट बासमती तांदूळ', 'पनीर व ताज्या भाज्या', 'केशर', 'बिर्याणी मसाला', 'तळलेला कांदा', 'पुदिना'],
    },
  },
  {
    id: 'item-jeera-rice-dal-tadka',
    slug: 'jeera-rice',
    categoryId: 'rice',
    categorySlug: 'rice',
    name: {
      en: 'Fragrant Jeera Rice',
      mr: 'सुवासिक जीरा राइस',
    },
    shortDescription: {
      en: 'Steamed fluffy Basmati rice gently tempered with crackled cumin seeds, bay leaf, and clarified butter.',
      mr: 'साजूक तुपात जिरे आणि तमालपत्राची फोडणी दिलेला मऊ, मोकळा व सुवासिक बासमती भात.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: false,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Jeera Rice with coriander garnish', mr: 'जीरा राइस' },
    },
    servingStyle: { en: 'Buffet Rice Course with Dal Tadka or Paneer Gravy', mr: 'दाल तडका किंवा पनीर भाजीसोबत' },
    idealFor: { en: 'Dinner Buffets, Corporate Conferences', mr: 'डिनर बुफे, कॉर्पोरेट इव्हेंट' },
    ingredients: {
      en: ['Basmati Rice', 'Cumin Seeds (Jeera)', 'Ghee', 'Bay Leaf', 'Coriander'],
      mr: ['बासमती तांदूळ', 'जिरे', 'तूप', 'तमालपत्र', 'कोथिंबीर'],
    },
  },

  // ── SWEETS & DESSERTS ──────────────────────────────────────
  {
    id: 'item-ukadiche-modak',
    slug: 'ukadiche-modak',
    categoryId: 'desserts',
    categorySlug: 'desserts',
    name: {
      en: 'Signature Steamed Ukadiche Modak',
      mr: 'अदिती स्पेशल उकडीचे मोदक (तुपासह)',
    },
    shortDescription: {
      en: 'Delicate handmade steamed rice flour dumplings filled with grated fresh coconut, organic jaggery, cardamom, and pure ghee.',
      mr: 'तांदळाच्या मऊ उकडीत खवलेले ताजे नारळ, सेंद्रिय गूळ, वेलची व जायफळाचे सारण भरून वाफवलेले पारंपारिक मोदक.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Authentic handmade Ukadiche Modak with ghee drizzle', mr: 'उकडीचे मोदक' },
    },
    servingStyle: { en: 'Steaming Hot Individual Serving with generous pure ghee drizzle', mr: 'गरमागरम मोदकावर साजूक तुपाची धार' },
    idealFor: { en: 'Ganesh Chaturthi, Weddings, Muhurat Lunch, Satyanarayan Pooja', mr: 'गणेशोत्सव, लग्न भोजन, मुहूर्त जेवण, सत्यनारायण' },
    ingredients: {
      en: ['Fine Rice Flour (Ambemohar)', 'Fresh Grated Coconut', 'Organic Jaggery', 'Cardamom & Nutmeg', 'Pure Ghee', 'Saffron'],
      mr: ['आंबेमोहोर तांदळाची उकड', 'खवलेला ताजा नारळ', 'सेंद्रिय गूळ', 'वेलची व जायफळ', 'साजूक तूप', 'केशर'],
    },
  },
  {
    id: 'item-kesar-basundi',
    slug: 'kesar-basundi',
    categoryId: 'desserts',
    categorySlug: 'desserts',
    name: {
      en: 'Royal Kesar Pista Basundi',
      mr: 'शाही केशर पिस्ता बासुंदी',
    },
    shortDescription: {
      en: 'Thick, creamy slow-reduced whole milk dessert infused with aromatic saffron threads, green cardamom, slivered almonds, and pistachios.',
      mr: 'मंद आचेवर दूध आटवून, त्यात केशर, वेलची आणि बदाम-पिस्त्याचे काप घालून तयार केलेली घट्ट, दाणेदार बासुंदी.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Rich Basundi with saffron strands and nuts', mr: 'केशर पिस्ता बासुंदी' },
    },
    servingStyle: { en: 'Chilled or Warm Dessert Bowl paired with hot puris', mr: 'थंडगार किंवा कोमट, गरमागरम पुऱ्यांसोबत उत्तम' },
    idealFor: { en: 'Weddings, Engagements, Birthday Celebrations', mr: 'लग्न, साखरपुडा, वाढदिवस मेजवानी' },
    ingredients: {
      en: ['Whole Buffalo Milk', 'Kashmiri Saffron', 'Pistachios & Almonds', 'Green Cardamom', 'Sugar'],
      mr: ['म्हैशीचे घट्ट दूध', 'काश्मिरी केशर', 'पिस्ता व बदाम काप', 'हिरवी वेलची', 'साखर'],
    },
  },
  {
    id: 'item-gulab-jamun',
    slug: 'gulab-jamun',
    categoryId: 'desserts',
    categorySlug: 'desserts',
    name: {
      en: 'Shahi Khoya Gulab Jamun',
      mr: 'शाही खवा गुलाबजाम',
    },
    shortDescription: {
      en: 'Melt-in-mouth golden dumplings made from pure milk khoya and fried in pure ghee, soaked in rose and cardamom syrup.',
      mr: 'शुद्ध खव्याचे मऊ, रसदार गोळे साजूक तुपात तळून, गुलाबपाणी व वेलचीच्या साखरेच्या पाकात मुरवलेले.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Warm glossy Gulab Jamun in syrup', mr: 'गुलाबजाम' },
    },
    servingStyle: { en: 'Warm Buffet Dessert Station', mr: 'गरमागरम बुफे सर्व्हिंग' },
    idealFor: { en: 'All Weddings, Parties, Receptions', mr: 'सर्व प्रकारचे लग्न व घरगुती समारंभ' },
    ingredients: {
      en: ['Pure Mawa (Khoya)', 'Refined Flour', 'Pure Ghee', 'Cardamom', 'Rose Water', 'Sugar Syrup'],
      mr: ['शुद्ध खवा (मावा)', 'मैदा', 'साजूक तूप', 'वेलची', 'गुलाब पाणी', 'साखरेचा पाक'],
    },
  },
  {
    id: 'item-amrakhand',
    slug: 'amrakhand-shrikhand',
    categoryId: 'desserts',
    categorySlug: 'desserts',
    name: {
      en: 'Alphonso Mango Amrakhand',
      mr: 'अस्सल हापूस आम्रखंड / श्रीखंड',
    },
    shortDescription: {
      en: 'Silky smooth hung curd blended with authentic Ratnagiri Alphonso mango pulp, saffron, and crushed dry fruits.',
      mr: 'चक्क्यामध्ये अस्सल रत्नागिरी हापूस आंब्याचा रस, केशर आणि ड्रायफ्रुट्स मिसळून तयार केलेले मऊ आम्रखंड.',
    },
    dietary: { isVeg: true, isJain: true, isVegan: false },
    spiceLevel: 0,
    isPopular: true,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Creamy Mango Shrikhand dessert bowl', mr: 'आम्रखंड' },
    },
    servingStyle: { en: 'Chilled Sweet Accompaniment with Hot Puris', mr: 'थंडगार आम्रखंड, गरमागरम पुऱ्यांसोबत' },
    idealFor: { en: 'Summer Weddings, Baby Showers (Dohale Jevan)', mr: 'उन्हाळी लग्न सोहळे, डोहाळे जेवण' },
    ingredients: {
      en: ['Hung Curd (Chakka)', 'Alphonso Mango Pulp', 'Sugar', 'Cardamom', 'Nutmeg', 'Pistachios'],
      mr: ['चक्का', 'हापूस आंबा रस', 'साखर', 'वेलची व जायफळ', 'पिस्ता'],
    },
  },

  // ── BEVERAGES & ACCOMPANIMENTS ─────────────────────────────
  {
    id: 'item-solkadhi',
    slug: 'solkadhi',
    categoryId: 'beverages',
    categorySlug: 'beverages',
    name: {
      en: 'Coastal Maharashtrian Solkadhi',
      mr: 'अस्सल कोकणी पाचक सोलकढी',
    },
    shortDescription: {
      en: 'Refreshing digestive drink prepared from fresh thick coconut milk infused with tangy kokum agal, mild green chilli, and garlic.',
      mr: 'ताज्या नारळाच्या दुधात आमसुलाचा (कोकम) अर्क, लसूण, हिरवी मिरची आणि कोथिंबीर घालून केलेली पाचक सोलकढी.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: true },
    spiceLevel: 1,
    isPopular: true,
    isChefSpecial: true,
    image: {
      url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Pink Solkadhi glass with mint garnish', mr: 'कोकणी सोलकढी' },
    },
    servingStyle: { en: 'Chilled Welcome Drink or Post-Meal Digestive Sip', mr: 'थंडगार स्वागत पेय किंवा जेवणानंतर' },
    idealFor: { en: 'Weddings, Receptions, Festive Lunches', mr: 'लग्न समारंभ, रिसेप्शन, सणाचे जेवण' },
    ingredients: {
      en: ['Fresh Coconut Milk', 'Kokum Agal', 'Garlic', 'Green Chilli', 'Rock Salt', 'Coriander'],
      mr: ['नारळाचे घट्ट दूध', 'कोकम आगळ', 'लसूण', 'हिरवी मिरची', 'सेंधव मीठ', 'कोथिंबीर'],
    },
  },
  {
    id: 'item-masala-taas',
    slug: 'masala-taas',
    categoryId: 'beverages',
    categorySlug: 'beverages',
    name: {
      en: 'Refreshing Masala Taas (Chhaas)',
      mr: 'खमंग मसाला ताक',
    },
    shortDescription: {
      en: 'Traditional churned spiced buttermilk with roasted cumin, black salt, crushed ginger, and mint.',
      mr: 'घट्ट दह्याचे ताक, भाजलेले जिरे, काळे मीठ, आले आणि पुदिन्याची फोडणी देऊन केलेले थंडगार ताक.',
    },
    dietary: { isVeg: true, isJain: false, isVegan: false },
    spiceLevel: 1,
    isPopular: false,
    isChefSpecial: false,
    image: {
      url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      alt: { en: 'Glass of spiced Indian buttermilk', mr: 'मसाला ताक' },
    },
    servingStyle: { en: 'Chilled Earthen Pot (Matka) Counter', mr: 'मातीच्या माठातून थंडगार सर्व्हिंग' },
    idealFor: { en: 'Summer Day Events, Outdoor Functions', mr: 'उन्हाळी दुपारचे कार्यक्रम, बाहेरील सोहळे' },
    ingredients: {
      en: ['Fresh Curd', 'Roasted Cumin (Bhuna Jeera)', 'Black Salt', 'Ginger', 'Mint', 'Coriander'],
      mr: ['ताजे दही', 'भाजलेले जिरे', 'काळे मीठ', 'आले', 'पुदिना', 'कोथिंबीर'],
    },
  },
];

export const defaultMenuFaqs = [
  {
    id: 'faq-menu-1',
    question: {
      en: 'Can we customize the dishes in our catering menu?',
      mr: 'आम्ही आमच्या केटरिंग मेनूमध्ये आवडीचे पदार्थ बदलू शकतो का?',
    },
    answer: {
      en: 'Yes, absolutely! Every event has unique family preferences. You can shortlist your favorite dishes using our interactive menu and our chef will assist in finalizing a balanced, delicious combination.',
      mr: 'होय, नक्कीच! प्रत्येक समारंभासाठी पाहुण्यांच्या आवडीनुसार मेनू पूर्णपणे सानुकूलित (Customize) करता येतो. तुम्ही मेनूमधून पदार्थ निवडून आमच्याशी चर्चा करू शकता.',
    },
  },
  {
    id: 'faq-menu-2',
    question: {
      en: 'Do you provide authentic Jain and fasting (Upvas) food options?',
      mr: 'तुमच्याकडे जैन आणि उपवासाच्या पदार्थांची स्वतंत्र व्यवस्था असते का?',
    },
    answer: {
      en: 'Yes. We prepare 100% pure Jain catering (without onion, garlic, or root vegetables) as well as dedicated Upvas menus (Sabudana Khichdi, Vada, Bhagar, Rajgira dishes) in separate cookware maintaining total sanctity.',
      mr: 'होय. कांदा-लसूण विरहित अस्सल जैन जेवण तसेच एकादशी व उपवासासाठी स्वतंत्र भांड्यांमध्ये साबुदाणा, वडे, भगर व फराळाची शुद्ध व्यवस्था केली जाते.',
    },
  },
  {
    id: 'faq-menu-3',
    question: {
      en: 'Are live counters like Modak, Puri, or Jalebi available?',
      mr: 'गरमागरम पुऱ्या, उकडीचे मोदक किंवा जिलेबीचे लाइव्ह काउंटर उपलब्ध आहेत का?',
    },
    answer: {
      en: 'Yes! We specialize in hot live food stations where crisp puris, fresh steamed Ukadiche Modak, piping hot jalebis, and dosas are prepared directly in front of guests for an elevated dining experience.',
      mr: 'होय! कार्यक्रमाच्या ठिकाणी थेट कढईतून गरमागरम पुऱ्या, वाफाळलेले उकडीचे मोदक आणि खमंग जिलेबीचे लाइव्ह स्टॉल्स आम्ही आवर्जून उपलब्ध करून देतो.',
    },
  },
  {
    id: 'faq-menu-4',
    question: {
      en: 'How do you ensure food hygiene and ingredient quality?',
      mr: 'खाद्यपदार्थांचा दर्जा आणि स्वच्छता कशी राखली जाते?',
    },
    answer: {
      en: 'We use brand-certified groceries, pure milk and ghee, fresh farm vegetables procured on the event day, and filtered drinking water. Our experienced cooks follow strict kitchen hygiene protocols.',
      mr: 'आम्ही दर्जेदार किराणा, साजूक तूप, कार्यक्रमाच्या दिवशी पहाटे आणलेल्या ताज्या भाज्या आणि फिल्टर पाण्याचा वापर करतो. आमच्या आचारी पथकाकडून स्वच्छतेचे कडक नियम पाळले जातात.',
    },
  },
];

// ── API SERVICE METHODS ──────────────────────────────────────

export async function getAllCategories() {
  try {
    const res = await api.get('/public/menu/categories');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // fallback
  }
  return defaultCategories;
}

export async function getCategoryBySlug(slug) {
  if (!slug) return null;
  try {
    const res = await api.get(`/public/menu/categories/${slug}`);
    if (res?.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return defaultCategories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  ) || null;
}

export async function getMenuItems(categorySlug = null, filters = {}) {
  try {
    const params = new URLSearchParams();
    if (categorySlug && categorySlug !== 'all') params.append('category', categorySlug);
    if (filters.dietary && filters.dietary !== 'all') params.append('dietary', filters.dietary);
    if (filters.spiceLevel && filters.spiceLevel !== 'all') params.append('spice', filters.spiceLevel);
    if (filters.search) params.append('q', filters.search);

    const res = await api.get(`/public/menu/items?${params.toString()}`);
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // fallback
  }

  let items = [...defaultMenuItems];

  if (categorySlug && categorySlug !== 'all') {
    items = items.filter(
      (item) => item.categorySlug.toLowerCase() === categorySlug.toLowerCase() || item.categoryId === categorySlug
    );
  }

  if (filters.dietary === 'veg') {
    items = items.filter((item) => item.dietary.isVeg);
  } else if (filters.dietary === 'jain') {
    items = items.filter((item) => item.dietary.isJain);
  } else if (filters.dietary === 'vegan') {
    items = items.filter((item) => item.dietary.isVegan);
  }

  if (filters.spiceLevel !== undefined && filters.spiceLevel !== 'all') {
    const lvl = parseInt(filters.spiceLevel, 10);
    if (!isNaN(lvl)) {
      items = items.filter((item) => item.spiceLevel === lvl);
    }
  }

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    items = items.filter((item) => {
      const enName = item.name.en.toLowerCase();
      const mrName = item.name.mr.toLowerCase();
      const enDesc = (item.shortDescription.en || '').toLowerCase();
      const mrDesc = (item.shortDescription.mr || '').toLowerCase();
      return enName.includes(q) || mrName.includes(q) || enDesc.includes(q) || mrDesc.includes(q);
    });
  }

  return items;
}

export async function getMenuItemById(idOrSlug) {
  if (!idOrSlug) return null;
  try {
    const res = await api.get(`/public/menu/items/${idOrSlug}`);
    if (res?.data?.data) return res.data.data;
  } catch {
    // fallback
  }
  return defaultMenuItems.find(
    (item) => item.slug.toLowerCase() === idOrSlug.toLowerCase() || item.id.toLowerCase() === idOrSlug.toLowerCase()
  ) || null;
}

export async function getFeaturedDishes() {
  try {
    const res = await api.get('/public/menu/featured');
    if (res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data;
    }
  } catch {
    // fallback
  }
  return defaultMenuItems.filter((item) => item.isPopular || item.isChefSpecial);
}

export async function searchMenuItems(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return defaultMenuItems.filter((item) => {
    const enName = item.name.en.toLowerCase();
    const mrName = item.name.mr.toLowerCase();
    const enDesc = (item.shortDescription.en || '').toLowerCase();
    const mrDesc = (item.shortDescription.mr || '').toLowerCase();
    const ingredientsEn = (item.ingredients?.en || []).join(' ').toLowerCase();
    const ingredientsMr = (item.ingredients?.mr || []).join(' ').toLowerCase();
    return (
      enName.includes(q) ||
      mrName.includes(q) ||
      enDesc.includes(q) ||
      mrDesc.includes(q) ||
      ingredientsEn.includes(q) ||
      ingredientsMr.includes(q)
    );
  });
}

export async function getMenuFaqs() {
  try {
    const res = await api.get('/public/menu/faqs');
    if (res?.data?.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
  } catch {
    // fallback
  }
  return defaultMenuFaqs;
}

export default {
  defaultCategories,
  defaultMenuItems,
  defaultMenuFaqs,
  getAllCategories,
  getCategoryBySlug,
  getMenuItems,
  getMenuItemById,
  getFeaturedDishes,
  searchMenuItems,
  getMenuFaqs,
};
