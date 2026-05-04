import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaArrowRight, FaUpload, FaCheckCircle, FaTimes, FaUser, FaBriefcase, FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import '../styles/Careers.css';

// Import tech hero images for careers bento grid
import techHero1 from '../assets/images/tech_hero_1.png';
import techHero2 from '../assets/images/tech_hero_2.png';

const API_BASE = '';
const NAME_MAX_LENGTH = 50;

const Careers = () => {
  const [activeRole, setActiveRole] = useState(0);
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', location: '',
    linkedin: '', portfolio: '', github: '', current_company: '',
    current_designation: '', years_experience: '', notice_period: '',
    expected_ctc: '', current_ctc: '', cover_letter: '', resume: null
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/public/roles/`);
      setOpenings(res.data);
      if (res.data.length > 0) {
        setSelectedRole(res.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'first_name' || name === 'last_name') {
      const isTooLong = value.length > NAME_MAX_LENGTH;
      setFormData({ ...formData, [name]: value.slice(0, NAME_MAX_LENGTH) });
      setFormErrors({
        ...formErrors,
        [name]: isTooLong ? `Name cannot be longer than ${NAME_MAX_LENGTH} characters.` : ''
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleApply = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErrors = {};
    if (formData.first_name.trim().length > NAME_MAX_LENGTH) {
      nameErrors.first_name = `Name cannot be longer than ${NAME_MAX_LENGTH} characters.`;
    }
    if (formData.last_name.trim().length > NAME_MAX_LENGTH) {
      nameErrors.last_name = `Name cannot be longer than ${NAME_MAX_LENGTH} characters.`;
    }
    if (Object.keys(nameErrors).length > 0) {
      setFormErrors(nameErrors);
      return;
    }

    setFormStatus('loading');
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        const value = key === 'first_name' || key === 'last_name'
          ? formData[key].trim()
          : formData[key];
        if (value) payload.append(key, value);
      });
      if (selectedRole) payload.append('role', selectedRole.id);
      await axios.post(`${API_BASE}/api/public/apply/`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormStatus('success');
      setFormErrors({});
      setFormData({ first_name: '', last_name: '', email: '', phone: '', location: '',
        linkedin: '', portfolio: '', github: '', current_company: '',
        current_designation: '', years_experience: '', notice_period: '',
        expected_ctc: '', current_ctc: '', cover_letter: '', resume: null });
    } catch (error) {
      console.error('Failed to submit application:', error);
      setFormStatus('error');
    }
  };

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
              <button
              className="btn-yellow"
              onClick={() => {
                const section = document.getElementById("openings");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Roles
            </button>
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
            <div className="services-header">
            <div className="eyebrow dark">THINKING AT SCALE</div>
            <div className="section-rule visible"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* <div className="eyebrow dark">THINKING AT SCALE</div> */}
              <h2 className="h2-title text-4xl mb-6">We move with <span className="careerHead">Strength</span> and execute with <span className="careerHead">Honesty</span>.</h2>
              <p className="body-text text-lg leading-relaxed text-slate-600">
                Two Elephants Technologies LLP is not just an IT company; it's a legacy of 65 years transitioning into the digital age.
                We are looking for engineers who want to build the infrastructure that tomorrow's global markets will depend on.
              </p>
            </motion.div>
          </div>
        </div></div>
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
              <div className="services-header">
                <div className="eyebrow dark">LIFE AT Two Elephants Technologies LLP</div>
                <div className="section-rule visible"></div>
                <h3 className="h2-title text-3xl">A career where <span className="careerHead">impact</span>, <span className="careerHead">growth</span>, and <span className="careerHead">momentum</span> meet.</h3>
              </div>
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
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="services-header">
              <div className="eyebrow dark">OPPORTUNITIES</div>
              <div className="section-rule visible"></div>
              <h2 className="h2-title text-5xl mb-6">Current Openings</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Join our growing team in Solapur and work on cutting-edge solutions.<br />
                We're looking for passionate individuals to help build the future.
              </p></div>
            </motion.div>
          </div>

          <div className="openings-split-layout">
            {loading ? (
              <div className="os-left">
                {[1, 2].map(i => (
                  <div key={i} className="os-tab active">
                    <span className="os-tab-dept">Loading...</span>
                    <div className="os-tab-bottom">
                      <h3 className="os-tab-title">Fetching roles...</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : openings.length > 0 ? (
              <>
              <div className="os-left">
                {openings.map((role, idx) => (
                  <div
                    key={role.id || idx}
                    className={`os-tab ${activeRole === idx ? 'active' : ''}`}
                    onClick={() => { setActiveRole(idx); setSelectedRole(role); }}
                  >
                    <span className="os-tab-dept">{role.department}</span>
                    <h3 className="os-tab-title">{role.title}</h3>
                  </div>
                ))}
              </div>

              <div className="os-right">
                <AnimatePresence mode="wait">
                  {selectedRole && (
                    <motion.div
                      key={selectedRole.id || activeRole}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="os-detail-card"
                    >
                      <div className="os-glow-blob"></div>

                      <div className="os-detail-content">
                        <span className="os-detail-location">{selectedRole.location}</span>
                        <h2 className="os-detail-hero">{selectedRole.title}</h2>
                        <p className="os-detail-desc">{selectedRole.description}</p>

                        <div className="os-rule"></div>

                        <div className="os-requirements-label">What you'll bring:</div>
                        <ul className="os-detail-points">
                          {selectedRole.points && selectedRole.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>

                        <button onClick={() => handleApply(selectedRole)} className="explore-more-btn">
                          Submit Application <FaArrowRight size={20} className="ml-2" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </>
            ) : (
              <div className="no-openings-state">
                <p>No openings available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showModal && selectedRole && (
        <div className="career-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="career-modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} className="close-modal-btn">
              <FaTimes />
            </button>

            {formStatus === 'success' ? (
              <div className="success-container">
                <div className="success-icon-wrap">
                  <FaCheckCircle />
                </div>
                <h3>Application Received!</h3>
                <p>Thank you for applying for the <strong>{selectedRole.title}</strong> role. Our team will review your profile and get back to you soon.</p>
                <button onClick={() => setShowModal(false)} className="submit-application-btn" style={{ margin: '32px auto 0' }}>
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header-premium">
                  <div className="modal-header-content">
                    <h2>Apply for {selectedRole.title}</h2>
                    <p>{selectedRole.department} • {selectedRole.location}</p>
                  </div>
                </div>

                <div className="career-form-scrollable">
                  <form id="career-application-form" onSubmit={handleSubmit}>
                    <div className="form-section-title">
                      <FaUser /> Personal Information
                    </div>
                    <div className="career-form-grid">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" name="first_name" placeholder="John" value={formData.first_name} onChange={handleInputChange} required className="form-control-premium" aria-describedby="career-first-name-error" aria-invalid={Boolean(formErrors.first_name)} />
                        {formErrors.first_name && (
                          <div className="field-error" id="career-first-name-error">{formErrors.first_name}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleInputChange} required className="form-control-premium" aria-describedby="career-last-name-error" aria-invalid={Boolean(formErrors.last_name)} />
                        {formErrors.last_name && (
                          <div className="field-error" id="career-last-name-error">{formErrors.last_name}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} required className="form-control-premium" />
                      </div>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} required className="form-control-premium" />
                      </div>
                      <div className="form-group full-width">
                        <label>Current Location *</label>
                        <input type="text" name="location" placeholder="City, State, Country" value={formData.location} onChange={handleInputChange} required className="form-control-premium" />
                      </div>
                    </div>

                    <div className="form-section-title">
                      <FaGlobe /> Online Presence
                    </div>
                    <div className="career-form-grid">
                      <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input type="url" name="linkedin" placeholder="https://linkedin.com/in/username" value={formData.linkedin} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                      <div className="form-group">
                        <label>Portfolio / Website</label>
                        <input type="url" name="portfolio" placeholder="https://yourportfolio.com" value={formData.portfolio} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                      <div className="form-group full-width">
                        <label>GitHub Profile</label>
                        <input type="url" name="github" placeholder="https://github.com/username" value={formData.github} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                    </div>

                    <div className="form-section-title">
                      <FaBriefcase /> Professional Details
                    </div>
                    <div className="career-form-grid">
                      <div className="form-group">
                        <label>Current Company</label>
                        <input type="text" name="current_company" placeholder="Previous or current employer" value={formData.current_company} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                      <div className="form-group">
                        <label>Current Designation</label>
                        <input type="text" name="current_designation" placeholder="Your current role" value={formData.current_designation} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                      <div className="form-group">
                        <label>Years of Experience *</label>
                        <select name="years_experience" value={formData.years_experience} onChange={handleInputChange} required className="form-control-premium">
                          <option value="">Select Experience</option>
                          <option value="Fresher">Fresher (0 years)</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Notice Period</label>
                        <select name="notice_period" value={formData.notice_period} onChange={handleInputChange} className="form-control-premium">
                          <option value="">Select Notice Period</option>
                          <option value="Immediate Joiner">Immediate Joiner</option>
                          <option value="15 days or less">15 days or less</option>
                          <option value="30 days">30 days</option>
                          <option value="45 days">45 days</option>
                          <option value="60+ days">60+ days</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Current CTC (LPA)</label>
                        <input type="text" name="current_ctc" placeholder="e.g. 8.5" value={formData.current_ctc} onChange={handleInputChange} className="form-control-premium" />
                      </div>
                      <div className="form-group">
                        <label>Expected CTC (LPA) *</label>
                        <input type="text" name="expected_ctc" placeholder="e.g. 12.0" value={formData.expected_ctc} onChange={handleInputChange} required className="form-control-premium" />
                      </div>
                    </div>

                    <div className="form-section-title">
                      <FaUpload /> Documents
                    </div>
                    <div className="form-group full-width mb-8">
                      <label>Resume / CV * (PDF only, Max 5MB)</label>
                      <div className="file-upload-zone">
                        <div className="upload-icon">
                          <FaUpload />
                        </div>
                        <div className="upload-text">
                          {formData.resume ? (
                            <span className="file-selected-name">{formData.resume.name}</span>
                          ) : (
                            <>Drop your resume here or <span>Click to Browse</span></>
                          )}
                        </div>
                        <input type="file" name="resume" onChange={handleFileChange} accept=".pdf" required />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Cover Letter / Additional Notes</label>
                      <textarea name="cover_letter" value={formData.cover_letter} onChange={handleInputChange} rows={5} placeholder="Tell us why you're a great fit for this role..." className="form-control-premium textarea-premium"></textarea>
                    </div>

                    {formStatus === 'error' && (
                      <div style={{ marginTop: '24px', padding: '16px', background: '#fef2f2', color: '#dc2626', borderRadius: '12px', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                        Failed to submit application. Please check all required fields and try again.
                      </div>
                    )}
                  </form>
                </div>

                <div className="form-footer-sticky">
                  <button
                    type="submit"
                    form="career-application-form"
                    disabled={formStatus === 'loading'}
                    className="submit-application-btn"
                  >
                    {formStatus === 'loading' ? (
                      <>Processing...</>
                    ) : (
                      <>Submit Application <FaArrowRight /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Careers;
