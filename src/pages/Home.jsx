
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  ArrowRight,
  ExternalLink,
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronRight,
  Layers,
  Cpu,
  Database,
  Shield,
  Zap,
  Clock,
  X
} from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';
import '../styles/team.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `http://localhost:8000${url}`;
};

const MotionLink = motion(Link);

// Import images
import logo from '../assets/images/logo1.svg';
import prashant1 from '../assets/images/prashant1.png'
import pankaj from '../assets/images/pankaj.png'
import Abhi from '../assets/images/Abhi.png'
import Au from '../assets/images/Au.png'
import Sapna from '../assets/images/Sapna.png'
import saurabh from '../assets/images/saurabh1.png'
import prashant_bollu from '../assets/images/prashant_bollu.jpeg'
import arpita from '../assets/images/arpita.jpg'
import looms from '../assets/images/looms.jpg';
import labs from '../assets/images/labs.jpg';

// Temporary fallbacks for moved assets
const abhiImg = Abhi;
const auImg = Au;
const sapnaImg = Sapna;
const pankajImg = pankaj;
const ptImg = prashant1;
const saurabhImg = saurabh;
const prashantBolluImg = prashant_bollu;
const arpitaImg = arpita;
const labsImg = labs;
const loomsImg = looms;


// HeroFallback removed - using enhanced dual elephant system


const Hero = () => {
  const [text, setText] = useState('');
  const phrases = [
    "Built from 65 years of real-world industrial trust.",
    "From Solapur to the Global Market.",
    "Enterprise-grade technology for high-stakes industries."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const typing = setInterval(() => {
      if (i < phrases[index].length) {
        currentText += phrases[index][i];
        setText(currentText);
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setIndex((index + 1) % phrases.length);
        }, 2000);
      }
    }, 50);
    return () => clearInterval(typing);
  }, [index]);

  return (
    <section className="hero" id="home">
      <ParticleBackground />
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="eyebrow">SOLAPUR · MAHARASHTRA · EST. 2026</div>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              From <i>Looms</i> <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >to <i>Labs.</i></motion.span>
            </motion.h1>
            <p className="hero-sub">
              The same family that mastered the precision of textile manufacturing for 65 years now builds the technology infrastructure that banks run on, oil fields depend on, and pharmaceutical supply chains trust.
            </p>
            <div className="typewriter-container typewriter-enhanced">
              <div className="typewriter-text">{text}</div>
              <span className="typewriter-cursor">|</span>
            </div>
            <div className="hero-buttons">
              <Link to="/story" className="btn btn-primary">
                Explore Our Story <ArrowRight size={18} />
              </Link>
              <a href="#services" className="btn btn-outline">
                Our Services
              </a>
            </div>
            <div className="hero-badges">
              <span className="badge">BFSI · Oil & Gas · Pharma</span>
              <span className="badge">India · USA · Middle East</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual md:w-[500px] md:h-[500px] flex flex-col items-center justify-center relative mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >


            <motion.div
              className="hero-logo-wrapper"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 'min(100%, 600px)',
                height: 'clamp(300px, 62vw, 480px)',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.img
                  src={logo}
                  alt="Two Elephants"
                  className="hero-svg hero-logo hero-logo-cropped animate-logo-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    width: '100%',
                    maxWidth: 'min(78vw, 420px)',
                    userSelect: 'none'
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 8
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  draggable={false}
                />
              </div>

              <motion.div
                className="hero-slogan slogan-shimmer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ position: 'relative', zIndex: 20, marginTop: 'clamp(-28px, -6vw, -16px)' }}
              >
                <div className="slogan-top">TWO ELEPHANTS TECHNOLOGIES LLP</div>
                <div className="slogan-bottom">
                  One Promise: <span className="s-amber">Strength</span> Care <span className="s-amber">Honesty</span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = [
    "IndiGo Airlines", "Akasa Air", "Raymond", "Jindal Steel & Power",
    "Jockey India", "Myntra", "Maruti Suzuki", "MG Motors", "Oil & Gas Clients (USA)",
    "Serving India", "United States", "Middle East"
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-label">65 YEARS OF RELATIONSHIPS — AND COUNTING</div>
      <div className="marquee-container">
        <motion.div
          className="marquee-inner marquee-glow"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items, ...items].map((item, idx) => (
            <span key={idx} className="marquee-item">{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Counter = ({ value, label }) => {
  return (
    <div className="l-stat">
      <motion.span
        className="l-number"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.span>
      <span className="l-label">{label}</span>
    </div>
  );
};

const Story = () => {
  return (
    <section className="story-section section-padding" id="story">
      <div className="container">
        <div className="story-grid">
          <motion.div
            className="story-images"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="image-stack">
              <motion.img
                src={loomsImg}
                alt="Pushpa Textile"
                className="story-img-main"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
              <motion.div
                className="story-img-card card-legacy"
                animate={{ y: [0, -12, 0], boxShadow: ['0 8px 32px rgba(77,168,255,0.2)', '0 20px 48px rgba(77,168,255,0.4)', '0 8px 32px rgba(77,168,255,0.2)'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="card-year">1960</span>
                <span className="card-text">Legacy Begins</span>
              </motion.div>
              <motion.img
                src={labsImg}
                alt="Modern tech"
                className="story-img-fg"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06 }}
              />
              <motion.div
                className="story-img-card card-tech"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={16} color="var(--color-blue-glow)" />
                <span>Tech Evolution</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="story-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <motion.div
              className="eyebrow dark"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >OUR STORY</motion.div>
            <div className="section-rule visible"></div>
            <motion.h2
              className="h2-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              A Legacy That Earns Its <em>Next Chapter</em>
            </motion.h2>
            <motion.p
              className="body-text"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Every great technology company is built on something real. Ours is built on <strong>65 years of industrial trust.</strong>
            </motion.p>
            <motion.p
              className="body-text"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              The Rathi family — known in Solapur as "Do Haathi" (Two Elephants) — has mastered the art of precision over decades. Today, we bring that same uncompromising quality to the digital world.
            </motion.p>

            <div className="legacy-stats">
              <Counter value="65+" label="Years of Trust" />
              <Counter value="500+" label="Team Goal" />
              <Counter value="100%" label="Commitment" />
            </div>

            <motion.blockquote
              className="pull-quote"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ borderLeftWidth: "8px", paddingLeft: "36px", color: 'var(--color-blue-glow)' }}
            >
              "We didn't move into technology. We extended who we already were."
            </motion.blockquote>
            <Link to="/story" className="text-link">Explore More <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, desc, cat, tags, color, img, delay }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{
        y: -10,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.2 }
      }}
      onClick={() => navigate('/services')}
      style={{ perspective: 1000, cursor: 'pointer' }}
      role="link"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          navigate('/services');
        }
      }}
    >
      <div className={`svc-accent acc-${color}`}></div>
      <img src={img} alt={title} loading="lazy" />
      <div className="svc-overlay"></div>
      <div className="svc-body">
        <span className="svc-cat">{cat}</span>
        <h3 className="svc-title">{title}</h3>
        <p className="svc-desc">{desc}</p>
        <div className="svc-tags">
          {tags.map(tag => <span key={tag} className="s-tag">{tag}</span>)}
        </div>
        <div className={`svc-link svc-link-${color}`}>Explore Solutions <ChevronRight size={14} /></div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Banking, Financial Services & Insurance",
      desc: "KYC systems, AML compliance, core banking modernization, and RBI regulatory frameworks.",
      cat: "BFSI",
      tags: ["KYC", "Compliance", "Core Banking"],
      color: "blue",
      img: "https://www.mindinventory.com/blog/wp-content/uploads/2024/04/digital-transformation-banking.webp"
    },
    {
      title: "Industrial Technology for Energy Operations",
      desc: "IIoT platforms for remote asset monitoring and predictive maintenance systems.",
      cat: "OIL & GAS",
      tags: ["IIoT", "Maintenance", "SCADA"],
      color: "amber",
      img: "https://tse2.mm.bing.net/th/id/OIP.nlJXKjXI9gWDzqlmOXUA9wHaEK?pid=Api&P=0&h=220"
    },
    {
      title: "Compliance-First Technology for Pharma",
      desc: "GMP-compliant quality management systems and FDA regulatory documentation.",
      cat: "PHARMACEUTICALS",
      tags: ["GMP", "FDA", "Serialization"],
      color: "emerald",
      img: "https://thetechintel.com/wp-content/uploads/2025/08/Article-31-Overcoming-Pharmaceutical-Industry-Challenges-with-SAP-Business-One_-A-Guide-to-Compliance-and-Cost-Efficiency.jpg"
    }
  ];

  return (
    <section className="services-section section-padding" id="services" style={{ position: 'relative' }}>
      <div className="container">
        <div className="services-header">
          <div className="eyebrow dark">WHAT WE DO</div>
          <div className="section-rule visible"></div>
          <h2 className="h2-title">Enterprise Technology for <em>Demanding Industries</em></h2>
          <p className="services-sub">We build the systems that banks stake their reputation on and oil companies stake their operations on.</p>
        </div>
        <div className="insights-grid">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10 }}
              onClick={() => window.location.href = '/services'}
              style={{ cursor: 'pointer' }}
            >
              <div className="blog-img-wrap">
                <img src={svc.img} alt={svc.title} className="blog-img" />
                <div className="blog-overlay-info">
                  <span>{svc.cat}</span>
                </div>
              </div>
              <div className="blog-content">
                <span className="blog-cat" style={{ color: svc.color === 'blue' ? 'var(--color-blue-core)' : `var(--accent-${svc.color})` }}>{svc.cat}</span>
                <h3 className="blog-title">{svc.title}</h3>
                <p className="blog-excerpt">{svc.desc}</p>
                <div className="svc-tags" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  {svc.tags.map(tag => <span key={tag} className="s-tag" style={{ background: 'rgba(0,0,0,0.05)', color: '#475569', border: '1px solid rgba(0,0,0,0.08)' }}>{tag}</span>)}
                </div>
                <div className="blog-footer">
                  <span className="read-more">Explore Solutions <ArrowRight size={14} /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const TeamMember = ({ name, role, img, bio, linkedin, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="team-card-horizontal"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1, duration: 0.6 }}
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="team-card-aside">
          <div className="circle-image-container">
            <img src={img} alt={name} className="circle-img" loading="lazy" />
            <div className="circle-border-accent"></div>
          </div>
        </div>
        <div className="team-card-main">
          <div className="team-card-header">
            <div>
              <h3 className="circle-name">{name}</h3>
              <p className="circle-role">{role}</p>
            </div>
            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="circle-linkedin-link"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedin size={20} />
              </a>
            )}
          </div>
          <div className="circle-divider"></div>
          <p className="click-for-more">Click to read more <ArrowRight size={12} /></p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="team-modal-overlay" onClick={() => setIsOpen(false)}>
            <motion.div 
              className="team-modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
              
              <div className="modal-body">
                <div className="modal-aside">
                  <div className="modal-img-container">
                    <img src={img} alt={name} className="modal-img" />
                  </div>
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="modal-linkedin">
                      <FaLinkedin size={24} /> <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
                
                <div className="modal-main">
                  <h2 className="modal-name">{name}</h2>
                  <p className="modal-role">{role}</p>
                  <div className="modal-divider"></div>
                  <div className="modal-bio">
                    {bio.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Team = () => {
  const [showAll, setShowAll] = useState(false);
  
  const members = [
    {
      name: "Prashant Rathi",
      role: "Co-Founder & CEO",
      img: ptImg,
      bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textile. Prashant leads the strategic direction of Two Elephants Technologies LLP, bridging traditional business values with modern technological needs.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    },
    {
      name: "Sapna Rathi",
      role: "Co-Founder",
      img: sapnaImg,
      bio: "Specialist in operational governance and process architecture. Expert in ISO frameworks. Sapna ensures the operational excellence and quality standards that our enterprise clients depend on.",
      linkedin: "https://www.linkedin.com/in/sapna-rathi-44928b3b/"
    },
    {
      name: "Abhik Biswas",
      role: "Technology Advisor",
      img: abhiImg,
      bio: "30+ years of engineering leadership at TCS, Cisco, and VeriFone. Expert in large-scale systems. Abhik provides technical guidance for complex enterprise architectures and innovative software solutions.",
      linkedin: "https://www.linkedin.com/in/abhik/"
    },
    
    {
      name: "Anuradha Biswas",
      role: "Advisor & Mentor",
      img: auImg,
      bio: "20+ years of leadership at Infosys, VeriFone, and CA Technologies. Architect of global delivery units. Anuradha brings deep industry knowledge in building and scaling high-performance engineering teams.",
      linkedin: "https://www.linkedin.com/in/anubiswas/"
    },
    
    {
      name: "Pankaj Rathi",
      role: "Overseas Operations",
      img: pankajImg,
      bio: "Based in Houston, Texas. Leads global shipping and logistics for enterprise clients. Pankaj manages our international presence and ensures seamless coordination for our global projects.",
      linkedin: "https://www.linkedin.com/in/pankajsureshrathi/"
    },
    {
      name: "Arpita Kulkarni",
      role: "Technology Leader - Products & Services",
      img: arpitaImg,
      bio: "Operations and technology professional focused on optimizing processes, driving strategic initiatives, and delivering enterprise solutions. Bridges business and technology to enhance efficiency, lead teams, and create scalable, high-impact outcomes.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    },
    {
      name: "Prashant Bollu",
      role: "Technology Leader - Products & Services",
      img: prashantBolluImg,
      bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textile. Prashant leads the strategic direction of Two Elephants, bridging traditional business values with modern technological needs.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    },
    {
      name: "Saurabh Kulkarni",
      role: "Technology Leader - Cyber Security",
      img: saurabhImg,
      bio: "An Information Security and Compliance professional focused on audits, data security, and governance. Drives strong security practices, ensures regulatory alignment, and builds resilient, audit-ready systems in collaboration with global teams.",
      linkedin: "https://www.linkedin.com/in/saurabh-kulkarni-249a5726/"
    }
  ];

  return (
    <section className="team-section section-padding" id="team">
      <div className="container">
        <div className="services-header">
          <div className="eyebrow dark">OUR TEAM</div>
          <div className="section-rule visible"></div>
          <h2 className="h2-title">Leadership Rooted in <em>Legacy</em></h2>
          <p className="services-sub">Meet the visionaries bridging industrial wisdom with digital execution.</p>
        </div>

        <div className="team-grid-enhanced">
          {(showAll ? members : members.slice(0, 4)).map((member, idx) => (
            <TeamMember
              key={idx}
              {...member}
              delay={idx}
            />
          ))}
        </div>

        {members.length > 4 && (
          <div className="team-view-more">
            <button 
              className="view-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View Full Team"}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={18} />
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Insights = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <section className="insights-section section-padding" id="insights">
      <div className="container">
        <div className="services-header">
          <div className="eyebrow dark">FROM OUR DESK</div>
          <div className="section-rule visible"></div>
          <h2 className="h2-title">Thinking at the Intersection of <em>Industry</em></h2>
          <p className="services-sub">Deep dives into the technologies shaping the future of global enterprise.</p>
        </div>
        {articles && articles.length > 0 ? (
        <motion.div
          className="insights-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.18 }}
        >
          {articles.map((article, idx) => (
            <MotionLink
              key={article.id || idx}
              to={`/insights/${article.slug || article.id}`}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10 }}
            >
              <div className="blog-img-wrap">
                <img src={getImageUrl(article.img)} alt={article.title} className="blog-img" />
                <div className="blog-overlay-info">
                  <span>{article.read_time}</span>
                </div>
              </div>
              <div className="blog-content">
                <span className="blog-cat">{article.cat}</span>
                <h3 className="blog-title">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <div className="blog-footer">
                  <span className="read-more">Read Full Article <ArrowRight size={14} /></span>
                </div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
        ) : (
          <p className="text-center text-gray-500 py-12">No articles available at the moment.</p>
        )}
      </div>
    </section>
  );
};

const SectionReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/public/articles/`);
        setArticles(res.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="page-wrapper">
      <motion.div id="scroll-progress" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <SectionReveal><Story /></SectionReveal>
        <SectionReveal><Services /></SectionReveal>
        <SectionReveal><Team /></SectionReveal>
        <SectionReveal><Insights articles={articles} /></SectionReveal>

        {/* Unified CTA */}
        {/* <SectionReveal>
          <section className="cta-merged">
            <div className="cta-merged-bg" />
            <div className="container">
              <div className="cta-merged-grid">
                <div className="cta-merged-card">
                  <h2 className="cta-merged-title">Build Your Career Without Leaving Your City.</h2>
                  <p className="cta-merged-desc">We're building a 500-person engineering team in Solapur. Metro salaries. Your hometown.</p>
                  <div className="cta-merged-actions">
                    <Link to="/careers" className="btn btn-primary cta-join">
                      Join the Herd
                      <span className="cta-btn-arrow" aria-hidden="true">
                        <ArrowRight size={18} className="cta-btn-arrow-icon" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
