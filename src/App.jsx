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
  Map, 
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  Sliders,
  LifeBuoy
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
  "srv-oem": Layers,
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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

  // Monitor scroll to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link highlight
      const sections = ['home', 'about', 'products', 'quality', 'services', 'customers', 'dealer', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
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
    // Simulate API request
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
      message: `I am interested in learning more about your ${productName}. Please share catalogue, pricing, and dealership terms.`
    }));
    // Scroll to dealer section
    const el = document.getElementById('dealer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#home" className="logo">
            {CONFIG.company.logoText}
            <span className="accent">{CONFIG.company.logoAccent}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="nav">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}>Products</a>
            <a href="#quality" className={`nav-link ${activeSection === 'quality' ? 'active' : ''}`}>Quality</a>
            <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
            <a href="#customers" className={`nav-link ${activeSection === 'customers' ? 'active' : ''}`}>Our Customers</a>
            <a href="#dealer" className={`nav-link ${activeSection === 'dealer' ? 'active' : ''}`}>Become a Dealer</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
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
        <a 
          href="#home" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </a>
        <a 
          href="#about" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </a>
        <a 
          href="#products" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Products
        </a>
        <a 
          href="#quality" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Quality
        </a>
        <a 
          href="#services" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Services
        </a>
        <a 
          href="#customers" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Our Customers
        </a>
        <a 
          href="#dealer" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Become a Dealer
        </a>
        <a 
          href="#contact" 
          className="mobile-nav-link" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </a>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <img 
          className="hero-bg" 
          src={heroBg} 
          alt="Ashoba Powermatrix Manufacturing Plant" 
          loading="eager"
        />
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">B2B & B2C Excellence</span>
            <h1>{CONFIG.company.name}</h1>
            <p>{CONFIG.company.tagline}. Providing premium electrical manufacturing, reliable industrial solutions, and trusted partnerships nationwide.</p>
            <div className="hero-ctas">
              <a href="#products" className="btn btn-accent">
                Explore Products
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Our Company</h2>
            <p>Ashoba Powermatrix Pvt. Ltd. is a leading electrical manufacturing enterprise specializing in engineering excellence, robust machinery assemblies, and smart power grids.</p>
          </div>
          <div className="about-grid">
            <div className="about-intro">
              <h3>Corporate Powerhouse</h3>
              <p>With an emphasis on security, durability, and smart integration, we create standard and custom components for industrial parks, residential blocks, and regional distributions.</p>
              <p>Our manufacturing workflow adopts lean execution practices, assuring quick assembly turnovers while checking every unit for compliance with strict short-circuit and insulation safety measures.</p>
              <a href="#dealer" className="btn btn-primary" style={{ marginTop: '10px' }}>
                Join Our Dealer Network
              </a>
            </div>
            <div className="about-cards">
              <div className="about-card">
                <div className="about-card-icon">
                  <ShieldCheck size={24} />
                </div>
                <div className="about-card-content">
                  <h4>Our Mission</h4>
                  <p>To design and manufacture durable, high-efficiency power distribution units that assure safety and reduce energy costs.</p>
                </div>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <Zap size={24} />
                </div>
                <div className="about-card-content">
                  <h4>Our Vision</h4>
                  <p>To lead the electrical switchboard and OEM markets globally by deploying digital energy diagnostics and sustainable materials.</p>
                </div>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <Users size={24} />
                </div>
                <div className="about-card-content">
                  <h4>Why Choose Us</h4>
                  <p>State-of-the-art testing facilities, certified engineers, prompt custom build turnarounds, and 24/7 technical support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section section-alt">
        <div className="container">
          <div className="section-header center">
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
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleLearnMore(p)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Controls Section */}
      <section id="quality" className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title-center">Commitment to Quality</h2>
            <p>Our commitment to rigorous testing and premium grade materials guarantees safe operation in hazardous industrial fields.</p>
          </div>
          <div className="quality-grid">
            {qualityIcons.map((q, idx) => {
              const IconComp = q.icon;
              return (
                <div key={idx} className="quality-card">
                  <div className="quality-icon">
                    <IconComp size={36} />
                  </div>
                  <h3>{q.title}</h3>
                  <p>{q.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Counter Section */}
      <section className="counter-section">
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

      {/* Services Section */}
      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header center">
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
                      <IconComp size={20} />
                    </div>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By Section (continuous grayscale logo slider) */}
      <section id="customers" className="section">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title-center">Trusted By</h2>
            <p>Powering critical infrastructures for major national and international brands.</p>
          </div>
          <div className="slider-container">
            <div className="slider-track">
              {CONFIG.customers.map((c, i) => (
                <div key={`c1-${i}`} className="slider-logo-card">
                  {c.logoText}
                </div>
              ))}
              {CONFIG.customers.map((c, i) => (
                <div key={`c2-${i}`} className="slider-logo-card">
                  {c.logoText}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become a Dealer Section */}
      <section id="dealer" className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title-center">Become a Dealer</h2>
            <p>Partner with Ashoba Powermatrix Pvt. Ltd. and distribute premium switchgears and panels to your local markets.</p>
          </div>
          <div className="dealer-grid">
            <div className="dealer-form-card">
              <h3 className="form-title">Business Partnership Enquiry</h3>
              {isSubmitted ? (
                <div className="form-success-msg">
                  <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Thank you for your enquiry!</strong> Our dealership relations team will verify your business details and contact you within 24 business hours.
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
                    placeholder="Briefly describe your distribution experience and details of current operations..."
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
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
        </div>
      </section>

      {/* Detailed Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title-center">Get In Touch</h2>
            <p>Our technical team and customer executives are ready to address your requirements. Connect with us instantly.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone size={24} />
              </div>
              <div className="contact-card-content">
                <h3>Call Us</h3>
                <p>Feel free to reach out to our primary business desk for quick quotes:</p>
                <a href={`tel:${CONFIG.contact.phone}`} className="contact-link">
                  {CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ verticalAlign: 'middle' }}>
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
                <Mail size={24} />
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
                <MapPin size={24} />
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
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-about">
            <h3>{CONFIG.company.logoText} <span style={{ color: 'var(--accent)' }}>{CONFIG.company.logoAccent}</span></h3>
            <p>Providing cutting edge B2B power systems, heavy machinery units, smart grid switchboards, and domestic safety systems across India.</p>
            <div className="social-links">
              <a href={CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <Users size={16} />
              </a>
              <a href={CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#quality">Quality</a></li>
              <li><a href="#customers">Customers</a></li>
              <li><a href="#dealer">Become a Dealer</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul className="footer-links">
              {CONFIG.products.map(p => (
                <li key={p.id}>
                  <a href="#products" onClick={() => handleLearnMore(p)}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              {CONFIG.services.map(s => (
                <li key={s.id}>
                  <a href="#services">{s.title}</a>
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
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
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
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', marginBottom: '20px', backgroundColor: '#f3f4f6' }}>
                <img 
                  src={productImages[selectedProduct.image]} 
                  alt={selectedProduct.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <p style={{ fontSize: '1.05rem', marginBottom: '24px', lineHeight: '1.6' }}>
                {selectedProduct.desc}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleEnquireProduct(selectedProduct.name)}
                >
                  Enquire About Dealership
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
