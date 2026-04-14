import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import '../styles/careers.css';


// Import tech hero images for careers bento grid
import techHero1 from '../assets/images/tech_hero_1.png';
import techHero2 from '../assets/images/tech_hero_2.png';

const Careers = () => {
  const [activeRole, setActiveRole] = useState(0);
  
  const openings = [
    {
      title: "Python Developer",
      department: "Engineering",
      location: "📍 On-site / Internship",
      description: "Build the robust, scalable backend infrastructure that powers modern enterprise applications.",
      points: [
        "Strong knowledge of Python & backend development",
        "Experience with Django / Flask / FastAPI",
        "Database knowledge (PostgreSQL / MySQL)",
        "REST API development & integrations"
      ],
      link: "mailto:support@twoelephants.org?subject=Application - Python Developer"
    },
    {
      title: "AI / ML Intern",
      department: "AI & Research",
      location: "📍 On-site / Internship",
      description: "Help push the boundaries of intelligent systems, analyzing data and training powerful predictive models.",
      points: [
        "Basic understanding of Python & ML fundamentals",
        "Passion for AI, data & problem-solving",
        "Hands-on learning with real-world projects",
        "Mentorship from experienced engineers"
      ],
      link: "mailto:support@twoelephants.org?subject=Application - AI/ML Intern"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatingImg = (delay) => ({
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: [0, -8, 0],
      transition: {
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" }
      }
    }
  });

  const highlightItems = [
    {
      title: 'Collaborative Teams',
      description: 'Work with cross-functional teams on projects that impact real clients and global operations.',
      icon: '🤝'
    },
    {
      title: 'Growth & Learning',
      description: 'Get mentored by experienced leaders and build expertise across modern enterprise technologies.',
      icon: '📈'
    },
    {
      title: 'Impactful Delivery',
      description: 'Ship software that supports regulated industries and mission-critical businesses.',
      icon: '🚀'
    }
  ];

  const highlightCard = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.15 * i, duration: 0.6, ease: 'easeOut' }
    })
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className="career-page">
      <Navbar />

      {/* PREMIUM HERO SECTION */}
      <section className="career-hero-enhanced">
        <div className="career-hero-bg" />
        <div className="container relative z-10 hero-grid-layout">

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="eyebrow amber no-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              WE ARE HIRING
            </motion.div>
            <h1>
              Start Your Career <br />
              at <span className="text-amber">Two Elephants Technologies LLP</span>
            </h1>
            <p>
              Build your future with a team that values innovation,
              learning, and long-term growth. We create impact — together.
            </p>
            <div className="flex gap-4">
              <a href="#openings" className="btn-yellow">
                Explore Roles <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-bento-grid"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div className="bento-box bento-text-box" variants={item}>
              <div className="inner">
                 <h3 className="bento-num">65+</h3>
                 <p>Years of Industrial Legacy</p>
              </div>
            </motion.div>
            <motion.div className="bento-box bento-img-box" variants={item}>
              <img src={techHero1} alt="Technology workspace" />
              <div className="img-overlay"></div>
            </motion.div>
            <motion.div className="bento-box bento-img-box" variants={item}>
              <img src={techHero2} alt="Server infrastructure" />
              <div className="img-overlay"></div>
            </motion.div>
            <motion.div className="bento-box bento-text-box bento-dark" variants={item}>
              <div className="inner">
                 <h3 className="bento-num">100%</h3>
                 <p>Commitment to Excellence</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        <div className="absolute inset-0 pointer-events-none opacity-30">
          <ParticleBackground />
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow dark justify-center mb-6">THINKING AT SCALE</div>
              <h2 className="h2-title text-4xl mb-6">We move with <em>Strength</em> and execute with <em>Honesty</em>.</h2>
              <p className="body-text text-lg leading-relaxed text-slate-600">
                Two Elephants Technologies LLP is not just an IT company; it's a legacy of 65 years transitioning into the digital age.
                We are looking for engineers who want to build the infrastructure that tomorrow's global markets will depend on.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CULTURE HIGHLIGHTS SECTION */}
      <section className="career-highlights-section">
        <div className="container">
          <div className="highlights-intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="eyebrow dark justify-center mb-4">LIFE AT Two Elephants Technologies LLP</div>
              <h3 className="h2-title text-3xl">A career where impact, growth, and momentum meet.</h3>
            </motion.div>
          </div>

          <div className="highlight-cards-grid">
            {highlightItems.map((item, idx) => (
              <motion.article
                key={item.title}
                className="highlight-card"
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={highlightCard}
                whileHover={{ y: -10, scale: 1.01 }}
              >
                <div className="highlight-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* OPENINGS SECTION */}
      <section id="openings" className="openings-section">
        <div className="openings-container container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="h2-title text-4xl mb-4">Current Openings</h2>
              <p className="text-slate-600">
                Join our growing team in Solapur and work on cutting-edge solutions.<br />
                Send your resume to <a href="mailto:support@twoelephants.org" className="text-amber font-bold">support@twoelephants.org</a>
              </p>
            </motion.div>
          </div>

          <div className="openings-split-layout">
            {/* LEFT SIDE: JOB LIST */}
            <div className="os-left">
              {openings.map((role, idx) => (
                <div 
                  key={idx} 
                  className={`os-tab ${activeRole === idx ? 'active' : ''}`}
                  onMouseEnter={() => setActiveRole(idx)}
                >
                  <span className="os-tab-dept">{role.department}</span>
                  <div className="os-tab-bottom">
                    <h3 className="os-tab-title">{role.title}</h3>
                    <motion.div 
                      className="os-indicator"
                      animate={{ scale: activeRole === idx ? 1 : 0, opacity: activeRole === idx ? 1 : 0 }}
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: FAST DETAILS */}
            <div className="os-right">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeRole}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="os-detail-card"
                >
                  <div className="os-glow-blob"></div>
                  
                  <div className="os-detail-content">
                    <span className="os-detail-location">{openings[activeRole].location}</span>
                    <h2 className="os-detail-hero">{openings[activeRole].title}</h2>
                    <p className="os-detail-desc">{openings[activeRole].description}</p>
                    
                    <div className="os-rule"></div>
                    
                    <div className="os-requirements-label">What you'll bring:</div>
                    <ul className="os-detail-points">
                      {openings[activeRole].points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    
                    <a href={openings[activeRole].link} className="apply-btn-massive">
                      Submit Application <ArrowRight size={20} className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
