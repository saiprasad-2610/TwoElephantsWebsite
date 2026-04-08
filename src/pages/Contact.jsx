import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="contact-page">
      <nav id="main-nav" className="scrolled">
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <div className="logo-text">
              <span className="logo-main" style={{ color: 'var(--color-dark)' }}>Two Elephants</span>
              <span className="logo-sub">TECHNOLOGIES</span>
            </div>
          </Link>
          <div className="nav-links">
            <Link to="/" style={{ color: 'var(--color-dark)' }}>Home</Link>
            <Link to="/contact" className="active">Contact</Link>
          </div>
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <main>
        <section className="contact-hero">
          <div className="container">
            <motion.div 
              className="contact-hero-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="eyebrow no-line" style={{ color: 'rgba(255,255,255,0.7)', justifyContent: 'center' }}>GET IN TOUCH</div>
              <h2>Let's Build Something <em>That Lasts.</em></h2>
              <p>Whether you're a BFSI CTO, an Oil & Gas operations head, or a pharma compliance officer — we want to hear from you.</p>
              
              <div className="contact-hero-badges">
                <div className="chero-badge">
                  <Clock size={16} color="var(--color-blue-glow)" />
                  Response within 24 hours
                </div>
                <div className="chero-badge">
                  <Globe size={16} color="var(--accent-emerald)" />
                  Solapur HQ + Houston Office
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="contact-body">
          <div className="container">
            <div className="contact-grid">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3>Let's Build Something That Lasts....</h3>
                <p>From a quick discovery call to a full project brief — every great partnership starts with a conversation.</p>

                <div className="contact-cards">
                  <div className="contact-card">
                    <div className="cc-icon"><Mail size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">Email</div>
                      <div className="cc-value"><a href="mailto:hello@twoelephants.tech">hello@twoelephants.tech</a></div>
                      <div className="cc-sub">Response within 24 business hours</div>
                    </div>
                  </div>
                  <div className="contact-card">
                    <div className="cc-icon"><Phone size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">Phone</div>
                      <div className="cc-value">+91 98765 43210</div>
                      <div className="cc-sub">Mon–Fri, 9am–6pm IST</div>
                    </div>
                  </div>
                  <div className="contact-card">
                    <div className="cc-icon"><Linkedin size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">LinkedIn</div>
                      <div className="cc-value"><a href="https://linkedin.com/company/two-elephants" target="_blank" rel="noreferrer">two-elephants-tech</a></div>
                      <div className="cc-sub">Follow us for updates</div>
                    </div>
                  </div>
                </div>

                <h4>Our Offices</h4>
                <div className="offices-row">
                  <div className="office-card">
                    <div className="office-flag">🇮🇳</div>
                    <div className="office-name">Solapur, India</div>
                    <div className="office-addr">Solapur, Maharashtra 413001<br />India — Headquarters</div>
                  </div>
                  <div className="office-card">
                    <div className="office-flag">🇺🇸</div>
                    <div className="office-name">Houston, USA</div>
                    <div className="office-addr">Houston, Texas<br />USA — Oil & Gas Division</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-form-wrap">
                  <AnimatePresence mode="wait">
                    {formStatus !== 'success' ? (
                      <motion.div 
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="form-title">Send Us a Message</div>
                        <div className="form-sub">Fill out the details below and our team will reach out.</div>

                        <form onSubmit={handleSubmit}>
                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="fname">First Name *</label>
                              <input type="text" id="fname" required placeholder="Rajesh" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="lname">Last Name *</label>
                              <input type="text" id="lname" required placeholder="Sharma" onChange={handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="email">Work Email *</label>
                            <input type="email" id="email" required placeholder="rajesh@company.com" onChange={handleChange} />
                          </div>

                          <div className="form-group">
                            <label htmlFor="interest">I'm interested in…</label>
                            <select id="interest" onChange={handleChange}>
                              <option value="" disabled selected>Select a service area</option>
                              <option>BFSI Technology</option>
                              <option>Oil & Gas IT</option>
                              <option>Pharmaceutical IT</option>
                              <option>Cloud & AI Solutions</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="message">Your Message *</label>
                            <textarea id="message" required placeholder="Tell us about your project..." onChange={handleChange}></textarea>
                          </div>

                          <button className="btn btn-primary form-submit" type="submit" disabled={formStatus === 'loading'}>
                            {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="success"
                        className="form-success show"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="success-icon"><CheckCircle size={64} color="var(--accent-emerald)" /></div>
                        <div className="success-title">Message Received!</div>
                        <div className="success-sub">Thank you for reaching out. Our team will get back to you within 24 business hours.</div>
                        <button className="btn btn-outline-dark" onClick={() => setFormStatus('idle')} style={{ marginTop: '24px' }}>
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="map-strip">
          <div className="container map-inner">
            <div className="map-text">
              <div className="eyebrow no-line" style={{ color: 'rgba(255,255,255,0.7)' }}>FIND US</div>
              <h2>Rooted in Solapur.<br /><em style={{ color: 'var(--color-blue-glow)' }}>Reaching the World.</em></h2>
              <p>We believe the best technology companies don't need to be in Mumbai or Silicon Valley. They need to be somewhere that gives them an unfair advantage. For us, that's Solapur.</p>
            </div>
            <div className="map-visual">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.85,17.65,75.95,17.72&layer=mapnik&marker=17.686,75.904"
                title="Solapur Map"
                loading="lazy">
              </iframe>
              <div className="map-overlay-badge">
                <MapPin size={14} color="var(--color-blue-glow)" />
                Solapur, Maharashtra 413001
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: 'var(--color-dark)', color: '#fff', padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="logo-main" style={{ fontSize: '24px', marginBottom: '16px' }}>Two Elephants</div>
            <p style={{ opacity: 0.7 }}>© 2026 Two Elephants Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
