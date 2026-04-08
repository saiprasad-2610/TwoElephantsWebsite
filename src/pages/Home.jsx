import React, { useEffect, useState } from 'react';
import ElephantModel3D from '../components/ElephantModel3D';
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

// Import images
import logo from '../assets/images/logo1.svg';
import abhiImg from '../assets/images/Abhi.jpeg';
import auImg from '../assets/images/Au.jpeg';
import sapnaImg from '../assets/images/Sapna.jpeg';
import pankajImg from '../assets/images/pankaj.jpeg';
import ptImg from '../assets/images/prashant1.png';

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
            <h1 className="hero-title">
              From <i>Looms</i> <br />
              <span>to Labs.</span>
            </h1>
            <p className="hero-sub">
              The same family that mastered the precision of textile manufacturing for 65 years now builds the technology infrastructure that banks run on, oil fields depend on, and pharmaceutical supply chains trust.
            </p>
            <div className="typewriter-container">
              <div className="typewriter-text">{text}</div>
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
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="glow-outer"></div>
            <div className="glow-inner"></div>
            
            <motion.div
              className="hero-logo-wrapper"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.img 
                src={logo} 
                alt="Two Elephants Logo" 
                className="hero-svg hero-logo hero-logo-cropped"
              />
              <motion.div 
                className="hero-slogan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="slogan-top">TWO ELEPHANTS TECHNOLOGIES LLP</div>
                <div className="slogan-bottom">
                  One Promise: <span className="s-amber">Strength</span> <span className="s-amber">Care</span> <span className="s-amber">Honesty</span>
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
              {/* <div className="legacy-badge-title">
                <CheckCircle2 size={16} color="var(--color-blue-glow)" />
                Do Haathi
              </div> 
               <div className="legacy-badge-sub">65 Years of Trust</div> */}
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
          className="marquee-inner"
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const milestones = [
    { year: "1959", title: "Pushpa Textiles Founded", desc: "The Rathi family begins a legacy of manufacturing precision in Solapur." },
    { year: "1980s", title: "Global Expansion", desc: "Becoming a trusted supplier for national brands like IndiGo and Maruti Suzuki." },
    { year: "2026", title: "Two Elephants Tech", desc: "Transitioning industrial wisdom into enterprise-grade technology solutions." }
  ];

  return (
    <section className="story-section section-padding" id="story">
      <div className="container">
        <div className="story-grid">
          <motion.div 
            className="story-images"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-stack">
              <motion.img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85" 
                alt="Pushpa Textiles" 
                className="story-img-main"
                whileHover={{ scale: 1.02 }}
              />
              <motion.div 
                className="story-img-card card-legacy"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="card-year">1959</span>
                <span className="card-text">Legacy Begins</span>
              </motion.div>
              <motion.img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85" 
                alt="Modern tech" 
                className="story-img-fg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div 
                className="story-img-card card-tech"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={16} color="var(--color-blue-glow)" />
                <span>Tech Evolution</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow dark">OUR STORY</div>
            <div className="section-rule visible"></div>
            <h2 className="h2-title">A Legacy That Earns Its <em>Next Chapter</em></h2>
            <p className="body-text">Every great technology company is built on something real. Ours is built on <strong>65 years of industrial trust.</strong></p>
            <p className="body-text">The Rathi family — known in Solapur as "Do Haathi" (Two Elephants) — has mastered the art of precision over decades. Today, we bring that same uncompromising quality to the digital world.</p>
            
            <div className="legacy-stats">
              <Counter value="65+" label="Years of Trust" />
              <Counter value="500+" label="Team Goal" />
              <Counter value="100%" label="Commitment" />
            </div>

            <motion.blockquote 
              className="pull-quote"
              whileHover={{ borderLeftWidth: "8px", paddingLeft: "36px" }}
              transition={{ duration: 0.3 }}
            >
              "We didn't move into technology. We extended who we already were."
            </motion.blockquote>
            <Link to="/contact" className="text-link">Partner with us <ArrowRight size={16} /></Link>
          </motion.div>
        </div>

        {/* Interactive Timeline */}
        <div className="timeline-wrap">
          <motion.div 
            className="timeline-line-glow"
            style={{ scaleX: timelineScale }}
          />
          <div className="timeline-grid">
            {milestones.map((m, i) => (
              <motion.div 
                key={i} 
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="t-dot"
                  whileHover={{ scale: 1.5, backgroundColor: "var(--color-blue-glow)" }}
                />
                <div className="t-year">{m.year}</div>
                <h4 className="t-title">{m.title}</h4>
                <p className="t-desc">{m.desc}</p>
                <div className="t-hover-bg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, desc, cat, tags, color, img, delay }) => {
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
      style={{ perspective: 1000 }}
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
    <section className="services-section section-padding" id="services">
      <div className="container">
        <div className="services-header">
          <div className="eyebrow dark">WHAT WE DO</div>
          <div className="section-rule visible"></div>
          <h2 className="h2-title">Enterprise Technology for <em>Demanding Industries</em></h2>
          <p className="services-sub">We build the systems that banks stake their reputation on and oil companies stake their operations on.</p>
        </div>
        <div className="services-grid">
          {services.map((svc, idx) => (
            <ServiceCard key={idx} {...svc} delay={idx * 0.1} />
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
      transition={{ delay }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="team-card-inner">
        <div className="team-image-container">
          <img src={img} alt={name} className="team-img" />
        </div>
        <div className="team-info">
          <h3 className="team-name">{name}</h3>
          <span className="team-role-tag">{role}</span>
        </div>
        <div className="team-card-border"></div>
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
            <div className="modal-social">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="m-social-btn"><Linkedin size={20} /></a>
              <a href="#" className="m-social-btn"><Twitter size={20} /></a>
              <a href="#" className="m-social-btn"><Mail size={20} /></a>
            </div>
          </div>
          
          <div className="modal-text">
            <div className="eyebrow amber no-line">TEAM MEMBER</div>
            <h2 className="modal-name">{member.name}</h2>
            <div className="modal-role">{member.role}</div>
            <div className="modal-divider"></div>
            <p className="modal-bio">{member.bio}</p>
            
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
      name: "Prashant Ratthi",
      role: "Co-Founder & CEO",
      img: ptImg,
      bio: "MBA from Sydney with strong cross-market acumen. Continuing the 65-year legacy of Pushpa Textiles. Prashant leads the strategic direction of Two Elephants, bridging traditional business values with modern technological needs.",
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
              delay={idx * 0.1} 
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
        <div className="insights-grid">
          {articles.map((article, idx) => (
            <motion.div 
              key={idx} 
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/insights/${article.id}`)}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">
              <img src={logo} alt="Two Elephants" style={{ height: '32px' }} />
              <div className="logo-text">
                <span className="logo-main" style={{ color: '#fff' }}>Two Elephants</span>
                <span className="logo-sub">TECHNOLOGIES</span>
              </div>
            </div>
            <p className="f-tagline">Strength. Care. Honesty.</p>
            <p className="f-desc">Technology grounded in 65 years of industrial wisdom. Built in Solapur.</p>
            <div className="social-row">
              <a href="#" className="social-btn"><Linkedin size={18} /></a>
              <a href="#" className="social-btn"><Twitter size={18} /></a>
              <a href="#" className="social-btn"><Github size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">
              <li><a href="#story">Our Story</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="f-col-title">Services</h4>
            <ul className="f-links">
              <li><a href="#services">BFSI Technology</a></li>
              <li><a href="#services">Oil & Gas IT</a></li>
              <li><a href="#services">Pharma IT</a></li>
            </ul>
          </div>
          <div className="f-contact">
            <h4 className="f-col-title">Reach Us</h4>
            <p><MapPin size={16} /> Solapur, Maharashtra, India</p>
            <p><Mail size={16} /> hello@twoelephants.tech</p>
            <div className="f-response">
              <Clock size={12} /> Response within 24 hours.
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Two Elephants Technologies LLP.</div>
          <div className="f-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div>Standing on 65 years. Building for the next 65.</div>
        </div>
      </div>
    </footer>
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
        
        {/* Careers CTA */}
        <SectionReveal>
          <section className="careers-section">
            <div className="careers-bg"></div>
            <div className="container">
              <div className="careers-inner">
                <h2 className="careers-title">Build Your Career Without Leaving Your City.</h2>
                <p className="careers-desc">We're building a 500-person engineering team in Solapur. Metro salaries. Your hometown.</p>
                <div className="careers-actions">
                  <Link to="/contact" className="btn btn-primary">Join the Herd</Link>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Final CTA */}
        <SectionReveal>
          <section className="cta-strip">
            <div className="container">
              <h2 className="cta-title">Ready to Build Something That Lasts?</h2>
              <p className="cta-sub">Start a conversation with our enterprise team today.</p>
              <Link to="/contact" className="btn btn-white">Get Started <ArrowRight size={18} /></Link>
            </div>
          </section>
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
