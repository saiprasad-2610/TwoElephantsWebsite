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

const detailedServices = [
  {
    id: 1,
    title: "Building Management System (BMS)",
    subtitle: "Your building already generates data. We make it intelligent.",
    description: "Our Building Management System (BMS) service integrates and optimizes all core building systems —HVAC, energy, lighting, and utilities—into a unified control layer. We work with existing infrastructure (Siemens, Honeywell, Schneider, BACnet, Modbus, etc.) without requiring costly replacements. By combining deep engineering expertise with modern cloud and IoT integration, we transform traditional BMS into a connected, scalable, and future-ready platform.",
    deliverables: [
      "End-to-end BMS integration and modernization",
      "HVAC and energy system optimization",
      "Multi-vendor protocol integration",
      "Centralized monitoring and control dashboards",
      "Seamless integration with cloud and enterprise systems"
    ],
    impact: [
      "20–30% reduction in energy costs",
      "Centralized control across single or multiple sites",
      "Improved asset lifecycle and operational efficiency"
    ],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    icon: <Zap className="w-6 h-6" />,
    color: "#F59E0B"
  },
  {
    id: 2,
    title: "Facility Management System (FMS)",
    subtitle: "From reactive operations to intelligent facility management.",
    description: "Our Facility Management System (FMS) digitizes and automates day-to-day facility operations— turning manual workflows into structured, trackable, and optimized processes. We combine BMS data, operational workflows, and ITSM capabilities into a single platform that empowers facility teams with real-time visibility and control.",
    deliverables: [
      "Digital work order and ticketing system",
      "Preventive and predictive maintenance scheduling",
      "SLA tracking and vendor management",
      "Asset lifecycle and maintenance history tracking",
      "Role-based dashboards for facility, IT, and leadership teams"
    ],
    impact: [
      "3–5× reduction in emergency maintenance costs",
      "Improved SLA compliance and audit readiness",
      "Higher operational efficiency with reduced manual effort"
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    icon: <Activity className="w-6 h-6" />,
    color: "#3B82F6"
  },
  {
    id: 3,
    title: "Fault Detection & Diagnostics (FDD)",
    subtitle: "Detect problems before they become failures.",
    description: "Our Fault Detection & Diagnostics (FDD) service uses AI and advanced analytics to continuously monitor building systems and identify anomalies in real time. Instead of reacting to breakdowns, we enable predictive maintenance—detecting issues weeks before failure and recommending corrective actions automatically.",
    deliverables: [
      "AI-based anomaly detection across HVAC, energy, and equipment",
      "Early fault detection (2–4 weeks in advance)",
      "Root cause analysis and automated diagnostics",
      "Real-time alerts with prioritization and severity scoring",
      "Integration with ticketing and maintenance workflows"
    ],
    impact: [
      "Up to 70% reduction in unplanned downtime",
      "Significant savings on repair and maintenance costs",
      "Increased reliability of critical infrastructure"
    ],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "#10B981"
  },
  {
    id: 4,
    title: "Connected Data & Analytics (CDA)",
    subtitle: "Turn building data into actionable intelligence.",
    description: "Modern buildings generate massive amounts of data—but most of it goes unused. Our Connected Data & Analytics (CDA) service creates a unified data layer across all systems and applies AI/ML to unlock real business value. We bridge the gap between raw data and decision-making—delivering insights that drive efficiency, compliance, and performance.",
    deliverables: [
      "Unified data platform integrating BMS, IoT, IT, and security systems",
      "Real-time dashboards and KPI tracking",
      "AI-driven energy optimization and usage analytics",
      "ESG, compliance, and audit-ready reporting",
      "Predictive insights for operations and capacity planning"
    ],
    impact: [
      "Data-driven decision making across operations",
      "Automated compliance (ESG, DPDP, SOC2, etc.)",
      "Continuous optimization through AI learning loops"
    ],
    image: "https://blog.datamatics.com/hubfs/Top%203%20use%20cases%20with%20Connected%20Data%20%26%20Analytics%2c%202022%20and%20beyond.jpg",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#8B5CF6"
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
        </div>
      </motion.article>
    </motion.div>
  );
};

// Detailed Service Component for the 4 specific services
const DetailedService = ({ service, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="detailed-service-item" style={{ 
      position: 'relative', 
      padding: 'clamp(40px, 6vw, 80px) 0',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
      background: isEven ? '#fff' : '#F8FAFC'
    }}>
      {/* Background ambient glow - more subtle for light mode */}
      <div 
        className="ambient-glow"
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          opacity: '0.05',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          borderRadius: '50%',
          background: service.color 
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="detailed-service-flex" style={{ 
          display: 'flex', 
          flexDirection: isEven ? 'row' : 'row-reverse', 
          alignItems: 'center', 
          gap: 'clamp(40px, 6vw, 80px)',
          flexWrap: 'wrap'
        }}>
          
          {/* Text Content Area */}
          <motion.div 
            className="detailed-service-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1', minWidth: '320px' }}
          >
            <div className="service-id-badge" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '6px 16px', 
              borderRadius: '99px', 
              background: 'rgba(15, 23, 42, 0.03)', 
              border: '1px solid rgba(15, 23, 42, 0.08)', 
              marginBottom: '16px' 
            }}>
              <span style={{ color: service.color }}>{service.icon}</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                color: 'rgba(15, 23, 42, 0.5)' 
              }}>
                Service 0{service.id}
              </span>
            </div>

            <h2 style={{ 
              fontSize: 'clamp(28px, 3.5vw, 42px)', 
              fontWeight: '700', 
              color: '#0F172A', 
              marginBottom: '16px', 
              lineHeight: '1.2' 
            }}>
              {service.title}
              <span style={{ 
                display: 'block', 
                fontSize: 'clamp(16px, 1.8vw, 20px)', 
                fontWeight: '500', 
                marginTop: '12px', 
                color: 'rgba(15, 23, 42, 0.5)', 
                lineHeight: '1.5' 
              }}>
                {service.subtitle}
              </span>
            </h2>

            <p style={{ 
              fontSize: '16px', 
              color: '#475569', 
              lineHeight: '1.7', 
              marginBottom: '24px', 
              maxWidth: '600px' 
            }}>
              {service.description}
            </p>

            <div className="service-details-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '24px' 
            }}>
              {/* Deliverables Column */}
              <div className="details-col">
                <h4 style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: '#0F172A', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginBottom: '16px' 
                }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: service.color }} />
                  What we deliver:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.deliverables.map((item, i) => (
                    <li key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '10px', 
                      marginBottom: '10px', 
                      fontSize: '13.5px', 
                      color: '#475569', 
                      lineHeight: '1.4' 
                    }}>
                      <ArrowRightCircle size={14} style={{ marginTop: '2px', color: service.color, opacity: 0.4 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Column */}
              <div className="details-col">
                <h4 style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: '#0F172A', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginBottom: '16px' 
                }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
                  Business impact:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.impact.map((item, i) => (
                    <li key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '10px', 
                      marginBottom: '10px', 
                      fontSize: '13.5px', 
                      color: '#475569', 
                      lineHeight: '1.4' 
                    }}>
                      <CheckCircle2 size={14} style={{ marginTop: '2px', color: '#10B981', opacity: 0.6 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Visual Area */}
          <motion.div 
            className="detailed-service-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ flex: '1', minWidth: '320px' }}
          >
            <div className="image-wrapper" style={{ position: 'relative' }}>
              {/* Decorative Frame */}
              <div style={{ 
                position: 'absolute', 
                inset: '-12px', 
                borderRadius: '32px', 
                border: '1px solid rgba(15, 23, 42, 0.05)', 
                background: `radial-gradient(circle at top left, ${service.color}05, transparent)` 
              }} />
              
              {/* Image Container */}
              <div style={{ 
                position: 'relative', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                aspectRatio: '4/3', 
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' 
              }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Decorative accents */}
              <div style={{ position: 'absolute', top: '-32px', right: '-32px', width: '64px', height: '64px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: '50%', filter: 'blur(24px)' }} />
              <div style={{ position: 'absolute', bottom: '-24px', left: '-24px', width: '48px', height: '48px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: '50%', filter: 'blur(16px)' }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
                style={{ color: '#fff', fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: '24px' }}
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

        {/* Detailed Services Section */}
        <section className="detailed-services-container" style={{ background: '#fff', position: 'relative' }}>
          <div className="container" style={{ paddingTop: '60px' }}>
            <motion.div 
              className="intelligence-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center', 
                marginBottom: '40px' 
              }}
            >
              <div style={{ height: '1px', width: '96px', background: 'rgba(59, 130, 246, 0.2)', marginBottom: '20px' }} />
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
                Industrial & Building Intelligence
              </h2>
              <p style={{ color: '#64748B', maxWidth: '600px', fontSize: '15px', lineHeight: '1.5' }}>
                Comprehensive solutions for optimizing infrastructure, enhancing operational efficiency, and driving data-led decisions.
              </p>
            </motion.div>
          </div>
          
          {detailedServices.map((service, idx) => (
            <DetailedService key={service.id} service={service} index={idx} />
          ))}
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
      </main>
      <Footer />
    </div>
  );
};

export default Services;