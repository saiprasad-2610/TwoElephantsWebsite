import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Heart, Award, Building2, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import loomsImg from '../assets/images/looms.jpg';
import labsImg from '../assets/images/labs.jpg';
import story from '../assets/images/story.png';

import '../styles/OurStory.css';
import logo1 from '../assets/images/logo1.svg';


const Counter = ({ value, label }) => {
  return (
    <div className="l-stat">
      <span className="l-number">{value}</span>
      <span className="l-label">{label}</span>
    </div>
  );
};

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    {
      year: "1960",
      title: "The Beginning",
      desc: "Pushpa Textiles founded in Solapur under Mr. Prashant Rathi — weaving values of trust and craftsmanship.",
      icon: "🏭",
      color: "#4da8ff",
      glow: "rgba(77,168,255,0.3)"
    },
    {
      year: "Global",
      title: "Global Trust",
      desc: "Earned partnerships with IndiGo, Akasa Air, Myntra, and international clients like the Sultanate of Brunei.",
      icon: "🌐",
      color: "#cf0d0dff",
      glow: "rgba(207,13,13,0.2)"
    },
    {
      year: "Texas",
      title: "Crossing Borders",
      desc: "Expanded into international logistics from Houston, Texas — led by Mr. Pankaj Rathi for the Oil & Gas sector.",
      icon: "🛳️",
      color: "#10b981",
      glow: "rgba(16,185,129,0.3)"
    },
    {
      year: "Today",
      title: "The Next Chapter",
      desc: "Two Elephants Technologies LLP is founded — bringing industrial principles into digital transformation.",
      icon: "🚀",
      color: "#7c3aed",
      glow: "rgba(124,58,237,0.3)"
    }
  ];

  const values = [
    {
      title: "Strength",
      desc: "Six decades of industrial backbone. We build systems that endure, and stand behind every solution we deliver.",
      icon: <Shield size={40} />,
      color: "var(--color-blue-core)"
    },
    {
      title: "Care",
      desc: "We take the time to understand how your business truly operates, before we build a single line of code.",
      icon: <Heart size={40} />,
      color: "#ef4444"
    },
    {
      title: "Honesty",
      desc: "Clear, practical advice. No unnecessary jargon. Quiet confidence, not loud claims. We say what we mean.",
      icon: <Award size={40} />,
      color: "var(--accent-amber)"
    },
    {
      title: "Domain Depth",
      desc: "We don't study your industry — we've lived in it. Our solutions are built from operational understanding first.",
      icon: <Building2 size={40} />,
      color: "#10b981"
    },
    {
      title: "Long-term Thinking",
      desc: "Relationships over transactions. We measure success in businesses that grow because of what we built.",
      icon: <Globe size={40} />,
      color: "#6366f1"
    },
    {
      title: "Guided Growth",
      desc: "We mentor as we build — supporting both our clients' evolution and the careers of our engineers.",
      icon: <Users size={40} />,
      color: "#f59e0b"
    }
  ];

  return (
    <div className="story-page">
      <Navbar />
      
      {/* Background ambient blue effect */}
      <div className="story-bg-glow" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <main className="story-main" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── HERO SECTION ── */}
        <section className="story-hero">
          <div className="story-hero-bg" />
          <div className="container relative z-10">
            <div className="story-hero-content">
              <motion.div 
                className="eyebrow amber no-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                OUR STORY
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                From threads to technology — <i>a legacy in motion.</i>
              </motion.h1>
              <motion.p 
                className="lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Every business begins with an idea. Ours began with a legacy.
              </motion.p>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <ParticleBackground />
          </div>
        </section>

        {/* ── CHAPTER 01: THE ORIGIN ── */}
        <section className="chapter-section section-padding">
          <div className="container">
            <div className="chapter-header">
              <span className="chapter-num">Chapter 01</span>
              <h2 className="chapter-title">The Origin</h2>
            </div>
            
            <div className="story-grid">
              <div className="story-images">
                <div className="image-stack">
                  <img src={story} alt="Pushpa Textile Heritage" className="story-img-main" />
                  <div className="story-img-card card-legacy">
                    <span className="card-year">1960</span>
                    <span className="card-text">Legacy Begins</span>
                  </div>
                  <img src={labsImg} alt="Modern Technology Labs" className="story-img-fg" />
                  <div className="story-img-card card-tech">
                    <Zap size={16} color="var(--color-blue-glow)" />
                    <span>Digital Era</span>
                  </div>
                </div>
              </div>

              <div className="story-content">
                <h3 className="h2-title">Six decades of building trust</h3>
                <p className="body-text">
                  For over sixty years, the Rathi family has built its foundation on something more enduring than products — trust, resilience, and an unwavering commitment to excellence. What began as a textile venture under the visionary leadership of Mr. Prashant Rathi became Pushpa Textiles — a name that became synonymous with quality across India and beyond.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  From the looms of Solapur to global markets, the journey has been one of constant evolution. Today, their advanced manufacturing units produce over 20,000 premium corporate products every month — each thread carrying a promise of precision, consistency, and pride.
                </p>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="htl-wrap">
              <div className="htl-track">
                <div className="htl-line"></div>
                {milestones.map((m, i) => (
                  <div key={i} className="htl-item">
                    <div className="htl-dot" style={{ background: m.color, boxShadow: `0 0 0 6px ${m.glow}` }}></div>
                    <div className="htl-card">
                      <div className="htl-icon" style={{ background: m.glow }}>
                        <span>{m.icon}</span>
                      </div>
                      <div className="htl-year" style={{ color: m.color }}>{m.year}</div>
                      <h4 className="htl-title">{m.title}</h4>
                      <p className="htl-desc">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 02: THE NAME ── */}
        <section className="chapter-section section-padding bg-light">
          <div className="container">
            <div className="chapter-header">
              <span className="chapter-num">Chapter 02</span>
              <h2 className="chapter-title">The Name</h2>
            </div>

            <div className="story-grid alt">
              <div className="story-content">
                <h3 className="h2-title">Why Two Elephants?</h3>
                <p className="body-text">
                  The name was never arbitrary. Elephants stand for wisdom, strength, and reliability — values woven into every decision the Rathi family has made over generations.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  Two elephants represent something more specific: the partnership between tradition and innovation, between experience and agility, between a legacy built over decades and a future being shaped today.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  In our logo, the mother elephant embodies authority, experience, and protection — the six decades of industrial wisdom we carry forward. The baby elephant represents growth, learning, and possibility — the digital future we are helping businesses step into.
                </p>
                
                <blockquote className="pull-quote">
                  "This isn't just a new venture. It is a continuation of a story — one built over generations and now ready to shape the future."
                </blockquote>
                
                <p className="body-text">
                  Together, they are a symbol of guided growth — the kind of mentorship and long-term thinking that defines how we work with every client, every engineer, every partner we bring into our ecosystem.
                </p>
              </div>
              
              <div className="name-visual" style={{ position: 'relative' }}>
                {/* Additional localized blue glow */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '600px',
                  height: '600px',
                  background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: -1
                }} />
                
                 <motion.div 
                    className="elephant-emblem-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                 >
                    <img src= {logo1} alt="Two Elephants Logo" className="large-emblem" />
                    <motion.div 
                      className="emblem-label"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Guided Growth
                    </motion.div>
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 03: OUR PURPOSE ── */}
        <section className="chapter-section section-padding">
          <div className="container">
            <div className="chapter-header">
              <span className="chapter-num">Chapter 03</span>
              <h2 className="chapter-title">Our Purpose</h2>
            </div>

            <div className="purpose-grid">
              <div className="purpose-block">
                <h3 className="h3-title blue-accent">Technology that understands business</h3>
                <p className="body-text">
                  Businesses today are surrounded by technology — yet many still struggle to find solutions that truly understand how they operate. Especially for small and mid-sized enterprises, technology is often too generic, built without the ground-level insight needed to align with real workflows and growth realities.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  At Two Elephants Technologies, we see this as an opportunity to build differently. We believe technology should not just be advanced — it should be relevant, practical, and deeply aligned with the way businesses actually function.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  With leadership grounded in real entrepreneurial experience and a team shaped by expertise from leading technology organisations, we deliver solutions that businesses can truly rely on — from cybersecurity and ERP systems to digital platforms and intelligent automation.
                </p>
              </div>

              <div className="purpose-block">
                <h3 className="h3-title amber-accent">Creating opportunity, close to home</h3>
                <p className="body-text">
                  Every year, thousands of capable engineers graduate from Solapur — full of ambition, skill, and potential. Yet many are forced to leave in search of the right opportunities, not because the talent is lacking, but because the ecosystem around them hasn't evolved fast enough.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  We believe this can change. We are deeply committed to strengthening the talent ecosystem in Solapur — creating careers where skilled individuals can work on real-world problems, contribute to global solutions, and build meaningful livelihoods without leaving their roots behind.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  We are not just building a company. We are building a platform where businesses evolve and talent thrives — together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 04: WHAT WE STAND FOR ── */}
        <section className="chapter-section section-padding bg-dark">
          <div className="container">
            <div className="chapter-header light">
              <span className="chapter-num">Chapter 04</span>
              <h2 className="chapter-title">What We Stand For</h2>
                <h3 className="chapter-title">Principles carried across generations</h3>
          
            </div>

           
            <div className="principles-grid">
              {values.map((v, i) => (
                <motion.div 
                  key={i} 
                  className="principle-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="principle-icon" style={{ color: v.color }}>{v.icon}</div>
                  <div className="principle-info">
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CLOSING ── */}
        <section className="closing-section section-padding">
          <div className="container">
            <div className="eyebrow amber no-line">FROM LEGACY TO TECHNOLOGY</div>
            <h2 className="h2-title">From trust to transformation.</h2>
            <p className="body-text">
              This is who we are. This is what we carry forward.
            </p>
            
            <div className="promise-line">
               <span>Strength</span>
               <span className="dot"></span>
               <span>Care</span>
               <span className="dot"></span>
               <span>Honesty</span>
            </div>
            <div className="closing-actions">
              <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
              <Link to="/careers" className="btn btn-primary">Join the Team</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
