import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRightCircle, Zap, ShieldCheck, Activity, BarChart3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import '../styles/tailwind.css';


const services = [
  {
    cat: 'Enterprise Resource Planning (ERP)',
    title: 'Tailored ERP for your industry',
    desc: 'Tailored ERP for textile, pharma, BFSI and SME sectors — built on deep operational understanding to drive efficiency and real-time visibility.',
    points: [
      'ERP integration for textile, pharma and SME sectors',
      'Automation of manufacturing and supply chain workflows',
      'Inventory, order management and operational dashboards',
      'Data-driven planning built on 65 years of industrial expertise'
    ],
    tags: ['ERP', 'Manufacturing', 'Automation', 'BFSI'],
  },
  {
    cat: 'Cybersecurity & Compliance',
    title: 'End-to-end security and compliance',
    desc: 'End-to-end security — VAPT, compliance frameworks (RBI, DPDP, FDA), SOC operations and threat management to keep enterprise data safe.',
    points: [
      'Vulnerability Assessment & Penetration Testing (VAPT)',
      'Regulatory compliance: RBI, DPDP, FDA frameworks',
      'SOC operations and continuous threat monitoring',
      'Secure architecture reviews and incident readiness'
    ],
    tags: ['Security', 'VAPT', 'Compliance', 'SOC'],
  },
  {
    cat: 'FinTech & Banking Solutions',
    title: 'Purpose-built for cooperative banks and RCBs',
    desc: 'Core banking, digital payments and NBFC platforms — purpose-built for cooperative banks and RCBs with regulatory compliance at the core.',
    points: [
      'Core banking systems for cooperative banks and RCBs',
      'Digital payments and NBFC platform development',
      'RBI-compliant financial product engineering',
      'Secure, auditable transaction and reporting systems'
    ],
    tags: ['FinTech', 'Banking', 'NBFC', 'Payments'],
  },
  {
    cat: 'AI / ML & Intelligent Automation',
    title: 'Actionable intelligence for enterprise operations',
    desc: 'ML models, RPA workflows and intelligent process automation for operational efficiency — turning data into decisive business advantage.',
    points: [
      'Machine learning models and predictive analytics',
      'Robotic Process Automation (RPA) workflow design',
      'Cognitive AI for natural language and decision automation',
      'Operational intelligence dashboards and insights'
    ],
    tags: ['AI', 'ML', 'RPA', 'Automation'],
  },
  {
    cat: 'Business Process Management (BPM)',
    title: 'Streamline and automate enterprise workflows',
    desc: 'Process analysis, re-engineering and automation across enterprise workflows to eliminate inefficiencies and drive consistent business outcomes.',
    points: [
      'Business process analysis and re-engineering',
      'Workflow automation across enterprise operations',
      'Process performance monitoring and optimization',
      'BPM tooling integration and governance frameworks'
    ],
    tags: ['BPM', 'Workflow', 'Automation', 'Governance'],
  },
  {
    cat: 'Digital Transformation',
    title: 'Modernize processes and platforms',
    desc: 'We help organizations transform legacy operations into future-ready digital systems with scalable architecture and modern workflows.',
    points: [
      'Process modernization for enterprise teams',
      'Cloud-native and API-first application design',
      'Automation for business operations',
      'Digital experience platforms for internal and external users'
    ],
    tags: ['Automation', 'Cloud', 'Workflow', 'Modernization'],
  },
  {
    cat: 'Cloud & Data Engineering',
    title: 'Scalable cloud and data infrastructure',
    desc: 'Cloud migration strategies, data pipelines, warehousing and analytics for enterprise decision-making — built for speed, scale and security.',
    points: [
      'Cloud migration strategies and architecture design',
      'Data pipelines and ETL engineering',
      'Data warehousing and lake infrastructure',
      'Analytics and BI platforms for enterprise decision-making'
    ],
    tags: ['Cloud', 'Data', 'Analytics', 'Pipelines'],
  },
  {
    cat: 'Product Engineering',
    title: 'Build modular, secure digital products',
    desc: 'Design and deliver digital products that are secure, usable, and built for scale across fintech, industrial, and life sciences domains.',
    points: [
      'End-to-end product design and development',
      'Microservices and API architecture',
      'User-centric experience engineering',
      'Quality-driven release and deployment practices'
    ],
    tags: ['UX', 'APIs', 'Microservices', 'Quality'],
  },
];

// Building Management Services Data
const buildingServices = [
  {
    cat: 'Building Management System (BMS)',
    title: 'Your building already generates data. We make it intelligent.',
    desc: 'Our Building Management System (BMS) service integrates and optimizes all core building systems HVAC, energy, lighting, and utilities into a unified control layer. We work with existing infrastructure (Siemens, Honeywell, Schneider, BACnet, Modbus, etc.) without requiring costly replacements.',
    points: [
      'End-to-end BMS integration and modernization',
      'HVAC and energy system optimization',
      'Multi-vendor protocol integration',
      'Centralized monitoring and control dashboards',
      'Seamless integration with cloud and enterprise systems'
    ],
    tags: ['BMS', 'HVAC', 'IoT', 'Energy'],
    businessImpact: '20-30% reduction in energy costs, Centralized control across sites, Improved asset lifecycle',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'Facility Management System (FMS)',
    title: 'From reactive operations to intelligent facility management.',
    desc: 'Our Facility Management System (FMS) digitizes and automates day-to-day facility operations turning manual workflows into structured, trackable, and optimized processes. We combine BMS data, operational workflows, and ITSM capabilities into a single platform.',
    points: [
      'Digital work order and ticketing system',
      'Preventive and predictive maintenance scheduling',
      'SLA tracking and vendor management',
      'Asset lifecycle and maintenance history tracking',
      'Role-based dashboards for facility, IT, and leadership teams'
    ],
    tags: ['FMS', 'Maintenance', 'SLA', 'Automation'],
    businessImpact: '3-5× reduction in emergency maintenance costs, Improved SLA compliance, Higher operational efficiency',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf36?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'Fault Detection & Diagnostics (FDD)',
    title: 'Detect problems before they become failures.',
    desc: 'Our Fault Detection & Diagnostics (FDD) service uses AI and advanced analytics to continuously monitor building systems and identify anomalies in real time. Instead of reacting to breakdowns, we enable predictive maintenance.',
    points: [
      'AI-based anomaly detection across HVAC, energy, and equipment',
      'Early fault detection (2-4 weeks in advance)',
      'Root cause analysis and automated diagnostics',
      'Real-time alerts with prioritization and severity scoring',
      'Integration with ticketing and maintenance workflows'
    ],
    tags: ['AI', 'FDD', 'Predictive', 'Analytics'],
    businessImpact: 'Up to 70% reduction in unplanned downtime, Significant savings on repair costs, Increased reliability',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'Connected Data & Analytics (CDA)',
    title: 'Turn building data into actionable intelligence.',
    desc: 'Modern buildings generate massive amounts of data but most of it goes unused. Our Connected Data & Analytics (CDA) service creates a unified data layer across all systems and applies AI/ML to unlock real business value.',
    points: [
      'Unified data platform integrating BMS, IoT, IT, and security systems',
      'Real-time dashboards and KPI tracking',
      'AI-driven energy optimization and usage analytics',
      'ESG, compliance, and audit-ready reporting',
      'Predictive insights for operations and capacity planning'
    ],
    tags: ['Analytics', 'AI', 'ESG', 'Data'],
    businessImpact: 'Data-driven decision making, Automated compliance (ESG, DPDP, SOC2), Continuous optimization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  }
];



// 3D Apple-Style Perspective Hover Card Component
const ServiceCard3D = ({ service, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Tighter clamp for realistic subtle rotation
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="service-detail-card-wrap"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.article 
        className="service-detail-card"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="service-detail-badge badge-blue">{service.cat}</div>
        <h2>{service.title}</h2>
        <p className="body-text">{service.desc}</p>
        <ul className="service-detail-list">
          {service.points.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="service-detail-footer">
          <span>Core focus:</span>
          <div className="service-detail-tags">
            {service.tags.map(tag => (
              <span key={tag} className="service-detail-tag">{tag}</span>
            ))}
          </div>
          {service.businessImpact && (
            <div className="service-impact">
              <span className="impact-label">Business impact:</span>
              <p className="impact-text">{service.businessImpact}</p>
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
};

// Building Service Card Component
const BuildingServiceCard = ({ service, idx }) => {
  return (
    <div className="building-service-card">
      {/* Image */}
      <div className="service-image-container">
        <img
          src={service.image}
          alt={service.cat}
        />
        <div className="service-number-badge">
          {idx + 1}
        </div>
      </div>
      
      {/* Content */}
      <div className="service-content">
        {/* Category */}
        <div className="service-category">
          {service.cat}
        </div>
        
        {/* Title */}
        <h3 className="service-title">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="service-description">
          {service.desc}
        </p>
        
        {/* Features */}
        <div className="service-features">
          <h4 className="service-features-title">Key Features</h4>
          <ul className="service-features-list">
            {service.points.slice(0, 3).map((point, pointIdx) => (
              <li key={pointIdx}>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Business Impact */}
        <div className="service-impact">
          <div className="service-impact-header">
            <div className="service-impact-icon">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="service-impact-title">Business Impact</span>
          </div>
          <p className="service-impact-text">{service.businessImpact}</p>
        </div>
      </div>
      
      {/* Tags */}
      <div className="service-tags">
        {service.tags.map((tag, tagIdx) => (
          <span key={tagIdx} className="service-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Add comprehensive custom styles for Services page
const customStyles = `
  /* Building Services Section */
  .building-services-section {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 80px 0;
    position: relative;
  }
  
  .building-services-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
  }
  
  .building-services-header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .building-services-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
  
  .building-services-title {
    font-size: 48px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 20px;
    line-height: 1.1;
  }
  
  .building-services-subtitle {
    font-size: 20px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Building Service Cards */
  .building-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .building-service-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    border: 1px solid rgba(226, 232, 240, 0.8);
  }
  
  .building-service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: #3b82f6;
  }
  
  .building-service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .building-service-card:hover::before {
    opacity: 1;
  }
  
  .service-image-container {
    position: relative;
    height: 240px;
    overflow: hidden;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  }
  
  .service-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .building-service-card:hover .service-image-container img {
    transform: scale(1.08);
  }
  
  .service-number-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    border: 3px solid white;
  }
  
  .service-content {
    padding: 32px;
  }
  
  .service-category {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(59, 130, 246, 0.1);
    color: #1e40af;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 16px;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  
  .service-title {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 16px;
    line-height: 1.3;
  }
  
  .service-description {
    color: #64748b;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .service-features {
    margin-bottom: 24px;
  }
  
  .service-features-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .service-features-title::before {
    content: '';
    width: 4px;
    height: 16px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 2px;
  }
  
  .service-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .service-features-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
  }
  
  .service-features-list li::before {
    content: '';
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 50%;
    margin-top: 2px;
    position: relative;
  }
  
  .service-features-list li::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    top: 7px;
    left: 7px;
  }
  
  .service-impact {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }
  
  .service-impact-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  
  .service-impact-icon {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .service-impact-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }
  
  .service-impact-text {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
  }
  
  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .service-tag {
    padding: 6px 12px;
    background: #f8fafc;
    color: #475569;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }
  
  .service-tag:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .building-services-section {
      padding: 60px 0;
    }
    
    .building-services-title {
      font-size: 36px;
    }
    
    .building-services-subtitle {
      font-size: 18px;
    }
    
    .building-services-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .service-image-container {
      height: 200px;
    }
    
    .service-content {
      padding: 24px;
    }
    
    .service-title {
      font-size: 20px;
    }
    
    .service-number-badge {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }
  }
  
  @media (max-width: 640px) {
    .building-services-section {
      padding: 40px 0;
    }
    
    .building-services-title {
      font-size: 28px;
    }
    
    .building-services-subtitle {
      font-size: 16px;
    }
    
    .service-image-container {
      height: 180px;
    }
    
    .service-content {
      padding: 20px;
    }
    
    .service-title {
      font-size: 18px;
    }
    
    .service-number-badge {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
  }
`;

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Inject custom styles
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <section className="services-page-hero">
          <div className="services-hero-bg" />
          <div className="container relative z-10">
            <div className="services-header" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div 
                className="eyebrow amber no-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ zIndex: 10, justifyContent: 'center' }}
              >
                SOFTWARE SERVICES
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ color: '#fff', fontSize: 'clamp(40px, 6vw, 70px)', marginBottom: '20px' }}
              >
                Our Services And Works
              </motion.h1>
              <motion.p 
                className="services-sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'clamp(18px, 2vw, 22px)', margin: '0 auto 32px' }}
              >
                Modernizing processes and building scalable digital systems for enterprise, industrial, and pharma operations.
              </motion.p>
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* <Link to="/contact" className="btn btn-yellow">Talk to an expert</Link> */}
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <ParticleBackground />
          </div>
        </section>

        <section className="service-detail-section section-padding" style={{ background: '#fff' }}>
          <div className="container">
            <div className="services-header" style={{ marginBottom: '64px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
                Enterprise Digital Solutions
              </h2>
              <p style={{ color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
                Specialized software engineering for complex industrial and financial ecosystems.
              </p>
            </div>
            <div className="services-page-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, idx) => (
                <ServiceCard3D key={idx} service={service} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Building Management Services Section */}
        <section className="building-services-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="building-services-header">
              <div className="building-services-badge">
                Building Solutions
              </div>
              <h2 className="building-services-title">
                Building Management Solutions
              </h2>
              <p className="building-services-subtitle">
                Comprehensive solutions to optimize, monitor, and transform your building operations with cutting-edge technology.
              </p>
            </div>
            
            {/* Building Services Grid */}
            <div className="building-services-grid">
              {buildingServices.map((service, idx) => (
                <BuildingServiceCard 
                  key={idx} 
                  service={service} 
                  idx={idx} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Software Services Cards Section */}
        <section className="relative py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          {/* Section Header */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-6">
                <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
                  Software Solutions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our Software Services
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Comprehensive digital solutions to transform your business operations and drive growth across enterprise, industrial, and pharma sectors.
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="services-page-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, idx) => (
                <ServiceCard3D key={idx} service={service} idx={idx} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span className="font-semibold">Ready to transform your business?</span>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;