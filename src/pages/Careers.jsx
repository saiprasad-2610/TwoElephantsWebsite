import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import "./Careers.css";
import { useEffect } from "react";


// Import images from assets
// Temporary fallbacks for moved assets
import logo from '../assets/images/logo1.svg';
const abhiImg = logo;
const auImg = logo;
const sapnaImg = logo;
const pankajImg = logo;

const Careers = () => {
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
              at <span className="text-amber">Two Elephants</span>
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
            className="floating-grid"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div className="grid-card c-img-1" variants={floatingImg(0.1)}>
              <img src={auImg} alt="Culture" />
            </motion.div>
            <motion.div className="grid-card c-img-2" variants={floatingImg(0.3)}>
              <img src={sapnaImg} alt="Workspace" />
            </motion.div>
            <motion.div className="grid-card c-img-3" variants={floatingImg(0.5)}>
              <img src={abhiImg} alt="Team" />
            </motion.div>
            <motion.div className="grid-card c-img-4" variants={floatingImg(0.7)}>
              <img src={pankajImg} alt="Focus" />
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
                Two Elephants is not just an IT company; it's a legacy of 65 years transitioning into the digital age.
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
              <div className="eyebrow dark justify-center mb-4">LIFE AT TWO ELEPHANTS</div>
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

          <motion.div
            className="opening-cards-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Python Developer */}
            <motion.div className="opening-card-premium" variants={item}>
              <span className="card-label">Engineering</span>
              <h3 className="card-title">Python Developer</h3>
              <div className="card-location">📍 On-site / Internship</div>
              <ul className="opening-points">
                <li>Strong knowledge of Python & backend development</li>
                <li>Experience with Django / Flask / FastAPI</li>
                <li>Database knowledge (PostgreSQL / MySQL)</li>
                <li>REST API development & integrations</li>
              </ul>
              <a href="mailto:support@twoelephants.org?subject=Application - Python Developer" className="apply-btn-v3">
                Apply Now <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </a>
            </motion.div>

            {/* AI/ML Intern */}
            <motion.div className="opening-card-premium" variants={item}>
              <span className="card-label">AI & Research</span>
              <h3 className="card-title">AI / ML Intern</h3>
              <div className="card-location">📍 On-site / Internship</div>
              <ul className="opening-points">
                <li>Basic understanding of Python & ML fundamentals</li>
                <li>Passion for AI, data & problem-solving</li>
                <li>Hands-on learning with real-world projects</li>
                <li>Mentorship from experienced engineers</li>
              </ul>
              <a href="mailto:support@twoelephants.org?subject=Application - AI/ML Intern" className="apply-btn-v3">
                Apply Now <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
