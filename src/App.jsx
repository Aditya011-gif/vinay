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
  FileDown
} from 'lucide-react';
import { CONFIG } from './config';

// Import Assets
import heroBg from './assets/hero_bg.png';
import productSwitchgear from './assets/product_switchgear.png';
import productPanel from './assets/product_panel.png';
import productTransformer from './assets/product_transformer.png';
import productMeter from './assets/product_meter.png';

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

// Stylized brand SVG logotypes to look exactly like actual high-end corporate identities
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

// Custom animated counter component that runs once when scrolled into view
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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

  // Monitor URL Hash changes for Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let page = 'home';
      
      // Handle same-page scrolling hooks (like #/#customers)
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
      window.scrollTo(0, 0); // Scroll to top on standard page navigation
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll to add shadow to header
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

  const handleLearnMore = (product) => {
    setSelectedProduct(product);
  };

  const handleEnquireProduct = (productName) => {
    setSelectedProduct(null);
    setFormData(prev => ({
      ...prev,
      message: `I am interested in getting a quote/catalogue for: ${productName}. Please share pricing and compliance sheets.`
    }));
    window.location.hash = '#/dealer';
  };

  // Nav link mapping - Point 'Our Customers' to Home Page section anchor
  const navLinks = [
    { label: 'Home', path: '#/' },
    { label: 'About', path: '#/about' },
    { label: 'Products', path: '#/products' },
    { label: 'Quality', path: '#/quality' },
    { label: 'Services', path: '#/services' },
    { label: 'Our Customers', path: '#/#customers' },
    { label: 'Become a Dealer', path: '#/dealer' },
    { label: 'Contact', path: '#/contact' }
  ];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-info">
            <span className="top-bar-item" style={{ fontWeight: '700', color: 'var(--accent)' }}>
              <Award size={14} />
              {CONFIG.company.certification}
            </span>
            <span className="top-bar-item">
              <Mail size={14} />
              {CONFIG.contact.email}
            </span>
            <span className="top-bar-item">
              <Phone size={14} />
              {CONFIG.contact.phoneSecondary}
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
          <a href="#/" className="logo-container">
            <div className="logo">
              {CONFIG.company.logoText}
              <span className="accent">{CONFIG.company.logoAccent}</span>
            </div>
            <span className="logo-tagline">{CONFIG.company.tagline}</span>
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
                  <h1>{CONFIG.company.name}</h1>
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
                  {CONFIG.stats.map((stat, idx) => (
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
                  <p style={{ marginTop: '20px' }}>Ashoka Power Matrix Pvt. Ltd. is a premier manufacturer of power switchboards, current transformers (CTs), potential transformers (PTs), and custom control units.</p>
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
                  {CONFIG.industries.map((ind, idx) => (
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
                  {CONFIG.testimonials.map((review, idx) => (
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
                    {CONFIG.customers.map((c, i) => (
                      <div key={`c1-${i}`} className="slider-logo-card">
                        {customerLogos[c.name] || <span>{c.name}</span>}
                      </div>
                    ))}
                    {CONFIG.customers.map((c, i) => (
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
              <p>Ashoka Power Matrix Pvt. Ltd. is a leading electrical manufacturing enterprise specializing in engineering excellence and robust machinery assemblies.</p>
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
              {CONFIG.products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      className="product-img" 
                      src={productImages[p.image]} 
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
                      <a 
                        href={`tel:${CONFIG.contact.phone}`} 
                        className="btn btn-secondary"
                      >
                        <Phone size={13} />
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'quality' && (
          <section className="page-view container">
            <div className="page-header center">
              <h2 className="section-title-center">Commitment to Quality</h2>
              <p>Our commitment to rigorous testing and premium grade materials guarantees safe operation in hazardous fields.</p>
            </div>
            <div className="quality-grid">
              {qualityIcons.map((q, idx) => {
                const IconComp = q.icon;
                return (
                  <div key={idx} className="quality-card">
                    <div className="quality-icon">
                      <IconComp size={32} />
                    </div>
                    <h3>{q.title}</h3>
                    <p>{q.desc}</p>
                  </div>
                );
              })}
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
              {CONFIG.services.map((s) => {
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
                {CONFIG.team.map((member, idx) => (
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
                {CONFIG.customers.map((c, i) => (
                  <div key={`c1-${i}`} className="slider-logo-card">
                    {customerLogos[c.name] || <span>{c.name}</span>}
                  </div>
                ))}
                {CONFIG.customers.map((c, i) => (
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
              <p>Partner with Ashoka Power Matrix Pvt. Ltd. and distribute premium switchgears and panels to your local markets.</p>
            </div>
            <div className="dealer-grid">
              <div className="dealer-form-card">
                <h3 className="form-title">Business Partnership Enquiry</h3>
                {isSubmitted ? (
                  <div className="form-success-msg">
                    <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Enquiry Submitted!</strong> Our dealership relations team will verify your business details and contact you within 24 business hours.
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
                  src={CONFIG.contact.googleMapsEmbedUrl} 
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
                  <a href={`tel:${CONFIG.contact.phone}`} className="contact-link">
                    {CONFIG.contact.phoneDisplay}
                  </a>
                  <p style={{ marginTop: '5px' }}>Alt / Sales:</p>
                  <a href={`tel:${CONFIG.contact.phoneSecondary}`} className="contact-link">
                    {CONFIG.contact.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.66.988 3.278 1.477 4.947 1.478 5.353 0 9.709-4.316 9.712-9.623.003-2.571-1.002-4.99-2.83-6.815-1.829-1.826-4.26-2.831-6.834-2.832-5.36 0-9.723 4.318-9.726 9.626-.001 1.848.5 3.57 1.448 5.09l-.497 1.815 1.874-.488zm13.167-9.527c-.247-.124-1.464-.722-1.691-.805-.226-.082-.39-.124-.555.124-.166.247-.64.805-.784.969-.144.166-.29.185-.536.062-.247-.125-.989-.365-1.884-1.161-.696-.621-1.166-1.389-1.303-1.616-.137-.227-.015-.35.11-.473.112-.11.247-.29.37-.435.124-.144.166-.247.247-.412.082-.166.041-.31-.02-.433-.062-.124-.555-1.34-.76-1.834-.199-.48-.403-.415-.555-.422-.144-.006-.31-.008-.474-.008-.166 0-.433.062-.66.31-.227.247-.866.845-.866 2.062 0 1.216.887 2.392.989 2.536.103.144 1.747 2.667 4.233 3.738.59.255 1.052.408 1.41.521.594.19 1.135.163 1.56.1.475-.07 1.464-.6 1.671-1.178.207-.58.207-1.072.144-1.178-.063-.106-.227-.168-.475-.293z"/>
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>WhatsApp Us</h3>
                  <p>Instant messaging for fast support and technical catalogue shares:</p>
                  <a 
                    href={`https://wa.me/91${CONFIG.contact.whatsapp}`} 
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
                  <a href={`mailto:${CONFIG.contact.salesEmail}`} className="contact-link">
                    {CONFIG.contact.salesEmail}
                  </a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-card-content">
                  <h3>Registered Office</h3>
                  <p>{CONFIG.contact.address}</p>
                  <p style={{ marginTop: '5px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {CONFIG.contact.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-about">
            <h3>{CONFIG.company.logoText} <span style={{ color: 'var(--accent)' }}>{CONFIG.company.logoAccent}</span></h3>
            <p>Providing cutting edge B2B power systems, heavy machinery units, smart grid switchboards, and domestic safety systems across India.</p>
            <div className="social-links">
              <a href={CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <Users size={14} />
              </a>
              <a href={CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/about">About</a></li>
              <li><a href="#/quality">Quality</a></li>
              <li><a href="#/customers">Customers</a></li>
              <li><a href="#/dealer">Become a Dealer</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul className="footer-links">
              {CONFIG.products.map(p => (
                <li key={p.id}>
                  <a href="#/products" onClick={() => handleLearnMore(p)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              {CONFIG.services.map(s => (
                <li key={s.id}>
                  <a href="#/services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {CONFIG.company.name}. All rights reserved.
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
                  src={productImages[selectedProduct.image]} 
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
                  href={`tel:${CONFIG.contact.phone}`} 
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
    </>
  );
}

export default App;
