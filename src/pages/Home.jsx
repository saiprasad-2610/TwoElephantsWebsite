import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronRight,
  Globe,
  Layers,
  Cpu,
  Database,
  Shield,
  Zap,
  Github,
  Youtube,
  Clock,
  X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { articles } from '../data/articles';

import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';
import '../styles/team.css';

const MotionLink = motion(Link);

import ElephantModel3D from '../components/ElephantModel3D';

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



// Temporary fallbacks for moved assets
const abhiImg = Abhi;
const auImg = Au;
const sapnaImg = Sapna;
const pankajImg = pankaj;
const ptImg = prashant1;
const saurabhImg = saurabh;
const prashantBolluImg = prashant_bollu;
const arpitaImg = arpita;




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
              <a href="#story" className="btn btn-primary">
                Explore Our Story <ArrowRight size={18} />
              </a>
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
                maxWidth: '600px',
                height: '480px',
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
                    maxWidth: '420px',
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
                style={{ position: 'relative', zIndex: 20, marginTop: '-40px' }}
              >
                <div className="slogan-top">TWO ELEPHANTS TECHNOLOGIES LLP</div>
                <div className="slogan-bottom">
                  One Promise: <span className="s-amber">Strength</span> <span className="slogan-bottom">Care</span> <span className="s-amber">Honesty</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="legacy-badge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              style={{ right: '5%', bottom: '10%', left: 'auto' }}
            >
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
  const { scrollYProgress } = useScroll();
  const timelineScale = useSpring(useTransform(scrollYProgress, [0.15, 0.45], [0, 1]), {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const milestones = [
    {
      year: "1959",
      title: "Pushpa Textile Founded",
      desc: "The Rathi family begins a legacy of manufacturing precision in Solapur.",
      icon: "🏭",
      color: "#4da8ff",
      glow: "rgba(77,168,255,0.3)"
    },
    {
      year: "1980",
      title: "Global Expansion",
      desc: "Becoming a trusted supplier for national brands like IndiGo and Maruti Suzuki.",
      icon: "🌐",
      color: "#cf0d0dff",
      glow: "rgba(248,204,28,0.3)"
    },
    {
      year: "2026",
      title: "Two Elephants Technologies LLP",
      desc: "Transitioning industrial wisdom into enterprise-grade technology solutions.",
      icon: "🚀",
      color: "#7c3aed",
      glow: "rgba(124,58,237,0.3)"
    }
  ];

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
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85"
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
                <span className="card-year">1959</span>
                <span className="card-text">Legacy Begins</span>
              </motion.div>
              <motion.img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85"
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
              whileHover={{ borderLeftWidth: "8px", paddingLeft: "36px", color: '#f8cc1c' }}
              transition2={{ duration: 0.3 }}
            >
              "We didn't move into technology. We extended who we already were."
            </motion.blockquote>
            <Link to="/contact" className="text-link">Partner with us <ArrowRight size={16} /></Link>
          </motion.div>
        </div>

        {/* ══════════ COMPACT HORIZONTAL TIMELINE ══════════ */}
        <div className="htl-wrap">
          <div className="htl-header">
            <div className="eyebrow amber">MILESTONES</div>
            <h3>From textile heritage to enterprise-scale technology.</h3>
          </div>

          <div className="htl-track">
            {/* Animated progress line */}
            <motion.div
              className="htl-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="htl-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Dot on the line */}
                <motion.div
                  className="htl-dot"
                  style={{ background: m.color, boxShadow: `0 0 0 6px ${m.glow}` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.25 + 0.4, type: 'spring', stiffness: 300 }}
                />

                {/* Card */}
                <motion.div
                  className="htl-card"
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className="htl-icon" style={{ background: m.glow }}>
                    <span>{m.icon}</span>
                  </div>
                  <div className="htl-year" style={{ color: m.color }}>{m.year}</div>
                  <h4 className="htl-title">{m.title}</h4>
                  <p className="htl-desc">{m.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="htl-footer">
            <Link to="/contact" className="btn btn-primary">Talk to our team</Link>
          </div>
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
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&q=80"
    },
    {
      title: "Industrial Technology for Energy Operations",
      desc: "IIoT platforms for remote asset monitoring and predictive maintenance systems.",
      cat: "OIL & GAS",
      tags: ["IIoT", "Maintenance", "SCADA"],
      color: "amber",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80"
    },
    {
      title: "Compliance-First Technology for Pharma",
      desc: "GMP-compliant quality management systems and FDA regulatory documentation.",
      cat: "PHARMACEUTICALS",
      tags: ["GMP", "FDA", "Serialization"],
      color: "emerald",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&q=80"
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
        <div className="services-stack-container">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              className="sticky-card-wrapper"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                position: 'sticky',
                top: `${120 + idx * 12}px`,
                marginBottom: '40px',
                zIndex: idx + 1
              }}
            >
              <motion.div
                className="service-card-stack"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`svc-card-inner acc-${svc.color}`}>
                  <div className="svc-content">
                    <span className="svc-cat">{svc.cat}</span>
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                    <div className="svc-tags">
                      {svc.tags.map(tag => <span key={tag} className="s-tag">{tag}</span>)}
                    </div>
                    <div className={`svc-link svc-link-${svc.color}`} onClick={() => window.location.href = '/services'}>
                      Explore Solutions <ChevronRight size={18} />
                    </div>
                  </div>
                  <div className="svc-visual">
                    <img src={svc.img} alt={svc.title} />
                    <div className="svc-glaze"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const TeamMember = ({ name, role, img, delay, onClick }) => {
  return (
    <motion.div
      className="team-card-enhanced"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.08, duration: 0.6 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="team-card-inner">
        <div className="team-image-container">
          <img src={img} alt={name} className="team-img" />
        </div>
        <div className="team-info">
          <span className="team-role-tag">{role}</span>
          <h3 className="team-name">{name}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const TeamModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <motion.div
      className="team-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="team-modal-content"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={24} /></button>

        <div className="modal-body">
          <div className="modal-image-wrap">
            <img src={member.img} alt={member.name} className="modal-img" />
          </div>

          <div className="modal-text">
            <div className="eyebrow amber no-line">TEAM MEMBER</div>
            <h2 className="modal-name">{member.name}</h2>
            <div className="modal-role">{member.role}</div>
            <div className="modal-divider"></div>
            <p className="modal-bio">{member.bio}</p>

            <div className="modal-social-inline">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="m-social-btn linkedin-btn"><Linkedin size={20} fill="currentColor" className="brand-fill" /></a>
              <a href="#" className="m-social-btn twitter-btn"><Twitter size={20} fill="currentColor" className="brand-fill" /></a>
              <a href="#" className="m-social-btn mail-btn"><Mail size={20} strokeWidth={2.5} /></a>
            </div>

            <div className="modal-stats">
              <div className="m-stat">
                <span className="m-stat-label">Expertise</span>
                <span className="m-stat-val">Enterprise IT</span>
              </div>
              <div className="m-stat">
                <span className="m-stat-label">Location</span>
                <span className="m-stat-val">Solapur / Global</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const members = [
    {
      name: "Prashant Rathi",
      role: "Co-Founder & CEO",
      img: ptImg,
      bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textile. Prashant leads the strategic direction of Two Elephants Technologies LLP, bridging traditional business values with modern technological needs.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    },
    {
      name: "Anuradha Biswas",
      role: "Advisor & Mentor",
      img: auImg,
      bio: "20+ years of leadership at Infosys, VeriFone, and CA Technologies. Architect of global delivery units. Anuradha brings deep industry knowledge in building and scaling high-performance engineering teams.",
      linkedin: "https://www.linkedin.com/in/anubiswas/"
    },
    {
      name: "Abhik Biswas",
      role: "Technology Advisor",
      img: abhiImg,
      bio: "30+ years of engineering leadership at TCS, Cisco, and VeriFone. Expert in large-scale systems. Abhik provides technical guidance for complex enterprise architectures and innovative software solutions.",
      linkedin: "https://www.linkedin.com/in/abhik/"
    },
    {
      name: "Sapna Rathi",
      role: "Co-Founder",
      img: sapnaImg,
      bio: "Specialist in operational governance and process architecture. Expert in ISO frameworks. Sapna ensures the operational excellence and quality standards that our enterprise clients depend on.",
      linkedin: "https://www.linkedin.com/in/sapna-rathi-44928b3b/"
    },
    {
      name: "Pankaj Rathi",
      role: "Overseas Operations",
      img: pankajImg,
      bio: "Based in Houston, Texas. Leads global shipping and logistics for enterprise clients. Pankaj manages our international presence and ensures seamless coordination for our global projects.",
      linkedin: "https://www.linkedin.com/in/pankajsureshrathi/"
    },
    {
      name: "Saurabh Kulkarni",
      role: "Tech Lead - Cyber Security",
      img: saurabhImg,
      bio: "An Information Security and Compliance professional focused on audits, data security, and governance. Drives strong security practices, ensures regulatory alignment, and builds resilient, audit-ready systems in collaboration with global teams.",
      // linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    }, {
      name: "Prashant Bollu",
      role: "...",
      img: prashantBolluImg,
      bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textile. Prashant leads the strategic direction of Two Elephants, bridging traditional business values with modern technological needs.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
    },
    {
      name: "Arpita Kulkarni",
      role: "...",
      img: arpitaImg,
      bio: "Operations and technology professional focused on optimizing processes, driving strategic initiatives, and delivering enterprise solutions. Bridges business and technology to enhance efficiency, lead teams, and create scalable, high-impact outcomes.",
      linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/"
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
          {members.map((member, idx) => (
            <TeamMember
              key={idx}
              {...member}
              delay={idx}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Insights = () => {
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
        <motion.div
          className="insights-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.18 }}
        >
          {articles.map((article, idx) => (
            <MotionLink
              key={idx}
              to={`/insights/${article.id}`}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10 }}
            >
              <div className="blog-img-wrap">
                <img src={article.img} alt={article.title} className="blog-img" />
                <div className="blog-overlay-info">
                  <span>{article.readTime}</span>
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
        <SectionReveal><Insights /></SectionReveal>

        {/* Unified CTA */}
        <SectionReveal>
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
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
