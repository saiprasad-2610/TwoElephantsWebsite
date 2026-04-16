// import React from 'react';
// import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import {
//   Linkedin,
//   Facebook,
//   MapPin,
//   Mail,
//   Phone,
//   Clock,
//   Instagram
// } from "lucide-react";
// import logo from '../assets/images/logo1.svg';

// const Footer = () => {
//   return (
//     <footer>
//       <div className="container">
//         <div className="footer-grid">
//           <div className="f-col f-brand">
//             <div className="logo">
//               <img src={logo} alt="Two Elephants" style={{ height: '32px' }} />
//               <div className="logo-text">
//                 <span className="logo-main" style={{ color: '#fff' }}>Two Elephants</span>
//                 <span className="logo-sub">TECHNOLOGIES LLP</span>
//               </div>
//             </div>
//             <p className="f-tagline">Strength. Care. Honesty.</p>
//             <p className="f-desc">Technology grounded in 65 years of industrial wisdom. Built in Solapur.</p>
//             <div className="social-row">
//               <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" className="social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
//               <a href="#" className="social-btn" aria-label="Facebook"><Facebook size={18} /></a>
//               <a href="https://www.instagram.com/twoelephantstechnologiesllp?igsh=MWw5b2psZHJhMGJ4cA%3D%3D&utm_source=qr" className="social-btn" aria-label="Instagram"><Instagram size={18} /></a>
//             </div>
//           </div>
//           <div className="f-col">
//             <h4 className="f-col-title">Company</h4>
//             <ul className="f-links">
//               <li><a href="/#story">Our Story</a></li>
//               <li><a href="/#team">Team</a></li>
//               <li><Link to="/contact">Contact</Link></li>
//               <li><Link to="/careers">Careers</Link></li>
//             </ul>
//           </div>
//           <div className="f-col">
//             <h4 className="f-col-title">Services</h4>
//             <ul className="f-links">
//               <li><a href="/services">Digital Transformation</a></li>
//               <li><a href="/services">AI Solutions</a></li>
//               <li><a href="/services">Cybersecurity</a></li>
//             </ul>
//           </div>
//           <div className="f-col f-contact">
//             <h4 className="f-col-title">Reach Us</h4>
//             <p><MapPin size={16} /> 30/70, Vivekanand House, Padma Nagar, Akkalkot Road, Solapur - 413005</p>
//             <p><Mail size={16} /> <a href="mailto:support@twoelephants.org" style={{ color: 'inherit' }}>support@twoelephants.org</a></p>
//             <p><Phone size={16} /> <a href="tel:+917507080000" style={{ color: 'inherit' }}>+91 7507080000</a> &nbsp;|&nbsp; <a href="tel:+917249570505" style={{ color: 'inherit' }}>9405236989</a></p>
//             <div className="f-response">
//               <Clock size={12} /> Response within 24 hours.
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <div>© 2026 Two Elephants Technologies LLP.</div>
//           <div className="f-bottom-links">
//             <a href="#">Privacy</a>
//             <a href="#">Terms</a>
//           </div>
//           <div>Standing on 65 years. Building for the next 65.</div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
=======
import {
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock
} from "react-icons/fa";
>>>>>>> withBackend
import logo from '../assets/images/logo1.svg';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="f-col f-brand">
            <div className="logo">
              <img src={logo} alt="Two Elephants" style={{ height: '32px' }} />
              <div className="logo-text">
                <span className="logo-main" style={{ color: '#fff' }}>
                  Two Elephants
                </span>
                <span className="logo-sub">
                  TECHNOLOGIES LLP
                </span>
              </div>
            </div>

            {/* <p className="f-tagline">Strength. Care. Honesty.</p> */}
            <br></br>
            <p className="f-desc">
              Technology grounded in 65 years of industrial wisdom. Built in Solapur.
            </p>

            <div className="social-row">
<<<<<<< HEAD
              <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" className="social-btn" aria-label="LinkedIn"><FaLinkedinIn size={18} /></a>
              <a href="#" className="social-btn" aria-label="Facebook"><FaFacebookF size={18} /></a>
              <a href="https://www.instagram.com/twoelephantstechnologiesllp?igsh=MWw5b2psZHJhMGJ4cA%3D%3D&utm_source=qr" className="social-btn" aria-label="Instagram"><FaInstagram size={18} /></a>
=======
              <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" className="social-btn" style={{ color: '#0077b5' }}>
                <FaLinkedin size={22} />
              </a>
              <a href="https://www.instagram.com/twoelephantstechnologiesllp" className="social-btn" style={{ color: '#E4405F' }}>
                <FaInstagram size={22} />
              </a>
>>>>>>> withBackend
            </div>
          </div>

          {/* Company */}
          <div className="f-col">
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/#team">Team</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="f-col f-services">
            <h4 className="f-col-title">Services</h4>
            <div className="f-services-grid">
              <ul className="f-links">
                <li><Link to="/services">Building Management (BMS)</Link></li>
                <li><Link to="/services">Facility Management (FMS)</Link></li>
                <li><Link to="/services">Fault Detection (FDD)</Link></li>
                <li><Link to="/services">Data & Analytics (CDA)</Link></li>
                <li><Link to="/services">Enterprise ERP</Link></li>
              </ul>
              <ul className="f-links">
                <li><Link to="/services">Cybersecurity & Compliance</Link></li>
                <li><Link to="/services">FinTech & Banking</Link></li>
                <li><Link to="/services">AI & ML Automation</Link></li>
                <li><Link to="/services">BPM & Workflow</Link></li>
                <li><Link to="/services">Product Engineering</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="f-col f-contact">
            <h4 className="f-col-title">Reach Us</h4>

            <div className="contact-item">
              <FaMapMarkerAlt className="c-icon" size={14} />
              <p>30/70, Vivekanand House, Padma Nagar, Akkalkot Road, Solapur - 413005</p>
            </div>

            <div className="contact-item">
              <FaEnvelope className="c-icon" size={14} />
              <a href="mailto:support@twoelephants.org">support@twoelephants.org</a>
            </div>

            <div className="contact-item">
              <FaPhone className="c-icon" size={14} />
              <div className="phone-group">
                <a href="tel:+917507080000">+91 7507080000</a>
                <span className="divider">|</span>
                <a href="tel:+918446448450">+91 8446448450</a>
              </div>
            </div>

            <div className="f-response" style={{ marginTop: '16px', fontSize: '12px', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaClock size={12} /> Response within 24 hours.
            </div>
          </div>

        </div>

        {/* Bottom */}
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

export default Footer;