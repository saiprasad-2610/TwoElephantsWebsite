import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


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
    color: 'purple'
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
    color: 'emerald'
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
    color: 'cyan'
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
    color: 'cyan'
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
    color: 'amber'
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
    color: 'blue'
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
    color: 'teal'
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
    color: 'amber'
  },
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
        <div className={`service-detail-badge badge-${service.color}`}>{service.cat}</div>
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

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <section className="services-page-hero section-padding">
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <motion.div 
              className="services-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow dark">SOFTWARE SERVICES</div>
              <div className="section-rule visible"></div>
              <motion.h1 
                className="h2-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Services And Works
              </motion.h1>
              <motion.p 
                className="services-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Modernizing processes and building scalable digital systems for enterprise, industrial, and pharma operations.
              </motion.p>
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/contact" className="btn btn-primary">Talk to an expert</Link>
              </motion.div>
            </motion.div>
            
            {/* Animated BG elements for Hero */}
            <motion.div 
              className="c-blob"
              animate={{ 
                x: [0, 50, 0], 
                y: [0, 30, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute', top: '-100px', right: '-10%', 
                width: '400px', height: '400px', 
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15), transparent 60%)', 
                zIndex: -1 
              }}
            />
            <motion.div 
              className="c-blob"
              animate={{ 
                x: [0, -50, 0], 
                y: [0, -40, 0] 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute', bottom: '-50px', left: '-10%', 
                width: '350px', height: '350px', 
                background: 'radial-gradient(circle, rgba(248, 204, 28, 0.1), transparent 60%)', 
                zIndex: -1 
              }}
            />
          </div>
        </section>

        <section className="service-detail-section section-padding">
          <div className="container">
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