// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useEffect } from "react";
// import emailjs from '@emailjs/browser';
// import {
//   Mail,
//   Phone,
//   Globe,
//   MapPin,
//   Send,
//   CheckCircle,
//   Clock,
//   ArrowLeft
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import './Contact.css';

// const CONTACT_RECEIVER_EMAIL = 'support@twoelephants.tech';

// const Contact = () => {
//   const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success
//   const [formError, setFormError] = useState('');
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     location: '',
//     interest: '',
//     message: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus('loading');
//     setFormError('');

//     try {
//       const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//       const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//       const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//       if (!serviceId || !templateId || !publicKey) {
//         throw new Error('Missing email configuration');
//       }

//       const fullName = `${formData.fname} ${formData.lname}`.trim();
//       const submittedAt = new Date().toLocaleString('en-IN', {
//         dateStyle: 'medium',
//         timeStyle: 'short',
//         hour12: true
//       });
//       const interest = formData.interest || 'General inquiry';
//       const safeMessage = formData.message.trim();

//       await emailjs.send(
//         serviceId,
//         templateId,
//         {
//           to_email: CONTACT_RECEIVER_EMAIL,
//           reply_to: formData.email,
//           subject: `New Contact Inquiry - ${interest}`,
//           from_name: fullName,
//           from_email: formData.email,
//           // Backward-compatible keys used by many default EmailJS templates
//           name: fullName,
//           email: formData.email,
//           location: formData.location,
//           interest,
//           message: safeMessage,
//           time: submittedAt,
//           title: `New Contact Inquiry - ${interest}`,
//           company_name: 'Two Elephants Website',
//           submitted_at: submittedAt,
//           summary_text: [
//             `New inquiry from ${fullName}`,
//             `Email: ${formData.email}`,
//             `Location: ${formData.location}`,
//             `Interest: ${interest}`,
//             `Submitted: ${submittedAt}`,
//             '',
//             'Message:',
//             safeMessage
//           ].join('\n')
//         },
//         publicKey
//       );

//       setFormStatus('success');
//       setFormData({
//         fname: '',
//         lname: '',
//         email: '',
//         location: '',
//         interest: '',
//         message: ''
//       });
//     } catch (error) {
//       setFormStatus('idle');
//       setFormError('Message could not be sent. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="contact-page">
//       <Navbar />

//       <main>
//         <section className="contact-body">
//           <div className="container">
//             <div className="contact-grid">
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <h3>Let's Build Something That Lasts....</h3>
//                 <p>From a quick discovery call to a full project brief — every great partnership starts with a conversation.</p>

//                 <div className="contact-cards">
//                   <div className="contact-card">
//                     <div className="cc-icon"><Mail size={20} /></div>
//                     <div className="cc-body">
//                       <div className="cc-label">Email</div>
//                       <div className="cc-value"><a href="mailto:support@twoelephants.tech">support@twoelephants.tech</a></div>
//                       <div className="cc-sub">Response within 24 business hours</div>
//                     </div>
//                   </div>
//                   <div className="contact-card">
//                     <div className="cc-icon"><Phone size={20} /></div>
//                     <div className="cc-body">
//                       <div className="cc-label">Phone</div>
//                       <div className="cc-value">+91 98765 43210</div>
//                       <div className="cc-sub">Mon–Fri, 9am–6pm IST</div>
//                     </div>
//                   </div>
//                   <div className="contact-card">
//                     <div className="cc-icon"><Globe size={20} /></div>
//                     <div className="cc-body">
//                       <div className="cc-label">LinkedIn</div>
//                       <div className="cc-value"><a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" target="_blank" rel="noreferrer">two-elephants-technologies-llp</a></div>
//                       <div className="cc-sub">Follow us for updates</div>
//                     </div>
//                   </div>
//                 </div>

//                 <h4>Our Offices</h4>
//                 <div className="offices-row">
//                   <div className="office-card">
//                     <div className="office-flag">🇮🇳</div>
//                     <div className="office-name">Solapur, India</div>
//                     <div className="office-addr">Solapur, Maharashtra 413001<br />India — Headquarters</div>
//                   </div>
//                   <div className="office-card">
//                     <div className="office-flag">🇺🇸</div>
//                     <div className="office-name">Houston, USA</div>
//                     <div className="office-addr">Houston, Texas<br />USA — Oil & Gas Division</div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <div className="contact-form-wrap">
//                   <AnimatePresence mode="wait">
//                     {formStatus !== 'success' ? (
//                       <motion.div
//                         key="form"
//                         initial={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                       >
//                         <div className="form-title">Send Us a Message</div>
//                         <div className="form-sub">Fill out the details below and our team will reach out.</div>

//                         <form onSubmit={handleSubmit}>
//                           <div className="form-row">
//                             <div className="form-group">
//                               <label htmlFor="fname">First Name *</label>
//                               <input type="text" id="fname" required placeholder="Rajesh" onChange={handleChange} value={formData.fname} />
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="lname">Last Name *</label>
//                               <input type="text" id="lname" required placeholder="Sharma" onChange={handleChange} value={formData.lname} />
//                             </div>
//                           </div>

//                           <div className="form-row">
//                             <div className="form-group">
//                               <label htmlFor="email">Work Email *</label>
//                               <input type="email" id="email" required placeholder="rajesh@company.com" onChange={handleChange} value={formData.email} />
//                             </div>
//                             <div className="form-group">
//                               <label htmlFor="location">Location / City *</label>
//                               <input type="text" id="location" required placeholder="Solapur, India" onChange={handleChange} value={formData.location} />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <label htmlFor="interest">I'm interested in…</label>
//                             <select id="interest" onChange={handleChange} value={formData.interest}>
//                               <option value="" disabled>Select a service area</option>
//                               <option>BFSI Technology</option>
//                               <option>Oil & Gas IT</option>
//                               <option>Pharmaceutical IT</option>
//                               <option>Cloud & AI Solutions</option>
//                               <option>Other</option>
//                             </select>
//                           </div>

//                           <div className="form-group">
//                             <label htmlFor="message">Your Message *</label>
//                             <textarea id="message" required placeholder="Tell us about your project..." onChange={handleChange} value={formData.message}></textarea>
//                           </div>

//                           <button className="btn btn-primary form-submit" type="submit" disabled={formStatus === 'loading'}>
//                             {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
//                           </button>
//                           {formError && <p style={{ color: '#ff6b6b', marginTop: '12px' }}>{formError}</p>}
//                         </form>
//                       </motion.div>
//                     ) : (
//                       <motion.div
//                         key="success"
//                         className="form-success show"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                       >
//                         <div className="success-icon"><CheckCircle size={64} color="var(--accent-emerald)" /></div>
//                         <div className="success-title">Message Received!</div>
//                         <div className="success-sub">Thank you for reaching out. Our team will get back to you within 24 business hours.</div>
//                         <button className="btn btn-outline-dark" onClick={() => { setFormStatus('idle'); setFormError(''); }} style={{ marginTop: '24px' }}>
//                           Send Another Message
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         <section className="map-strip">
//           <div className="container map-inner">
//             <div className="map-text">
//               <div className="eyebrow no-line" style={{ color: 'rgba(255,255,255,0.7)' }}>FIND US</div>
//               <h2>Rooted in Solapur.<br /><em style={{ color: 'var(--color-blue-glow)' }}>Reaching the World.</em></h2>
//               <p>We believe the best technology companies don't need to be in Mumbai or Silicon Valley. They need to be somewhere that gives them an unfair advantage. For us, that's Solapur.</p>
//             </div>
//             <div className="map-visual">
//               <iframe
//                 src="https://www.openstreetmap.org/export/embed.html?bbox=75.85,17.65,75.95,17.72&layer=mapnik&marker=17.686,75.904"
//                 title="Solapur Map"
//                 loading="lazy">
//               </iframe>
//               <div className="map-overlay-badge">
//                 <MapPin size={14} color="var(--color-blue-glow)" />
//                 Solapur, Maharashtra 413001
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import '../styles/contact.css';

const API_URL = 'http://localhost:8000/api/contact/'; // Change to your production URL later

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formError, setFormError] = useState('');
  
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    location: '',
    interest: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        
        // Reset form after successful submission
        setFormData({
          fname: '',
          lname: '',
          email: '',
          location: '',
          interest: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
      setFormError('Unable to send your message. Please try again or contact us directly.');
    }
  };

  // Reset form status when user starts typing again after error
  const resetFormStatus = () => {
    if (formStatus === 'error') {
      setFormStatus('idle');
      setFormError('');
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
                        <a href="mailto:support@twoelephants.tech">support@twoelephants.tech</a>
                      </div>
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
                    <div className="cc-icon"><Globe size={20} /></div>
                    <div className="cc-body">
                      <div className="cc-label">LinkedIn</div>
                      <div className="cc-value">
                        <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" 
                           target="_blank" rel="noreferrer">
                          two-elephants-technologies-llp
                        </a>
                      </div>
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
                                placeholder="Rajesh" 
                                onChange={handleChange} 
                                value={formData.fname} 
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="lname">Last Name *</label>
                              <input 
                                type="text" 
                                id="lname" 
                                required 
                                placeholder="Sharma" 
                                onChange={handleChange} 
                                value={formData.lname} 
                              />
                            </div>
                          </div>

                          <div className="form-row grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-group">
                              <label htmlFor="email">Work Email *</label>
                              <input 
                                type="email" 
                                id="email" 
                                required 
                                placeholder="rajesh@company.com" 
                                onChange={handleChange} 
                                value={formData.email} 
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="location">Location / City *</label>
                              <input 
                                type="text" 
                                id="location" 
                                required 
                                placeholder="Solapur, India" 
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
                              rows={5}
                            ></textarea>
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

                          {formError && (
                            <p className="form-error">{formError}</p>
                          )}
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
              <h2>Rooted in Solapur.<br /><em style={{ color: 'var(--color-blue-glow)' }}>Reaching the World.</em></h2>
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