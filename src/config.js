// Central Editable Configuration for Ashoba Powermatrix Pvt. Ltd.

export const CONFIG = {
  company: {
    name: "Ashoba Powermatrix Pvt. Ltd.",
    shortName: "Ashoba Powermatrix",
    logoText: "Ashoba",
    logoAccent: "Powermatrix",
    tagline: "High-Performance B2B & B2C Power Distribution Solutions",
  },
  contact: {
    phone: "9991688804",
    phoneDisplay: "+91 99916 88804",
    whatsapp: "9991688804",
    whatsappDisplay: "+91 99916 88804",
    email: "info@ashobapowermatrix.com",
    salesEmail: "sales@ashobapowermatrix.com",
    address: "Plot No. 42, Sector 6, IMT Manesar, Gurugram, Haryana - 122051, India",
    businessHours: "Monday - Saturday: 9:00 AM - 6:00 PM (Closed on Sundays)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3129618173426!2d76.93721387635678!3d28.379659075797375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3e5eaaaaaaab%3A0x6b6c20579e0a0d9b!2sIMT%20Manesar%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1719460000000!5m2!1sen!2sin",
  },
  socials: {
    linkedin: "https://linkedin.com/company/ashoba-powermatrix",
    facebook: "https://facebook.com/ashoba-powermatrix",
    twitter: "https://twitter.com/ashobapower",
    instagram: "https://instagram.com/ashoba_powermatrix",
  },
  stats: [
    { value: 10000, suffix: "+", label: "Happy Clients" },
    { value: 500, suffix: "+", label: "Products" },
    { value: 20, suffix: "+", label: "States Served" },
    { value: 15, suffix: "+", label: "Years Experience" }
  ],
  services: [
    {
      id: "srv-mfg",
      title: "Electrical Manufacturing",
      description: "High-precision manufacturing of switchgears, distribution boards, and heavy-duty electrical fittings using grade-A raw materials."
    },
    {
      id: "srv-ind",
      title: "Industrial Solutions",
      description: "Designing end-to-end turnkey power distribution layouts for high-voltage industrial plants, factories, and warehouses."
    },
    {
      id: "srv-oem",
      title: "OEM Manufacturing",
      description: "Flexible, high-capacity original equipment manufacturing services tailored to national and international brand specifications."
    },
    {
      id: "srv-cust",
      title: "Custom Products",
      description: "Bespoke engineering solutions for custom size control panels, specialized distribution boards, and distinct busway configurations."
    },
    {
      id: "srv-tech",
      title: "Technical Support",
      description: "24/7 dedicated engineering support for installation supervision, system testing, load calculations, and commissioning."
    },
    {
      id: "srv-sales",
      title: "After Sales Support",
      description: "Prompt troubleshooting, AMC services, supply of original spares, and periodic electrical inspection services."
    }
  ],
  products: [
    {
      id: "prod-swg",
      name: "Modular Switchgears & DBs",
      shortDesc: "High-breaking capacity circuit breakers and distribution boards for home and industry.",
      desc: "Engineered for maximum electrical protection, our modular switchgears feature arc extinction technology and dual-safety interlocking. Suitable for B2C home units and B2B industrial distribution centers.",
      image: "product_switchgear.png"
    },
    {
      id: "prod-cp",
      name: "Industrial Control Panels",
      shortDesc: "APFC, PLC, and MCC control panels built for heavy-duty industrial automation.",
      desc: "Dust-proof and vermin-proof sheet enclosures housing high-grade contactors, thermal relays, and PLC units. Fully tested for temperature rise, dielectric strength, and short-circuit withstand.",
      image: "product_panel.png"
    },
    {
      id: "prod-trans",
      name: "Power & Distribution Transformers",
      shortDesc: "Highly efficient copper-wound transformers with optimal cooling configurations.",
      desc: "Low-loss transformers equipped with off-circuit tap changers, silica gel breathers, and safety pressure relief valves. Extends operational reliability for regional distribution grids.",
      image: "product_transformer.png"
    },
    {
      id: "prod-meters",
      name: "Energy Management Meters",
      shortDesc: "Smart multi-function digital energy meters with Modbus communication.",
      desc: "Precision Class 0.5S smart meters for real-time tracking of voltage, current, power factor, and harmonics. Ideal for building automation and industrial energy audits.",
      image: "product_meter.png"
    }
  ],
  customers: [
    { name: "Tata Power", logoText: "TATA POWER" },
    { name: "Reliance Infra", logoText: "RELIANCE" },
    { name: "L&T Construction", logoText: "L&T CONST" },
    { name: "Siemens India", logoText: "SIEMENS" },
    { name: "ABB Limited", logoText: "ABB" },
    { name: "Havells India", logoText: "HAVELLS" }
  ]
};
