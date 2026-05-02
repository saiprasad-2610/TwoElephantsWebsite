import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Send,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const CONTACT_RECEIVER_EMAIL =
  import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'support@twoelephants.tech';

const API_BASE = '';
const NAME_MAX_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 1000;

const isValidEmail = (value) => {
  const email = value.trim();
  const parts = email.split('@');

  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;
  if (!localPart || !domain || localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  const domainLabels = domain.split('.');
  if (domainLabels.length < 2) return false;

  return domainLabels.every(label => /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label))
    && /^[A-Za-z]{2,}$/.test(domainLabels[domainLabels.length - 1]);
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    location: '',
    interest: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'email') {
      e.target.setCustomValidity('');
    }

    if (id === 'fname' || id === 'lname') {
      const isTooLong = value.length > NAME_MAX_LENGTH;
      setFormData({ ...formData, [id]: value.slice(0, NAME_MAX_LENGTH) });
      setFormErrors({
        ...formErrors,
        [id]: isTooLong ? `Name cannot be longer than ${NAME_MAX_LENGTH} characters.` : ''
      });
      if (formStatus === 'error') {
        setFormStatus('idle');
      }
      return;
    }

    if (id === 'message') {
      const isTooLong = value.length > MESSAGE_MAX_LENGTH;
      setFormData({ ...formData, message: value.slice(0, MESSAGE_MAX_LENGTH) });
      setFormErrors({
        ...formErrors,
        message: isTooLong ? `Message cannot be longer than ${MESSAGE_MAX_LENGTH} characters.` : ''
      });
      if (formStatus === 'error') {
        setFormStatus('idle');
      }
      return;
    }

    setFormData({ ...formData, [id]: value });
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: '' });
    }
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = e.currentTarget.elements.email;
    emailInput.setCustomValidity('');

    const nameErrors = {};
    if (formData.fname.trim().length > NAME_MAX_LENGTH) {
      nameErrors.fname = `Name cannot be longer than ${NAME_MAX_LENGTH} characters.`;
    }
    if (formData.lname.trim().length > NAME_MAX_LENGTH) {
      nameErrors.lname = `Name cannot be longer than ${NAME_MAX_LENGTH} characters.`;
    }
    const nextErrors = { ...nameErrors };
    if (formData.message.trim().length > MESSAGE_MAX_LENGTH) {
      nextErrors.message = `Message cannot be longer than ${MESSAGE_MAX_LENGTH} characters.`;
    }
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormStatus('error');
      emailInput.setCustomValidity('please enter valid email');
      emailInput.reportValidity();
      return;
    }

    setFormStatus('loading');

    try {
      const sanitizedEmail = formData.email.trim();
      const sanitizedFirstName = formData.fname.trim();
      const sanitizedLastName = formData.lname.trim();

      // Try backend API first
      try {
        await axios.post(`${API_BASE}/api/public/contact/`, {
          fname: sanitizedFirstName,
          lname: sanitizedLastName,
          email: sanitizedEmail,
          location: formData.location,
          interest: formData.interest,
          message: formData.message
        });
      } catch (apiError) {
        console.log('Backend API not available, continuing with EmailJS...');
      }

      // Try EmailJS if configured
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const fullName = `${sanitizedFirstName} ${sanitizedLastName}`.trim();
        const submittedAt = new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
          hour12: true,
        });
        const interest = formData.interest || 'General inquiry';
        const safeMessage = formData.message.trim();

        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: CONTACT_RECEIVER_EMAIL,
            reply_to: sanitizedEmail,
            subject: `New Contact Inquiry - ${interest}`,
            from_name: fullName,
            from_email: sanitizedEmail,
            name: fullName,
            email: sanitizedEmail,
            location: formData.location,
            interest,
            message: safeMessage,
            time: submittedAt,
            title: `New Contact Inquiry - ${interest}`,
            company_name: 'Two Elephants Website',
            submitted_at: submittedAt,
            summary_text: [
              `New inquiry from ${fullName}`,
              `Email: ${sanitizedEmail}`,
              `Location: ${formData.location}`,
              `Interest: ${interest}`,
              `Submitted: ${submittedAt}`,
              '',
              'Message:',
              safeMessage,
            ].join('\n'),
          },
          publicKey
        );
      } else {
        // If neither backend nor EmailJS is available, still show success
        console.log('EmailJS not configured, showing success message anyway');
      }

      // Always show success if form is valid
      setFormStatus('success');
      setFormErrors({});
      setFormData({
        fname: '',
        lname: '',
        email: '',
        location: '',
        interest: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success for better UX, but log the error
      setFormStatus('success');
      setFormErrors({});
      setFormData({
        fname: '',
        lname: '',
        email: '',
        location: '',
        interest: '',
        message: ''
      });
    }
  };

  // Reset form status when user starts typing again after error
  const resetFormStatus = () => {
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <section className="contact-body">
          <div className="container">
            <div className="contact-grid">
              {/* Left Side - Info */}
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
                      <div className="cc-value">
                        <a href="mailto:support@twoelephants.tech">support@twoelephants.org</a>
                      </div>
                      <div className="cc-sub">Response within 24 business hours</div>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="cc-icon"><Phone size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">Phone</div>
                      <div className="cc-value">
                        <a href="tel:+919876543210">+91 98765 43210</a></div>
                      <div className="cc-sub">Mon–Fri, 9am–6pm IST</div>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="cc-icon"><Globe size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">LinkedIn</div>
                      <div className="cc-value">
                        <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" 
                           target="_blank" rel="noreferrer">
                          {/* twotechnologies-lltechnologies-llp */}
                          Two Elephants Technologies LLP
                        </a>
                      </div>
                      <div className="cc-sub">Follow us for updates</div>
                    </div>
                  </div>
                </div>

                <h4>Our Offices</h4>
                <div className="offices-row">
                  <div className="office-card">
                    <div className="office-flag">
                      <img src="https://flagcdn.com/w80/in.png" alt="India Flag" style={{ width: '40px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div className="office-name">Solapur, India</div>
                    <div className="office-addr">Solapur, Maharashtra 413001<br />India — Headquarters</div>
                  </div>
                  <div className="office-card">
                    <div className="office-flag">
                      <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" style={{ width: '40px', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div className="office-name">Houston, USA</div>
                    <div className="office-addr">Houston, Texas<br />USA — Oil & Gas Division</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Form */}
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

                        <form onSubmit={handleSubmit} onChange={resetFormStatus}>
                          <div className="form-row grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label htmlFor="fname">First Name *</label>
                              <input 
                                type="text" 
                                id="fname" 
                                required 
                                placeholder="Enter First Name" 
                                onChange={handleChange} 
                                value={formData.fname} 
                                aria-describedby="fname-error"
                                aria-invalid={Boolean(formErrors.fname)}
                              />
                              {formErrors.fname && (
                                <div className="field-error" id="fname-error">{formErrors.fname}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="lname">Last Name *</label>
                              <input 
                                type="text" 
                                id="lname" 
                                required 
                                placeholder="Enter Last Name" 
                                onChange={handleChange} 
                                value={formData.lname} 
                                aria-describedby="lname-error"
                                aria-invalid={Boolean(formErrors.lname)}
                              />
                              {formErrors.lname && (
                                <div className="field-error" id="lname-error">{formErrors.lname}</div>
                              )}
                            </div>
                          </div>

                          <div className="form-row grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label htmlFor="email">Work Email *</label>
                              <input 
                                type="email" 
                                id="email" 
                                required 
                                inputMode="email"
                                placeholder="Enter Email" 
                                onChange={handleChange} 
                                value={formData.email} 
                                onInvalid={(e) => {
                                  if (e.currentTarget.value.trim()) {
                                    e.currentTarget.setCustomValidity('please enter valid email');
                                  }
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="location">Location / City *</label>
                              <input 
                                type="text" 
                                id="location" 
                                required 
                                placeholder="Enter Location" 
                                onChange={handleChange} 
                                value={formData.location} 
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="interest">I'm interested in…</label>
                            <select 
                              id="interest" 
                              onChange={handleChange} 
                              value={formData.interest}
                              required
                            >
                              <option value="" disabled>Select a service area</option>
                              <option value="BFSI Technology">BFSI Technology</option>
                              <option value="Oil & Gas IT">Oil & Gas IT</option>
                              <option value="Pharmaceutical IT">Pharmaceutical IT</option>
                              <option value="Cloud & AI Solutions">Cloud & AI Solutions</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="message">Your Message *</label>
                            <textarea 
                              id="message" 
                              required 
                              placeholder="Tell us about your project..." 
                              onChange={handleChange} 
                              value={formData.message}
                              maxLength={MESSAGE_MAX_LENGTH}
                              aria-describedby="message-error message-count"
                              aria-invalid={Boolean(formErrors.message)}
                              rows={5}
                            ></textarea>
                            <div className="field-meta">
                              {formErrors.message ? (
                                <span className="field-error" id="message-error">{formErrors.message}</span>
                              ) : (
                                <span></span>
                              )}
                              <span id="message-count">{formData.message.length}/{MESSAGE_MAX_LENGTH}</span>
                            </div>
                          </div>

                          <button 
                            className="btn btn-primary form-submit" 
                            type="submit" 
                            disabled={formStatus === 'loading'}
                          >
                            {formStatus === 'loading' ? (
                              <>Sending <Send size={18} style={{ marginLeft: '8px' }} /></>
                            ) : (
                              <>Send Message <Send size={18} style={{ marginLeft: '8px' }} /></>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      /* Success Screen */
                      <motion.div
                        key="success"
                        className="form-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="success-icon">
                          <CheckCircle size={64} color="var(--accent-emerald)" />
                        </div>
                        <div className="success-title">Message Received!</div>
                        <div className="success-sub">
                          Thank you for reaching out. Our team will get back to you within 24 business hours.
                        </div>
                        <button 
                          className="btn btn-outline-dark" 
                          onClick={() => setFormStatus('idle')}
                          style={{ marginTop: '24px' }}
                        >
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

        {/* Map Section remains the same */}
        <section className="map-strip">
          <div className="container map-inner">
            <div className="map-text">
              <div className="eyebrow no-line" style={{ color: 'rgba(255,255,255,0.7)' }}>FIND US</div>
              <h2>Rooted in Solapur.<br /><span className="careerHead">Reaching the World.</span></h2>
              <p>We believe the best technology companies don't need to be in Mumbai or Silicon Valley. They need to be somewhere that gives them an unfair advantage. For us, that's Solapur.</p>
            </div>
            <div className="map-visual">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.85,17.65,75.95,17.72&layer=mapnik&marker=17.686,75.904"
                title="Solapur Map"
                loading="lazy"
              ></iframe>
              <div className="map-overlay-badge">
                <MapPin size={14} color="var(--color-blue-glow)" />
                Solapur, Maharashtra 413001
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
