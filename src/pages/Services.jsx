import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from "react";


const services = [
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
  {
    cat: 'Cybersecurity & Risk',
    title: 'Protect data and manage digital risk',
    desc: 'Keep sensitive systems safe through vulnerability assessments, compliance frameworks, and continuous monitoring tailored to enterprise needs.',
    points: [
      'Vulnerability and risk assessments',
      'Secure design and architecture reviews',
      'Compliance-driven security controls',
      'Continuous monitoring and incident readiness'
    ],
    tags: ['Security', 'Risk', 'Compliance', 'Monitoring'],
    color: 'emerald'
  },
  {
    cat: 'ERP Solutions',
    title: 'Strategic ERP for manufacturing',
    desc: 'Empower manufacturing and operations with integrated ERP systems that provide real-time insights, automation, and centralized control.',
    points: [
      'ERP integration for enterprise operations',
      'Automation of manufacturing workflows',
      'Inventory, order, and supply chain visibility',
      'Data-driven planning and execution'
    ],
    tags: ['ERP', 'Manufacturing', 'Automation', 'Insights'],
    color: 'purple'
  },
  {
    cat: 'AI & Data Solutions',
    title: 'Actionable insights and intelligent systems',
    desc: 'Use data science, AI, and automation to create transparent, trustworthy analytics and decision systems for business operations.',
    points: [
      'AI-driven analytics and predictions',
      'Data governance and trust frameworks',
      'Personalization and process intelligence',
      'Operational analytics for enterprise teams'
    ],
    tags: ['AI', 'Data', 'Analytics', 'Trust'],
    color: 'cyan'
  },
  {
    cat: 'Cognitive AI',
    title: 'AI-enabled intelligence for operations',
    desc: 'Deploy advanced cognitive solutions to automate processes, interpret data, and augment teams across complex enterprise workflows.',
    points: [
      'Intelligent automation for repetitive workflows',
      'Cognitive process orchestration',
      'Natural language and decision automation',
      'Data-driven operational intelligence'
    ],
    tags: ['Cognitive', 'Automation', 'NLP', 'Workflow'],
    color: 'teal'
  }
];



const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <section className="services-page-hero section-padding">
          <div className="container">
            <div className="services-header">
              <div className="eyebrow dark">SOFTWARE SERVICES</div>
              <div className="section-rule visible"></div>
              <h1 className="h2-title">Our Services And Works</h1>
              <p className="services-sub">
                Modernizing processes and building scalable digital systems for enterprise, industrial, and pharma operations.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="btn btn-primary">Talk to an expert</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="services-page-grid">
              {services.map((service, idx) => (
                <article key={idx} className="service-detail-card">
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
                </article>
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
