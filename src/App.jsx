import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Award,
  Settings,
  Wrench,
  HeartHandshake,
  Users,
  ChevronRight,
  TrendingUp,
  Sliders,
  LifeBuoy,
  FileDown,
  Trash2,
  PlusCircle,
  Eye,
  LogOut,
  FolderOpen,
  Upload,
  CloudLightning,
  Database
} from 'lucide-react';
import { CONFIG as DEFAULT_CONFIG } from './config';

// Import Firebase connection
import { db, isFirebaseEnabled } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

// Import Assets
import heroBg from './assets/hero_bg.png';
import productSwitchgear from './assets/product_switchgear.png';
import productPanel from './assets/product_panel.png';
import productTransformer from './assets/product_transformer.png';
import productMeter from './assets/product_meter.png';
import logoIcon from './assets/logo_icon.png';
import logoName from './assets/logo_name.png';

const productImages = {
  "product_switchgear.png": productSwitchgear,
  "product_panel.png": productPanel,
  "product_transformer.png": productTransformer,
  "product_meter.png": productMeter
};

const serviceIcons = {
  "srv-mfg": Zap,
  "srv-ind": Settings,
  "srv-oem": Users,
  "srv-cust": Sliders,
  "srv-tech": Wrench,
  "srv-sales": LifeBuoy
};

const qualityIcons = [
  { icon: ShieldCheck, title: "Premium Materials", desc: "We source only grade-A raw copper, fire-retardant polymers, and top-tier industrial steel to ensure long-term physical integrity." },
  { icon: Award, title: "Strict Quality Control", desc: "Every control panel and switchboard undergoes insulation resistance, high voltage, and visual wire tracking audits before dispatch." },
  { icon: TrendingUp, title: "Industry Standards", desc: "Our products conform to major national and international safety regulations, including IS and IEC compliance frameworks." },
  { icon: HeartHandshake, title: "Reliable Manufacturing", desc: "Years of engineering expertise combined with precision machinery guarantees high efficiency and electrical safety." }
];

// Stylized brand SVG logotypes
const customerLogos = {
  "Tata Power": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <circle cx="15" cy="15" r="9" fill="#00A3E0" />
      <path d="M12 9l5 6-5 6" stroke="#fff" strokeWidth="2.5" fill="none" />
      <text x="32" y="19" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="10.5" letterSpacing="0.04em">TATA POWER</text>
    </svg>
  ),
  "Reliance Infra": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <rect x="5" y="5" width="20" height="20" rx="3" fill="#005EA6" />
      <circle cx="15" cy="15" r="5" fill="#fff" />
      <text x="32" y="19" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="10.5" letterSpacing="0.04em">RELIANCE</text>
    </svg>
  ),
  "L&T Construction": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <path d="M4 5h8v20H4V5zm10 0h8v6h-8V5zm0 14h8v6h-8v-6z" fill="#F2A900" />
      <text x="30" y="19" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.04em">L&T CONST</text>
    </svg>
  ),
  "Siemens India": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <text x="5" y="21" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="17" fill="#00797A" letterSpacing="-0.03em">SIEMENS</text>
    </svg>
  ),
  "ABB Limited": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <text x="5" y="21" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="21" fill="#E31B23" letterSpacing="-0.05em">ABB</text>
    </svg>
  ),
  "Havells India": (
    <svg className="slider-logo-svg" viewBox="0 0 130 30" width="130" height="30" fill="currentColor">
      <path d="M12 5l-7 2.5v5c0 4 3 6.5 7 7.5 4-1 7-3.5 7-7.5v-5L12 5z" fill="#E31B23" />
      <text x="28" y="19" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.04em">HAVELLS</text>
    </svg>
  )
};

// Seed mock queries
const MOCK_QUERIES = [
  {
    id: "mock-1",
    fullName: "Ramesh Chand",
    businessName: "Chand Electricals Ltd",
    email: "ramesh@chandelectricals.com",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    message: "Interested in taking the dealership for Current Transformers and smart energy meters in Western region.",
    status: "Pending",
    date: new Date(Date.now() - 3600000 * 4).toLocaleString()
  },
  {
    id: "mock-2",
    fullName: "Suneeta Roy",
    businessName: "Roy Substation Supplies",
    email: "suneeta@roysubstations.com",
    phone: "9123456789",
    city: "Kolkata",
    state: "West Bengal",
    message: "We need custom control panels for an upcoming EPC contract project. Please send compliance sheets.",
    status: "Reviewed",
    date: new Date(Date.now() - 3600000 * 24).toLocaleString()
  }
];

// Custom animated counter component
function StatCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = parseInt(target, 10);
          if (start === end) return;

          const totalSteps = 60;
          const stepTime = duration / totalSteps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / totalSteps;
            const easeProgress = progress * (2 - progress); // easeOutQuad
            const currentVal = Math.round(easeProgress * end);
            setCount(currentVal);

            if (step >= totalSteps) {
              setCount(end);
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [target, duration]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Premium vector emblem replica (A-shape, silver lightning bolt, and curved arch only)
function AshokaEmblem({ width = "35", height = "32", mode = "light" }) {
  const primaryColor = mode === "light" ? "#0046AD" : "#60A5FA";

  return (
    <svg viewBox="0 0 120 110" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: 'block' }}>
      <defs>
        <linearGradient id="silver-bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <filter id="emblem-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Outer A shape with drop shadow (rounded inner cutout built-in, upper triangle filled solid) */}
      <path
        d="M 60 5 L 103 85 L 85 85 L 75 66 Q 60 63 45 66 L 35 85 L 17 85 Z"
        fill={primaryColor}
        filter="url(#emblem-shadow)"
      />

      {/* Silver metallic lightning bolt with exact shape and drop shadow */}
      <path
        d="M 72 28 L 45 56 L 62 56 L 42 82 L 73 48 L 57 48 Z"
        fill="url(#silver-bolt-grad)"
        stroke="#9CA3AF"
        strokeWidth="0.5"
        filter="url(#emblem-shadow)"
      />

      {/* Bottom curved tapered crescent arch with drop shadow */}
      <path
        d="M 10 102 Q 60 88 110 102 Q 60 92 10 102 Z"
        fill={primaryColor}
        filter="url(#emblem-shadow)"
      />
    </svg>
  );
}

// Logo with company name displayed vertically beside the icon (Footer / Large display)
function AshokaLogoVertical({ width = "160px", height = "auto", mode = "light", bgClearColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width, height }}>
      <img
        src={logoIcon}
        alt="Ashoka Power Matrix Logo"
        style={{
          width: '50px',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          flexShrink: 0
        }}
      />
      <img
        src={logoName}
        alt="Ashoka Power Matrix Pvt. Ltd."
        style={{
          height: '60px',
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          filter: mode === 'dark' ? 'brightness(1.8) contrast(1.1)' : 'none'
        }}
      />
    </div>
  );
}

// Logo with company name displayed vertically beside the icon (Navbar / Compact)
function AshokaLogoHorizontal({ width = "55px", height = "55px", mode = "light", bgClearColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height }}>
      <img
        src={logoIcon}
        alt="Ashoka Power Matrix Logo"
        style={{
          height: '50px',
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          flexShrink: 0
        }}
      />
      <img
        src={logoName}
        alt="Ashoka Power Matrix Pvt. Ltd."
        style={{
          height: '60px',
          width: 'auto',
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
function App() {
  const [siteConfig, setSiteConfig] = useState(null);
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Admin Portal state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('queries');
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Editor states
  const [editedConfig, setEditedConfig] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', shortDesc: '', desc: '', image: 'product_switchgear.png' });
  const [newTeam, setNewTeam] = useState({ name: '', role: '', bio: '' });
  const [newTestimonial, setNewTestimonial] = useState({ client: '', company: '', text: '' });
  const [newCertification, setNewCertification] = useState({ title: '', authority: '', docNumber: '', desc: '' });

  // Product page feedback submission states
  const [feedbackData, setFeedbackData] = useState({ client: '', company: '', text: '' });
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  // Product enquiry modal state
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquiryData, setEnquiryData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isEnquirySubmitted, setIsEnquirySubmitted] = useState(false);

  // Dealer form state
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load config.json and initialize Firebase Firestore
  useEffect(() => {
    const getMergedConfig = (loadedData) => {
      if (!loadedData) return DEFAULT_CONFIG;
      return {
        ...DEFAULT_CONFIG,
        ...loadedData,
        certifications: loadedData.certifications && loadedData.certifications.length > 0
          ? loadedData.certifications
          : (DEFAULT_CONFIG.certifications || [])
      };
    };

    if (isFirebaseEnabled) {
      // 1. Fetch Config from Firestore
      const configDocRef = doc(db, 'configs', 'site');
      getDoc(configDocRef).then((snap) => {
        if (snap.exists()) {
          setSiteConfig(getMergedConfig(snap.data()));
        } else {
          // Fallback to loading local config first, then seeding Firestore
          fetch('/config.json')
            .then(r => r.json())
            .then((localData) => {
              const merged = getMergedConfig(localData);
              setDoc(configDocRef, merged).then(() => {
                setSiteConfig(merged);
              });
            })
            .catch(() => {
              setDoc(configDocRef, DEFAULT_CONFIG).then(() => {
                setSiteConfig(DEFAULT_CONFIG);
              });
            });
        }
      }).catch((e) => {
        console.error("Firestore config load error: ", e);
      });

      // 2. Real-time Subscription to Queries collection
      const queriesColRef = collection(db, 'queries');
      const unsub = onSnapshot(queriesColRef, (snapshot) => {
        const queriesList = [];
        snapshot.forEach((doc) => {
          queriesList.push({ id: doc.id, ...doc.data() });
        });
        queriesList.sort((a, b) => b.id - a.id || new Date(b.date) - new Date(a.date));
        setQueries(queriesList);
      });

      return () => unsub();

    } else {
      // Offline Local Fallback
      const storedConfig = localStorage.getItem('ashoka_site_config');
      if (storedConfig) {
        try {
          setSiteConfig(getMergedConfig(JSON.parse(storedConfig)));
        } catch (e) {
          console.error("Error loading config", e);
        }
      } else {
        // Load default public config.json file
        fetch('/config.json')
          .then((r) => r.json())
          .then((data) => {
            setSiteConfig(getMergedConfig(data));
          })
          .catch(() => {
            setSiteConfig(DEFAULT_CONFIG);
          });
      }

      const storedQueries = localStorage.getItem('ashoka_queries');
      if (storedQueries) {
        try {
          setQueries(JSON.parse(storedQueries));
        } catch (e) {
          console.error("Error loading queries", e);
        }
      } else {
        localStorage.setItem('ashoka_queries', JSON.stringify(MOCK_QUERIES));
        setQueries(MOCK_QUERIES);
      }
    }

    // Admin login session cache
    const adminSession = sessionStorage.getItem('admin_logged_in');
    if (adminSession === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Sync editedConfig whenever siteConfig state changes
  useEffect(() => {
    if (siteConfig) {
      setEditedConfig({ ...siteConfig });
    }
  }, [siteConfig]);

  // Monitor URL Hash changes for Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let page = 'home';

      // Handle same-page scrolling hooks
      if (hash.startsWith('#/#')) {
        const id = hash.slice(3);
        page = 'home';
        setCurrentPage(page);
        setIsMobileMenuOpen(false);

        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }

      if (hash.startsWith('#/')) {
        page = hash.slice(2);
      }
      if (!page) page = 'home';

      setCurrentPage(page);
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe product image resolver
  const getProductImageSrc = (imgName) => {
    if (!imgName) return productSwitchgear;
    if (imgName.startsWith('data:image')) {
      return imgName; // Dynamic Base64
    }
    return productImages[imgName] || productSwitchgear; // Fallback
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit enquiry to Gmail (Web3Forms) AND save to Firestore Database
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      fullName: formData.fullName,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      message: formData.message,
      status: 'Pending',
      date: new Date().toLocaleString()
    };

    // 1. Send Email to Gmail using Web3Forms
    const emailPayload = {
      access_key: siteConfig.web3formsKey || "6f67106b-8419-4a0e-8e9c-ff89589c0994",
      subject: `New Dealership Enquiry - ${formData.businessName}`,
      from_name: "Ashoka Power Matrix Portal",
      "Full Name": formData.fullName,
      "Business Name": formData.businessName,
      "Email Address": formData.email,
      "Phone Number": formData.phone,
      "Location": `${formData.city}, ${formData.state}`,
      "Message Detail": formData.message
    };

    try {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(emailPayload)
      }).catch((e) => console.error("Web3Forms submit error: ", e));
    } catch (e) {
      console.error(e);
    }

    // 2. Write Document to Firestore Database or Local Storage
    if (isFirebaseEnabled) {
      try {
        await addDoc(collection(db, 'queries'), {
          id: Date.now(), // sorting tag
          ...newEntry
        });
      } catch (err) {
        console.error("Firestore submit error: ", err);
      }
    } else {
      const updatedQueries = [{ id: Date.now(), ...newEntry }, ...queries];
      setQueries(updatedQueries);
      localStorage.setItem('ashoka_queries', JSON.stringify(updatedQueries));
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        message: ''
      });
    }, 5000);
  };

  // Product Page feedback submit (Saves globally to Firestore or local config)
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackData.client || !feedbackData.text) return;

    const newReview = {
      client: feedbackData.client,
      company: feedbackData.company || "Independent Buyer",
      text: feedbackData.text
    };

    const updatedTestimonials = [newReview, ...siteConfig.testimonials];
    const updated = {
      ...siteConfig,
      testimonials: updatedTestimonials
    };

    if (isFirebaseEnabled) {
      try {
        await updateDoc(doc(db, 'configs', 'site'), {
          testimonials: updatedTestimonials
        });
        setSiteConfig(updated);
      } catch (err) {
        console.error("Error syncing testimonials with Firestore: ", err);
      }
    } else {
      setSiteConfig(updated);
      localStorage.setItem('ashoka_site_config', JSON.stringify(updated));
    }

    setIsFeedbackSubmitted(true);
    setFeedbackData({ client: '', company: '', text: '' });
    setTimeout(() => {
      setIsFeedbackSubmitted(false);
    }, 4000);
  };

  // Device image selection handler
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 800000) {
      alert("Image size is larger than 800KB. Please compress or choose a smaller image to ensure it saves correctly.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct(prev => ({
        ...prev,
        image: reader.result // Base64 data URL
      }));
    };
    reader.readAsDataURL(file);
  };

  // Admin login handlers
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'adminpassword') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      sessionStorage.setItem('admin_logged_in', 'true');
      setEditedConfig({ ...siteConfig });
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    setAdminUsername('');
    setAdminPassword('');
  };

  // Helper to commit edits globally to Firestore or locally to localStorage
  const commitConfigChange = async (updatedConfig) => {
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'configs', 'site'), updatedConfig);
        setSiteConfig(updatedConfig);
      } catch (err) {
        console.error("Failed to sync change with Firestore: ", err);
        alert("Sync error. Please check Firestore security rules.");
      }
    } else {
      setSiteConfig(updatedConfig);
      localStorage.setItem('ashoka_site_config', JSON.stringify(updatedConfig));
    }
  };

  // Save branding settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await commitConfigChange(editedConfig);
    alert("Settings updated globally!");
  };

  // Product CRUD
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.shortDesc) return;
    const addedProduct = {
      ...newProduct,
      id: 'prod-' + Date.now()
    };
    const updated = {
      ...siteConfig,
      products: [...siteConfig.products, addedProduct]
    };
    await commitConfigChange(updated);
    setNewProduct({ name: '', shortDesc: '', desc: '', image: 'product_switchgear.png' });
    alert("Product added successfully!");
  };

  const handleDeleteProduct = async (id) => {
    const updatedProducts = siteConfig.products.filter(p => p.id !== id);
    const updated = { ...siteConfig, products: updatedProducts };
    await commitConfigChange(updated);
  };

  // Team CRUD
  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.role) return;
    const updated = {
      ...siteConfig,
      team: [...siteConfig.team, newTeam]
    };
    await commitConfigChange(updated);
    setNewTeam({ name: '', role: '', bio: '' });
    alert("Team member added!");
  };

  const handleDeleteTeam = async (name) => {
    const updatedTeam = siteConfig.team.filter(t => t.name !== name);
    const updated = { ...siteConfig, team: updatedTeam };
    await commitConfigChange(updated);
  };

  // Testimonials CRUD
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.client || !newTestimonial.text) return;
    const updated = {
      ...siteConfig,
      testimonials: [...siteConfig.testimonials, newTestimonial]
    };
    await commitConfigChange(updated);
    setNewTestimonial({ client: '', company: '', text: '' });
    alert("Testimonial added!");
  };

  const handleDeleteTestimonial = async (client) => {
    const updatedTest = siteConfig.testimonials.filter(t => t.client !== client);
    const updated = { ...siteConfig, testimonials: updatedTest };
    await commitConfigChange(updated);
  };

  // Certifications CRUD
  const handleAddCertification = async (e) => {
    e.preventDefault();
    if (!newCertification.title || !newCertification.authority) return;
    const addedCert = {
      ...newCertification,
      id: 'cert-' + Date.now()
    };
    const updated = {
      ...siteConfig,
      certifications: [...(siteConfig.certifications || []), addedCert]
    };
    await commitConfigChange(updated);
    setNewCertification({ title: '', authority: '', docNumber: '', desc: '' });
    alert("Certification added successfully!");
  };

  const handleDeleteCertification = async (id) => {
    const updatedCerts = (siteConfig.certifications || []).filter(c => c.id !== id);
    const updated = { ...siteConfig, certifications: updatedCerts };
    await commitConfigChange(updated);
  };

  // Queries operations
  const handleToggleQueryStatus = async (id) => {
    const queryItem = queries.find(q => q.id === id);
    if (!queryItem) return;
    const newStatus = queryItem.status === 'Pending' ? 'Reviewed' : 'Pending';

    if (isFirebaseEnabled) {
      try {
        await updateDoc(doc(db, 'queries', id), { status: newStatus });
      } catch (err) {
        console.error("Failed to update status in Firestore: ", err);
      }
    } else {
      const updated = queries.map(q => {
        if (q.id === id) {
          return { ...q, status: newStatus };
        }
        return q;
      });
      setQueries(updated);
      localStorage.setItem('ashoka_queries', JSON.stringify(updated));
      if (selectedQuery && selectedQuery.id === id) {
        setSelectedQuery(updated.find(q => q.id === id));
      }
    }
  };

  const handleDeleteQuery = async (id) => {
    if (isFirebaseEnabled) {
      try {
        await deleteDoc(doc(db, 'queries', id));
      } catch (err) {
        console.error("Failed to delete from Firestore: ", err);
      }
    } else {
      const updated = queries.filter(q => q.id !== id);
      setQueries(updated);
      localStorage.setItem('ashoka_queries', JSON.stringify(updated));
      setSelectedQuery(null);
    }
  };

  // Direct array mutations
  const handleServiceChange = (idx, field, value) => {
    const updatedServices = [...editedConfig.services];
    updatedServices[idx][field] = value;
    setEditedConfig({ ...editedConfig, services: updatedServices });
  };

  // Export JSON configuration tool (as fallback)
  const handleExportConfig = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(siteConfig, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Product page button handlers
  const handleLearnMore = (product) => {
    setSelectedProduct(product);
  };

  const handleEnquireProduct = (productName) => {
    setSelectedProduct(null); // Close learn more modal if open
    setEnquiryProduct(productName);
    setEnquiryData({ name: '', email: '', phone: '', message: '' });
    setIsEnquirySubmitted(false);
  };

  // Product enquiry form submit (Web3Forms + Firestore)
  const handleProductEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryData.name || !enquiryData.email || !enquiryData.phone) return;

    const newEntry = {
      fullName: enquiryData.name,
      businessName: `Product Enquiry: ${enquiryProduct}`,
      email: enquiryData.email,
      phone: enquiryData.phone,
      city: '',
      state: '',
      message: enquiryData.message || `Interested in ${enquiryProduct}`,
      status: 'Pending',
      date: new Date().toLocaleString()
    };

    // 1. Send Email via Web3Forms
    const emailPayload = {
      access_key: siteConfig.web3formsKey || "6f67106b-8419-4a0e-8e9c-ff89589c0994",
      subject: `Product Enquiry - ${enquiryProduct}`,
      from_name: "Ashoka Power Matrix Portal",
      "Full Name": enquiryData.name,
      "Product": enquiryProduct,
      "Email Address": enquiryData.email,
      "Phone Number": enquiryData.phone,
      "Message": enquiryData.message || `Interested in ${enquiryProduct}`
    };

    try {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(emailPayload)
      }).catch((err) => console.error("Web3Forms product enquiry error: ", err));
    } catch (err) {
      console.error(err);
    }

    // 2. Save to Firestore or localStorage
    if (isFirebaseEnabled) {
      try {
        await addDoc(collection(db, 'queries'), { id: Date.now(), ...newEntry });
      } catch (err) {
        console.error("Firestore product enquiry error: ", err);
      }
    } else {
      const updatedQueries = [{ id: Date.now(), ...newEntry }, ...queries];
      setQueries(updatedQueries);
      localStorage.setItem('ashoka_queries', JSON.stringify(updatedQueries));
    }

    setIsEnquirySubmitted(true);
    setTimeout(() => {
      setIsEnquirySubmitted(false);
      setEnquiryProduct(null);
      setEnquiryData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  // Nav links
  const navLinks = [
    { label: 'Home', path: '#/' },
    { label: 'About', path: '#/about' },
    { label: 'Products', path: '#/products' },
    { label: 'Certifications', path: '#/certifications' },
    { label: 'Services', path: '#/services' },
    { label: 'Our Customers', path: '#/#customers' },
    { label: 'Become a Dealer', path: '#/dealer' },
    { label: 'Contact', path: '#/contact' }
  ];

  // Wait for config file load
  if (!siteConfig) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#F8F9FB' }}>
        <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #0F3D91', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '16px', color: '#4B5563', fontWeight: '600' }}>Loading Website Configuration...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      {/* Top Banner Bar */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-info">
            <span className="top-bar-item" style={{ fontWeight: '700', color: 'var(--accent)' }}>
              <Award size={14} />
              {siteConfig.company.certification}
            </span>
            <span className="top-bar-item">
              <Mail size={14} />
              {siteConfig.contact.email}
            </span>
            <span className="top-bar-item">
              <Phone size={14} />
              {siteConfig.contact.phoneSecondary}
            </span>
          </div>
          <div className="top-bar-links">
            <a
              href="/company_profile.pdf"
              className="top-bar-link"
              download="Ashoka_Power_Matrix_Profile.pdf"
            >
              <FileDown size={14} />
              Download Profile
            </a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="#/dealer" className="top-bar-link">Dealer Login</a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#/" className="logo-container" style={{ textDecoration: 'none' }}>
            <AshokaLogoHorizontal width="auto" height="52px" mode="light" />
          </a>

          {/* Desktop Nav */}
          <nav className="nav">
            {navLinks.map((link, idx) => {
              const isActive = (currentPage === 'home' && (link.path === '#/' || link.path.startsWith('#/#'))) ||
                (link.path !== '#/' && !link.path.startsWith('#/#') && currentPage === link.path.slice(2));
              return (
                <a key={idx} href={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Hamburger Menu Toggle */}
          <button
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.path}
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/company_profile.pdf"
          className="mobile-nav-link"
          download="Ashoka_Power_Matrix_Profile.pdf"
          style={{ fontSize: '1.2rem', color: 'var(--accent)', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FileDown size={18} />
          Download Profile
        </a>
      </div>

      {/* Main Pages Content Router */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <div className="home-view">
            {/* Hero Section */}
            <section id="home" className="hero-page">
              <div className="hero-overlay"></div>
              <img
                className="hero-bg"
                src={heroBg}
                alt="Ashoka Power Matrix Manufacturing Plant"
                loading="eager"
              />
              <div className="container hero-container">
                <div className="hero-content">
                  <span className="hero-tag">B2B & B2C Excellence</span>
                  <h1>{siteConfig.company.name}</h1>
                  <p>Manufacturer of high-grade Current and Potential Transformers, Metering Panels, and custom electrical distribution equipment.</p>
                  <div className="hero-ctas">
                    <a href="#/products" className="btn btn-accent">
                      Explore Products
                      <ArrowRight size={16} />
                    </a>
                    <a
                      href="/company_profile.pdf"
                      className="btn btn-secondary"
                      download="Ashoka_Power_Matrix_Profile.pdf"
                      style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
                    >
                      <FileDown size={16} />
                      Download Profile
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Counter Sub-Section */}
            <section className="home-sub-dark">
              <div className="container">
                <div className="counter-grid">
                  {siteConfig.stats.map((stat, idx) => (
                    <div key={idx} className="counter-item">
                      <h3>
                        <StatCounter target={stat.value} suffix={stat.suffix} />
                      </h3>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Profile Overview Section */}
            <section className="home-section">
              <div className="container about-grid">
                <div className="about-intro">
                  <h2 className="section-title">Who We Are</h2>
                  <p style={{ marginTop: '20px' }}>{siteConfig.company.name} is a premier manufacturer of power switchboards, current transformers (CTs), potential transformers (PTs), and custom control units.</p>
                  <p>We combine 25+ years of engineering safety checks to supply certified electrical assets to industries and utility boards nationwide.</p>
                  <a href="#/about" className="btn btn-secondary" style={{ marginTop: '10px' }}>
                    Read Corporate Profile
                  </a>
                </div>
                <div className="about-cards">
                  <div className="about-card">
                    <div className="about-card-icon"><ShieldCheck size={22} /></div>
                    <div className="about-card-content">
                      <h4>ISO Certified Manufacturing</h4>
                      <p>All items conform to IEC and IS guidelines, undergoing rigid short-circuit audits.</p>
                    </div>
                  </div>
                  <div className="about-card">
                    <div className="about-card-icon"><Zap size={22} /></div>
                    <div className="about-card-content">
                      <h4>Tailored B2B Solutions</h4>
                      <p>Custom control panel design and scalable OEM assembly lines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Industries We Serve Section */}
            <section className="home-section-alt">
              <div className="container">
                <div className="page-header center">
                  <h2 className="section-title-center">Industries We Serve</h2>
                  <p>Empowering industries and building critical electrical networks for nationwide projects.</p>
                </div>
                <div className="industries-grid">
                  {siteConfig.industries.map((ind, idx) => (
                    <div key={idx} className="industry-card">
                      <h3>{ind.name}</h3>
                      <p>{ind.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="home-section">
              <div className="container">
                <div className="page-header center">
                  <h2 className="section-title-center">What Our Clients Say</h2>
                  <p>Powering trust and building partnerships through high performance and safety compliance.</p>
                </div>
                <div className="reviews-grid">
                  {siteConfig.testimonials.map((review, idx) => (
                    <div key={idx} className="review-card">
                      <p className="review-text">"{review.text}"</p>
                      <div className="review-author">{review.client}</div>
                      <div className="review-company">{review.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trusted By Continuous Logo Slider */}
            <section id="customers" className="home-section-alt">
              <div className="container">
                <div className="page-header center" style={{ marginBottom: '32px' }}>
                  <h2 className="section-title-center">Trusted By Industry Leaders</h2>
                  <p>Powering critical networks and building solutions for leading national utilities.</p>
                </div>
                <div className="slider-container">
                  <div className="slider-track">
                    {siteConfig.customers.map((c, i) => (
                      <div key={`c1-${i}`} className="slider-logo-card">
                        {customerLogos[c.name] || <span>{c.name}</span>}
                      </div>
                    ))}
                    {siteConfig.customers.map((c, i) => (
                      <div key={`c2-${i}`} className="slider-logo-card">
                        {customerLogos[c.name] || <span>{c.name}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'about' && (
          <section className="page-view container">
            <div className="page-header">
              <h2 className="section-title">About Our Company</h2>
              <p>{siteConfig.company.name} is a leading electrical manufacturing enterprise specializing in engineering excellence and robust machinery assemblies.</p>
            </div>
            <div className="about-grid">
              <div className="about-intro">
                <h3>Corporate Powerhouse</h3>
                <p>With an emphasis on security, durability, and smart integration, we create standard and custom components for industrial parks, residential blocks, and regional distributions.</p>
                <p>Our manufacturing workflow adopts lean execution practices, assuring quick assembly turnovers while checking every unit for compliance with strict short-circuit safety measures.</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <a href="#/dealer" className="btn btn-primary">
                    Join Our Dealer Network
                  </a>
                  <a
                    href="/company_profile.pdf"
                    className="btn btn-secondary"
                    download="Ashoka_Power_Matrix_Profile.pdf"
                  >
                    <FileDown size={16} />
                    Download Profile
                  </a>
                </div>
              </div>
              <div className="about-cards">
                <div className="about-card">
                  <div className="about-card-icon">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="about-card-content">
                    <h4>Our Mission</h4>
                    <p>To design and manufacture durable, high-efficiency power distribution units that assure safety and reduce energy costs.</p>
                  </div>
                </div>
                <div className="about-card">
                  <div className="about-card-icon">
                    <Zap size={22} />
                  </div>
                  <div className="about-card-content">
                    <h4>Our Vision</h4>
                    <p>To lead the electrical switchboard and OEM markets globally by deploying digital energy diagnostics and sustainable materials.</p>
                  </div>
                </div>
                <div className="about-card">
                  <div className="about-card-icon">
                    <Users size={22} />
                  </div>
                  <div className="about-card-content">
                    <h4>Why Choose Us</h4>
                    <p>State-of-the-art testing facilities, certified engineers, and prompt custom build turnarounds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'products' && (
          <section className="page-view container">
            <div className="page-header center">
              <h2 className="section-title-center">Our Core Products</h2>
              <p>Minimal, premium hardware designed for robust commercial layouts and standard residential wiring safety.</p>
            </div>
            <div className="products-grid">
              {siteConfig.products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img
                      className="product-img"
                      src={getProductImageSrc(p.image)}
                      alt={p.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p>{p.shortDesc}</p>
                    <div className="product-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEnquireProduct(p.name)}
                      >
                        Request Quote
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleLearnMore(p)}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Feedback Form */}
            <div className="feedback-section">
              <div className="feedback-card">
                <h3>Share Your Experience</h3>
                <p>We value your business feedback! Let us know how our transformers, switchgears, or meters have performed in your grids or facilities.</p>

                {isFeedbackSubmitted && (
                  <div className="form-success-msg">
                    <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Feedback Posted!</strong> Your testimonial is now active and saved globally.
                    </div>
                  </div>
                )}

                <form onSubmit={handleFeedbackSubmit}>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="feedClient">Your Name</label>
                      <input
                        type="text"
                        id="feedClient"
                        value={feedbackData.client}
                        onChange={(e) => setFeedbackData({ ...feedbackData, client: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="feedComp">Company / Position</label>
                      <input
                        type="text"
                        id="feedComp"
                        value={feedbackData.company}
                        onChange={(e) => setFeedbackData({ ...feedbackData, company: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="feedTxt">Your Testimonial / Feedback</label>
                    <textarea
                      id="feedTxt"
                      value={feedbackData.text}
                      onChange={(e) => setFeedbackData({ ...feedbackData, text: e.target.value })}
                      className="form-input"
                      placeholder="Write your review here..."
                      style={{ minHeight: '80px' }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={16} />
                    Submit Testimonial
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'certifications' && (
          <section className="page-view container">
            <div className="page-header" style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '0.7rem', color: '#0F3D91', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                / Certifications & Compliance
              </span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800', color: '#111827', lineHeight: '1.15', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Certifications you can verify.<br />Compliance you can build on.
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: '1.6', margin: 0 }}>
                We design and test against Indian and international standards. Placeholder certificates below — actual documents available on request.
              </p>
            </div>

            {/* Certifications Grid */}
            {siteConfig.certifications && siteConfig.certifications.length > 0 && (
              <div className="certifications-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px', marginTop: '32px' }}>
                {siteConfig.certifications.map((cert) => (
                  <div key={cert.id} className="cert-card">
                    {/* Upper certificate area */}
                    <div style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#FFFFFF', flexGrow: '1' }}>
                      {/* Vector Certificate Ribbon Icon */}
                      <svg viewBox="0 0 100 100" width="48" height="48" style={{ color: '#0046AD', marginBottom: '16px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="40" r="22" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="50" cy="40" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        <path d="M 42 58 L 35 88 L 50 80 L 65 88 L 58 58" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                        <path d="M 50 58 L 50 80" stroke="currentColor" strokeWidth="1.5" />
                      </svg>

                      <span style={{ display: 'block', fontSize: '0.64rem', letterSpacing: '0.15em', color: 'var(--text-light)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Certificate
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '6px', lineHeight: '1.2' }}>
                        {cert.title}
                      </h3>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '500' }}>
                        {cert.docNumber}
                      </span>
                    </div>

                    {/* Lower certificate meta area */}
                    <div style={{ padding: '16px 20px', backgroundColor: '#F9FAFB', borderTop: '1px solid var(--border)', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#374151', marginBottom: '2px' }}>
                        {cert.title}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.3' }}>
                        {cert.authority}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Quality & Compliance Explanations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '60px', borderTop: '1px solid var(--border)', paddingTop: '50px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ color: '#0046AD', marginBottom: '12px' }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                  Quality Assurance
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Every batch undergoes routine tests for ratio, polarity, accuracy, insulation resistance and dielectric strength. Random samples are subjected to extended type tests aligned with IS / IEC standards.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ color: '#0046AD', marginBottom: '12px' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
                  Compliance
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  Designed against IS 2705 (CT), IS 3156 (PT), IS 14697 (energy metering), and aligned with major DISCOM technical specifications across northern and central India.
                </p>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'services' && (
          <section className="page-view container">
            <div className="page-header center">
              <h2 className="section-title-center">Services We Provide</h2>
              <p>Engineering excellence from product concept creation and custom sizing to testing and after-sales maintenance.</p>
            </div>
            <div className="services-grid">
              {siteConfig.services.map((s) => {
                const IconComp = serviceIcons[s.id] || Zap;
                return (
                  <div key={s.id} className="services-card">
                    <div className="services-card-header">
                      <div className="services-card-icon">
                        <IconComp size={18} />
                      </div>
                      <h3>{s.title}</h3>
                    </div>
                    <p>{s.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Our Team Section */}
            <div className="team-section">
              <div className="page-header center">
                <h2 className="section-title-center">Our Corporate Team</h2>
                <p>Led by industry pioneers and certified safety auditors committed to electrical innovation.</p>
              </div>
              <div className="team-grid">
                {siteConfig.team.map((member, idx) => (
                  <div key={idx} className="team-card">
                    <div className="team-avatar">
                      {member.name.split(' ').pop().charAt(0)}
                    </div>
                    <h3>{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'customers' && (
          <section className="page-view container">
            <div className="page-header center" style={{ marginBottom: '40px' }}>
              <h2 className="section-title-center">Our Valued Customers</h2>
              <p>Powering critical infrastructures for major national and international brands.</p>
            </div>
            <div className="slider-container">
              <div className="slider-track">
                {siteConfig.customers.map((c, i) => (
                  <div key={`c1-${i}`} className="slider-logo-card">
                    {customerLogos[c.name] || <span>{c.name}</span>}
                  </div>
                ))}
                {siteConfig.customers.map((c, i) => (
                  <div key={`c2-${i}`} className="slider-logo-card">
                    {customerLogos[c.name] || <span>{c.name}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'dealer' && (
          <section className="page-view container">
            <div className="page-header center">
              <h2 className="section-title-center">Become a Dealer</h2>
              <p>Partner with {siteConfig.company.name} and distribute premium switchgears and panels to your local markets.</p>
            </div>
            <div className="dealer-grid">
              <div className="dealer-form-card">
                <h3 className="form-title">Business Partnership Enquiry</h3>
                {isSubmitted ? (
                  <div className="form-success-msg">
                    <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Enquiry Submitted!</strong> Your request has been emailed directly to our Gmail inbox and saved to our database. We will contact you soon.
                    </div>
                  </div>
                ) : null}
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="businessName">Business Name</label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Briefly describe your distribution experience..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Enquiry
                  </button>
                </form>
              </div>
              <div className="map-wrapper">
                <iframe
                  className="map-iframe"
                  title="Company Location Map"
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'contact' && (
          <section className="page-view container">
            <div className="page-header center">
              <h2 className="section-title-center">Get In Touch</h2>
              <p>Our technical team and customer executives are ready to address your requirements. Connect with us instantly.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <Phone size={22} />
                </div>
                <div className="contact-card-content">
                  <h3>Call Us</h3>
                  <p>Primary Office Desk:</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="contact-link">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <p style={{ marginTop: '5px' }}>Alt / Sales:</p>
                  <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="contact-link">
                    {siteConfig.contact.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.66.988 3.278 1.477 4.947 1.478 5.353 0 9.709-4.316 9.712-9.623.003-2.571-1.002-4.99-2.83-6.815-1.829-1.826-4.26-2.831-6.834-2.832-5.36 0-9.723 4.318-9.726 9.626-.001 1.848.5 3.57 1.448 5.09l-.497 1.815 1.874-.488zm13.167-9.527c-.247-.124-1.464-.722-1.691-.805-.226-.082-.39-.124-.555.124-.166.247-.64.805-.784.969-.144.166-.29.185-.536.062-.247-.125-.989-.365-1.884-1.161-.696-.621-1.166-1.389-1.303-1.616-.137-.227-.015-.35.11-.473.112-.11.247-.29.37-.435.124-.144.166-.247.247-.412.082-.166.041-.31-.02-.433-.062-.124-.555-1.34-.76-1.834-.199-.48-.403-.415-.555-.422-.144-.006-.31-.008-.474-.008-.166 0-.433.062-.66.31-.227.247-.866.845-.866 2.062 0 1.216.887 2.392.989 2.536.103.144 1.747 2.667 4.233 3.738.59.255 1.052.408 1.41.521.594.19 1.135.163 1.56.1.475-.07 1.464-.6 1.671-1.178.207-.58.207-1.072.144-1.178-.063-.106-.227-.168-.475-.293z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>WhatsApp Us</h3>
                  <p>Instant messaging for fast support and technical catalogue shares:</p>
                  <a
                    href={`https://wa.me/91${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-card-content">
                  <h3>Email Sales</h3>
                  <p>Send details of RFP documents or dealership requests directly:</p>
                  <a href={`mailto:${siteConfig.contact.salesEmail}`} className="contact-link">
                    {siteConfig.contact.salesEmail}
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-card-content">
                  <h3>Registered Office</h3>
                  <p>{siteConfig.contact.address}</p>
                  <p style={{ marginTop: '5px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {siteConfig.contact.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admin Router Page */}
        {currentPage === 'admin' && (
          <section className="page-view container animate-fade-in">
            {!isAdminLoggedIn ? (
              // Login Card
              <div className="admin-login-wrapper">
                <div className="admin-login-card">
                  <h3 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} className="accent" />
                    Admin Access Portal
                  </h3>
                  {loginError && (
                    <div style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '600' }}>
                      {loginError}
                    </div>
                  )}
                  <form onSubmit={handleAdminLogin}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="adminUser">Username</label>
                      <input
                        type="text"
                        id="adminUser"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="adminPass">Password</label>
                      <input
                        type="password"
                        id="adminPass"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                      Verify & Enter
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              // Dashboard Panel
              <div className="admin-dashboard">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                  {/* Database Sync Status Indicators */}
                  <div style={{ padding: '4px 10px', marginBottom: '14px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
                    {isFirebaseEnabled ? (
                      <div style={{ color: '#059669', fontSize: '0.78rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <CloudLightning size={14} />
                        Cloud Sync Enabled
                      </div>
                    ) : (
                      <div style={{ color: '#d97706', fontSize: '0.78rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Database size={14} />
                        Local Storage Only
                      </div>
                    )}
                  </div>

                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'queries' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('queries')}
                  >
                    <FolderOpen size={16} />
                    Dealer Queries ({queries.length})
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'branding' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('branding')}
                  >
                    <Settings size={16} />
                    Branding & Contacts
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'products' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('products')}
                  >
                    <Sliders size={16} />
                    Products CMS
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'services' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('services')}
                  >
                    <Wrench size={16} />
                    Services CMS
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'team' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('team')}
                  >
                    <Users size={16} />
                    Team CMS
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'testimonials' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('testimonials')}
                  >
                    <HeartHandshake size={16} />
                    Testimonials
                  </button>
                  <button
                    className={`admin-sidebar-btn ${adminActiveTab === 'certifications' ? 'active' : ''}`}
                    onClick={() => setAdminActiveTab('certifications')}
                  >
                    <Award size={16} />
                    Certifications CMS
                  </button>
                  <button
                    style={{ marginTop: '24px', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}
                    className="admin-sidebar-btn"
                    onClick={handleAdminLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </aside>

                {/* Dashboard Tabs Content */}
                <div className="admin-content">
                  {/* Database Setup Help Box */}
                  {!isFirebaseEnabled && adminActiveTab === 'branding' && (
                    <div style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '16px', borderRadius: '4px', marginBottom: '24px', fontSize: '0.85rem', color: '#78350f' }}>
                      <h4 style={{ color: '#b45309', marginBottom: '6px' }}>⚠️ Local Database Fallback Alert</h4>
                      <p style={{ marginBottom: '10px' }}>Your edits are currently saved locally to this browser only. To sync your updates globally for all visitors, set up a free Firebase Firestore project:</p>
                      <ol style={{ paddingLeft: '20px', lineHeight: '1.5' }}>
                        <li>Create a project on the <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Firebase Console</a>.</li>
                        <li>Add a **Web App** and copy the database configuration.</li>
                        <li>Create a file named `.env` in the root folder of this project.</li>
                        <li>Paste your configuration credentials (matching the keys in `.env.example`).</li>
                        <li>Enable **Cloud Firestore** inside the Firebase console, initialize rules, and restart the project (`npm run dev`).</li>
                      </ol>
                    </div>
                  )}

                  {editedConfig && adminActiveTab === 'queries' && (
                    <div>
                      <div className="admin-tab-header">
                        <h2>Enquiry Submissions</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Realtime Database Log</span>
                      </div>
                      <div className="admin-table-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Name</th>
                              <th>Business</th>
                              <th>Phone</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {queries.map((q) => (
                              <tr key={q.id}>
                                <td>{q.date.split(',')[0]}</td>
                                <td style={{ fontWeight: '600' }}>{q.fullName}</td>
                                <td>{q.businessName}</td>
                                <td>{q.phone}</td>
                                <td>
                                  <span className={`badge ${q.status === 'Pending' ? 'badge-pending' : 'badge-reviewed'}`}>
                                    {q.status}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      className="btn btn-secondary"
                                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                      onClick={() => setSelectedQuery(q)}
                                    >
                                      <Eye size={12} />
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: q.status === 'Pending' ? '#059669' : '#4B5563', borderColor: q.status === 'Pending' ? '#059669' : '#4B5563' }}
                                      onClick={() => handleToggleQueryStatus(q.id)}
                                    >
                                      Check
                                    </button>
                                    <button
                                      className="btn"
                                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#dc2626', border: '1px solid #dc2626' }}
                                      onClick={() => handleDeleteQuery(q.id)}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {queries.length === 0 && (
                              <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>
                                  No enquiry logs found in database.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {editedConfig && adminActiveTab === 'branding' && (
                    <form onSubmit={handleSaveSettings}>
                      <div className="admin-tab-header">
                        <h2>Branding & Contact Info</h2>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>

                      {/* Web3Forms Access Key Field */}
                      <div className="form-group" style={{ backgroundColor: 'var(--section-bg)', padding: '16px', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '20px' }}>
                        <label className="form-label" style={{ fontWeight: '700', color: 'var(--primary)' }}>Web3Forms Access Key (For Gmail Delivery)</label>
                        <input
                          type="text"
                          value={editedConfig.web3formsKey || ''}
                          onChange={(e) => setEditedConfig({ ...editedConfig, web3formsKey: e.target.value })}
                          className="form-input"
                          style={{ marginTop: '6px' }}
                          placeholder="e.g. 1a2b3c4d-5e6f-..."
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          If configured, enquiries will be forwarded straight to your client's Gmail address.
                        </p>
                      </div>

                      <div className="admin-form-grid">
                        <div className="form-group">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            value={editedConfig.company.name}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              company: { ...editedConfig.company, name: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">ISO Certification Tag</label>
                          <input
                            type="text"
                            value={editedConfig.company.certification}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              company: { ...editedConfig.company, certification: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone Primary</label>
                          <input
                            type="text"
                            value={editedConfig.contact.phone}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              contact: { ...editedConfig.contact, phone: e.target.value, phoneDisplay: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone Secondary (ISO Bar)</label>
                          <input
                            type="text"
                            value={editedConfig.contact.phoneSecondary}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              contact: { ...editedConfig.contact, phoneSecondary: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            value={editedConfig.contact.email}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              contact: { ...editedConfig.contact, email: e.target.value, salesEmail: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Logo Text Header</label>
                          <input
                            type="text"
                            value={editedConfig.company.logoText}
                            onChange={(e) => setEditedConfig({
                              ...editedConfig,
                              company: { ...editedConfig.company, logoText: e.target.value }
                            })}
                            className="form-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Brand Tagline</label>
                        <input
                          type="text"
                          value={editedConfig.company.tagline}
                          onChange={(e) => setEditedConfig({
                            ...editedConfig,
                            company: { ...editedConfig.company, tagline: e.target.value }
                          })}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Registered Office Address</label>
                        <input
                          type="text"
                          value={editedConfig.contact.address}
                          onChange={(e) => setEditedConfig({
                            ...editedConfig,
                            contact: { ...editedConfig.contact, address: e.target.value }
                          })}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Google Map Embed Link</label>
                        <input
                          type="text"
                          value={editedConfig.contact.googleMapsEmbedUrl}
                          onChange={(e) => setEditedConfig({
                            ...editedConfig,
                            contact: { ...editedConfig.contact, googleMapsEmbedUrl: e.target.value }
                          })}
                          className="form-input"
                          required
                        />
                      </div>
                    </form>
                  )}

                  {editedConfig && adminActiveTab === 'products' && (
                    <div>
                      <div className="admin-tab-header">
                        <h2>Products CMS</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Dynamically Add & Remove Items</span>
                      </div>
                      {/* Products List */}
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Active Products</h3>
                        <div style={{ marginTop: '16px' }}>
                          {siteConfig.products.map(p => (
                            <div key={p.id} className="admin-list-item">
                              <div className="admin-list-info" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <img
                                  src={getProductImageSrc(p.image)}
                                  alt=""
                                  style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--border)' }}
                                />
                                <div>
                                  <h4 style={{ margin: 0 }}>{p.name}</h4>
                                  <p style={{ margin: 0 }}>{p.shortDesc}</p>
                                </div>
                              </div>
                              <button
                                className="btn"
                                style={{ color: '#dc2626', border: '1px solid #dc2626', padding: '6px 12px' }}
                                onClick={() => handleDeleteProduct(p.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Product Form */}
                      <form onSubmit={handleAddProduct} style={{ borderTop: '2px solid var(--border)', paddingTop: '30px' }}>
                        <h3>Add New Product</h3>
                        <div className="admin-form-grid" style={{ marginTop: '16px' }}>
                          <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input
                              type="text"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Short Description</label>
                            <input
                              type="text"
                              value={newProduct.shortDesc}
                              onChange={(e) => setNewProduct({ ...newProduct, shortDesc: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                        </div>

                        {/* File Selector */}
                        <div className="form-group file-upload-wrapper">
                          <label className="form-label">Product Photo (Upload from Device)</label>
                          <label className="file-upload-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Upload size={16} />
                            {newProduct.image.startsWith('data:image') ? '✓ Custom Image Selected' : 'Choose Local Image file...'}
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleProductImageUpload}
                            />
                          </label>
                          {newProduct.image.startsWith('data:image') && (
                            <div className="file-preview-container">
                              <img src={newProduct.image} alt="Preview" className="file-preview-img" />
                              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Image ready for database upload.</span>
                            </div>
                          )}
                        </div>

                        <div className="form-group" style={{ marginTop: '16px' }}>
                          <label className="form-label">Detailed Description</label>
                          <textarea
                            value={newProduct.desc}
                            onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                            className="form-input"
                            style={{ minHeight: '80px' }}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PlusCircle size={16} />
                          Add Product
                        </button>
                      </form>
                    </div>
                  )}

                  {editedConfig && adminActiveTab === 'services' && (
                    <form onSubmit={handleSaveSettings}>
                      <div className="admin-tab-header">
                        <h2>Services Settings</h2>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                      <div>
                        {editedConfig.services.map((s, idx) => (
                          <div key={s.id} style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{s.title}</h4>
                            <div className="form-group">
                              <label className="form-label">Service Description</label>
                              <textarea
                                value={s.description}
                                onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
                                className="form-input"
                                style={{ minHeight: '60px' }}
                                required
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </form>
                  )}

                  {editedConfig && adminActiveTab === 'team' && (
                    <div>
                      <div className="admin-tab-header">
                        <h2>Corporate Team CMS</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage Executives</span>
                      </div>
                      {/* Team List */}
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Current Members</h3>
                        <div style={{ marginTop: '16px' }}>
                          {siteConfig.team.map((t, idx) => (
                            <div key={idx} className="admin-list-item">
                              <div className="admin-list-info">
                                <h4>{t.name}</h4>
                                <p>{t.role}</p>
                              </div>
                              <button
                                className="btn"
                                style={{ color: '#dc2626', border: '1px solid #dc2626', padding: '6px 12px' }}
                                onClick={() => handleDeleteTeam(t.name)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Team Member */}
                      <form onSubmit={handleAddTeam} style={{ borderTop: '2px solid var(--border)', paddingTop: '30px' }}>
                        <h3>Add Executive Member</h3>
                        <div className="admin-form-grid" style={{ marginTop: '16px' }}>
                          <div className="form-group">
                            <label className="form-label">Member Name</label>
                            <input
                              type="text"
                              value={newTeam.name}
                              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Designation Role</label>
                            <input
                              type="text"
                              value={newTeam.role}
                              onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Short Biography</label>
                          <textarea
                            value={newTeam.bio}
                            onChange={(e) => setNewTeam({ ...newTeam, bio: e.target.value })}
                            className="form-input"
                            style={{ minHeight: '60px' }}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PlusCircle size={16} />
                          Add Member
                        </button>
                      </form>
                    </div>
                  )}

                  {editedConfig && adminActiveTab === 'testimonials' && (
                    <div>
                      <div className="admin-tab-header">
                        <h2>Client Testimonials</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Feedback Reviews Panel</span>
                      </div>
                      {/* Testimonials List */}
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Active Reviews</h3>
                        <div style={{ marginTop: '16px' }}>
                          {siteConfig.testimonials.map((t, idx) => (
                            <div key={idx} className="admin-list-item">
                              <div className="admin-list-info">
                                <h4>{t.client}</h4>
                                <p>{t.company}</p>
                              </div>
                              <button
                                className="btn"
                                style={{ color: '#dc2626', border: '1px solid #dc2626', padding: '6px 12px' }}
                                onClick={() => handleDeleteTestimonial(t.client)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Testimonial */}
                      <form onSubmit={handleAddTestimonial} style={{ borderTop: '2px solid var(--border)', paddingTop: '30px' }}>
                        <h3>Add Client Review</h3>
                        <div className="admin-form-grid" style={{ marginTop: '16px' }}>
                          <div className="form-group">
                            <label className="form-label">Client Name</label>
                            <input
                              type="text"
                              value={newTestimonial.client}
                              onChange={(e) => setNewTestimonial({ ...newTestimonial, client: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Client Company Name</label>
                            <input
                              type="text"
                              value={newTestimonial.company}
                              onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Review Quotation Text</label>
                          <textarea
                            value={newTestimonial.text}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                            className="form-input"
                            style={{ minHeight: '60px' }}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PlusCircle size={16} />
                          Add Testimonial
                        </button>
                      </form>
                    </div>
                  )}

                  {editedConfig && adminActiveTab === 'certifications' && (
                    <div>
                      <div className="admin-tab-header">
                        <h2>Certifications CMS</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage Quality Credentials</span>
                      </div>

                      {/* Certifications List */}
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Active Credentials</h3>
                        <div style={{ marginTop: '16px' }}>
                          {(siteConfig.certifications || []).map(c => (
                            <div key={c.id} className="admin-list-item">
                              <div className="admin-list-info">
                                <h4>{c.title}</h4>
                                <p>{c.authority} — {c.docNumber}</p>
                              </div>
                              <button
                                className="btn"
                                style={{ color: '#dc2626', border: '1px solid #dc2626', padding: '6px 12px' }}
                                onClick={() => handleDeleteCertification(c.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Certification */}
                      <form onSubmit={handleAddCertification} style={{ borderTop: '2px solid var(--border)', paddingTop: '30px' }}>
                        <h3>Add Quality Certificate</h3>
                        <div className="admin-form-grid" style={{ marginTop: '16px' }}>
                          <div className="form-group">
                            <label className="form-label">Certificate Title</label>
                            <input
                              type="text"
                              value={newCertification.title}
                              onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Authority / Agency</label>
                            <input
                              type="text"
                              value={newCertification.authority}
                              onChange={(e) => setNewCertification({ ...newCertification, authority: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Document / Report Number</label>
                          <input
                            type="text"
                            value={newCertification.docNumber}
                            onChange={(e) => setNewCertification({ ...newCertification, docNumber: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Cert No. ISO-9001 / Test Report CPRI-88"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description / Scope of Audit</label>
                          <textarea
                            value={newCertification.desc}
                            onChange={(e) => setNewCertification({ ...newCertification, desc: e.target.value })}
                            className="form-input"
                            style={{ minHeight: '60px' }}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <PlusCircle size={16} />
                          Add Certification
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-about">
            <div style={{ marginBottom: '16px' }}>
              <AshokaLogoVertical width="160px" height="auto" mode="dark" bgClearColor="#0B1C3C" />
            </div>
            <p>Providing cutting edge B2B power systems, heavy machinery units, smart grid switchboards, and domestic safety systems across India.</p>
            <div className="social-links">
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <Users size={14} />
              </a>
              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/about">About</a></li>
              <li><a href="#/certifications">Certifications</a></li>
              <li><a href="#/customers">Customers</a></li>
              <li><a href="#/dealer">Become a Dealer</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul className="footer-links">
              {siteConfig.products.map(p => (
                <li key={p.id}>
                  <a href="#/products" onClick={() => handleLearnMore(p)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              {siteConfig.services.map(s => (
                <li key={s.id}>
                  <a href="#/services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
            <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span>
            <a href="#/admin" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Admin Desk</a>
          </div>
          <div className="footer-legal-links">
            <a href="#/privacy">Privacy Policy</a>
            <a href="#/terms">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Learn More Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProduct.name}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', marginBottom: '16px', backgroundColor: '#f3f4f6' }}>
                <img
                  src={getProductImageSrc(selectedProduct.image)}
                  alt={selectedProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{ fontSize: '0.98rem', marginBottom: '20px', lineHeight: '1.5' }}>
                {selectedProduct.desc}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEnquireProduct(selectedProduct.name)}
                >
                  Request Quote
                </button>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="btn btn-secondary"
                >
                  <Phone size={13} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="modal-backdrop" onClick={() => setSelectedQuery(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Query Details - {selectedQuery.fullName}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedQuery(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', fontSize: '0.9rem' }}>
                <div>
                  <strong>Business Name:</strong>
                  <div>{selectedQuery.businessName}</div>
                </div>
                <div>
                  <strong>Date:</strong>
                  <div>{selectedQuery.date}</div>
                </div>
                <div>
                  <strong>Email:</strong>
                  <div><a href={`mailto:${selectedQuery.email}`} style={{ color: 'var(--primary)' }}>{selectedQuery.email}</a></div>
                </div>
                <div>
                  <strong>Phone:</strong>
                  <div><a href={`tel:${selectedQuery.phone}`} style={{ color: 'var(--primary)' }}>{selectedQuery.phone}</a></div>
                </div>
                <div>
                  <strong>Location:</strong>
                  <div>{selectedQuery.city}, {selectedQuery.state}</div>
                </div>
                <div>
                  <strong>Status:</strong>
                  <div>
                    <span className={`badge ${selectedQuery.status === 'Pending' ? 'badge-pending' : 'badge-reviewed'}`}>
                      {selectedQuery.status}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                <strong>Message:</strong>
                <p style={{ marginTop: '6px', fontSize: '0.92rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {selectedQuery.message}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleToggleQueryStatus(selectedQuery.id)}
                >
                  Toggle Status (Pending / Reviewed)
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedQuery(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Enquiry Modal */}
      {enquiryProduct && (
        <div className="modal-backdrop" onClick={() => setEnquiryProduct(null)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Request Quote — {enquiryProduct}</h3>
              <button className="modal-close-btn" onClick={() => setEnquiryProduct(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {isEnquirySubmitted ? (
                <div className="form-success-msg">
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Enquiry Sent!</strong> We'll get back to you shortly with pricing and details for {enquiryProduct}.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProductEnquirySubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Enter your full name"
                      value={enquiryData.name}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@company.com"
                      value={enquiryData.email}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={enquiryData.phone}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message (optional)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      placeholder="Any specific requirements or quantity details..."
                      value={enquiryData.message}
                      onChange={(e) => setEnquiryData(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      <Mail size={14} style={{ marginRight: '6px' }} />
                      Submit Enquiry
                    </button>
                    <a href={`tel:${siteConfig.contact.phone}`} className="btn btn-secondary">
                      <Phone size={14} style={{ marginRight: '6px' }} />
                      Call
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
