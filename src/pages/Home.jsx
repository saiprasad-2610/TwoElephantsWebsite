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
  X,
  ThumbsUp
} from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
// import { useEffect } from "react";
import { articles as defaultArticles } from '../data/articles';


import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';
import '../styles/team.css';
import '../styles/global.css';

const API_BASE = '';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return url;
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
import story from '../assets/images/story.png';
import labs from '../assets/images/labs.jpg';
import service1 from '../assets/images/service1.avif';

import service11 from '../assets/images/service11.jpg';
import service2 from '../assets/images/service2.jpg';
import service3 from '../assets/images/service3.jpg';



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
const storyImg = story;
const service1Img = service11;
const service2Img = service2;
const service3Img = service3;

// const service1 = service1;



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
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  draggable={false}
                />
              </div>

              <motion.div
                className="hero-slogan slogan-shimmer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ position: 'relative', zIndex: 20, marginTop: 'clamp(0px, 2vw, 10px)' }}
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
                src={storyImg}
                alt="Pushpa Textile"
                className="story-img-main"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
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
              A Legacy That Earns Its <span className="careerHead">Next Chapter</span>
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
              whileHover={{
                borderLeftWidth: "8px",
                paddingLeft: "36px",
                color: 'var(--color-blue-glow)',
                scale: 1.01,
                backgroundColor: 'rgba(77,168,255,0.05)',
                transition: { duration: 0.1, ease: "easeOut" }
              }}
            >
              "When people think of Solapur, they think of Looms. I want the next generation to think of Labs."
              <motion.div 
                className="quote-author "
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                style={{ 
                  fontWeight: '900', 
                  fontSize: '1.4rem', 
                  marginTop: '16px',
                  color: 'var(--color-dark)',
                  display: 'block'
                }}
                whileHover={{ 
                  color: 'var(--color-blue-core)',
                  x: 5,
                  scale: 1.05
                }}
              >
                — Prashant Rathi
              </motion.div>
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
      whileHover={{
        y: -10,
        rotateX: 2,
        rotateY: 2,
      }}
      transition={{ delay, duration: 0.1 }}
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
      img: service1Img
    },
    {
      title: "Industrial Technology for Energy Operations",
      desc: "IIoT platforms for remote asset monitoring and predictive maintenance systems.",
      cat: "OIL & GAS",
      tags: ["IIoT", "Maintenance", "SCADA"],
      color: "amber",
      img: service2Img
    },
    {
      title: "Compliance-First Technology for Pharma",
      desc: "GMP-compliant quality management systems and FDA regulatory documentation.",
      cat: "PHARMACEUTICALS",
      tags: ["GMP", "FDA", "Serialization"],
      color: "emerald",
      img: service3Img
    }
  ];

  return (
    <section className="services-section section-padding" id="services" style={{ position: 'relative' }}>
      <div className="container">
        <div className="services-header">
          <div className="eyebrow dark">WHAT WE DO</div>
          <div className="section-rule visible"></div>
          <h2 className="h2-title">Enterprise Technology for <span className="careerHead">Demanding Industries</span></h2>
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
              transition={{ delay: 0.1 * idx, duration: 0.2 }}
              whileHover={{ y: -8 }}
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


const TeamAccordion = ({ members, onMemberClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div 
      className="team-accordion-container" 
      onMouseLeave={() => setActiveIndex(null)}
    >
      {members.map((member, index) => (
        <motion.div
          key={index}
          layout
          className={`team-accordion-item ${activeIndex === index ? 'active' : ''}`}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => {
            if (activeIndex === index) {
              onMemberClick(member);
            } else {
              setActiveIndex(index);
            }
          }}
          transition={{
            layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
          }}
        >
          <div className="team-image-container">
            <img 
              src={member.img} 
              alt={member.name} 
              className="team-img" 
              style={{ objectPosition: member.position || 'center 10%' }}
            />
          </div>
          <div className="team-accordion-content">
            <span className="team-role-tag">{member.role}</span>
            <h3 className="team-name">{member.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TeamMobileScroll = ({ members, onMemberClick }) => {
  return (
    <div className="team-mobile-scroll-container">
      <div className="team-scroll-wrapper">
        {members.map((member, index) => (
          <motion.div 
            key={index} 
            className="team-scroll-card"
            onClick={() => onMemberClick(member)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="team-image-container">
              <img 
                src={member.img} 
                alt={member.name} 
                className="team-img" 
                style={{ objectPosition: member.position || 'center 10%' }}
              />
            </div>
            <div className="team-scroll-info">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role-tag">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="swipe-instructions">
        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Swipe Left/Right <ArrowRight size={16} />
      </div>
    </div>
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
            <img 
              src={member.img} 
              alt={member.name} 
              className="modal-img" 
              style={{ objectPosition: member.position || 'center 10%' }}
            /> 
          </div> 

          <div className="modal-text"> 
            <div className="eyebrow amber no-line">TEAM MEMBER</div> 
            <h2 className="modal-name">{member.name}</h2> 
            <div className="modal-role">{member.role}</div> 
            <div className="modal-divider"></div> 
            <p className="modal-bio">{member.bio}</p> 

            <div className="modal-social-inline"> 
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="m-social-btn linkedin-btn"><FaLinkedin size={20} /></a> 
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
      name: "Sapna Rathi", 
      role: "Co-Founder", 
      img: sapnaImg, 
      bio: "Specialist in operational governance and process architecture. Expert in ISO frameworks. Sapna ensures the operational excellence and quality standards that our enterprise clients depend on.", 
      linkedin: "https://www.linkedin.com/in/sapna-rathi-44928b3b/" 
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
      name: "Pankaj Rathi", 
      role: "Overseas Operations", 
      img: pankajImg, 
      bio: "Based in Houston, Texas. Leads global shipping and logistics for enterprise clients. Pankaj manages our international presence and ensures seamless coordination for our global projects.", 
      linkedin: "https://www.linkedin.com/in/pankajsureshrathi/" 
    }, 
    { 
      name: "Arpita Kulkarni", 
      role: "Technology Leader - IT Product and Services", 
      img: arpitaImg, 
      bio: "Operations and technology professional focused on optimizing processes, driving strategic initiatives, and delivering enterprise solutions. Bridges business and technology to enhance efficiency, lead teams, and create scalable, high-impact outcomes.", 
      linkedin: "https://www.linkedin.com/in/arpita-kulkarni/" 
    }, 
    // { 
    
    //   name: "Prashant Bollu", 
    //   role: "Technology Leader - IT Product and Services", 
    //   img: prashantBolluImg, 
    //   bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textile. Prashant leads the strategic direction of Two Elephants, bridging traditional business values with modern technological needs.", 
    //   linkedin: "https://www.linkedin.com/in/prashant-rathi-pr-28b26b7/" 
    // }, 

    { 
      name: "Saurabh Kulkarni", 
      role: "Technology Leader - Cyber Security", 
      img: saurabhImg, 
      bio: "An Information Security and Compliance professional focused on audits, data security, and governance. Drives strong security practices, ensures regulatory alignment, and builds resilient, audit-ready systems in collaboration with global teams.", 
      
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

        {/* Desktop View: Accordion */}
        <TeamAccordion members={members} onMemberClick={setSelectedMember} />

        {/* Mobile View: Horizontal Scroll */}
        <TeamMobileScroll members={members} onMemberClick={setSelectedMember} />

        {/* Modal */}
        <AnimatePresence> 
          {selectedMember && ( 
            <TeamModal 
              member={selectedMember} 
              onClose={() => setSelectedMember(null)} 
            /> 
          )} 
        </AnimatePresence> 
      </div> 
    </section> 
  ); 
}; 

const Insights = ({ articles }) => {
  const navigate = useNavigate();

  // Limit to only 3 articles on home page
  const limitedArticles = articles ? articles.slice(0, 3) : [];
  const hasMoreArticles = articles && articles.length > 3;

  

    return (
      <section className="insights-section section-padding" id="insights">
        <div className="container">
          <div className="services-header">
            <div className="eyebrow dark">FROM OUR DESK</div>
            <div className="section-rule visible"></div>
            <h2 className="h2-title">Thinking at the Intersection of <span className="careerHead">Industry</span></h2>
            <p className="services-sub">Deep dives into the technologies shaping the future of global enterprise.</p>
          </div>
          {limitedArticles && limitedArticles.length > 0 ? (
            <motion.div
              className="insights-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.18 }}
            >
              {limitedArticles.map((article, idx) => (
                <MotionLink
                  key={article.id || idx}
                  to={`/insights/${article.slug || article.id}`}
                  className="blog-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.2 }}
                  whileHover={{ y: -8 }}
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

          {/* Explore More Button */}
          {hasMoreArticles && (
            <div className="explore-more-container">
              <motion.button
                className="explore-more-btn"
                onClick={() => navigate('/insights')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More Articles
                <ThumbsUp size={16} />
              </motion.button>
            </div>
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
          // Sort articles by date descending (most recent first)
          const sortedArticles = (res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
          setArticles(sortedArticles);
        } catch (error) {
          console.error('Failed to fetch articles from backend, falling back to defaults:', error);
          // Fallback to default articles if backend is down
          const sortedDefaults = [...defaultArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
          setArticles(sortedDefaults);
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