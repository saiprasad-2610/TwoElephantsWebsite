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
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock
} from "react-icons/fa";
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

            <p className="f-tagline">Strength. Care. Honesty.</p>
            <p className="f-desc">
              Technology grounded in 65 years of industrial wisdom. Built in Solapur.
            </p>

            <div className="social-row">
              <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" className="social-btn">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="social-btn">
                <FaFacebook size={18} />
              </a>
              <a href="https://www.instagram.com/twoelephantstechnologiesllp" className="social-btn">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="f-col">
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/#team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="f-col">
            <h4 className="f-col-title">Services</h4>
            <ul className="f-links">
              <li><a href="/services">Digital Transformation</a></li>
              <li><a href="/services">AI Solutions</a></li>
              <li><a href="/services">Cybersecurity</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="f-col f-contact">
            <h4 className="f-col-title">Reach Us</h4>

            <p>
              <FaMapMarkerAlt size={14} />{" "}
              30/70, Vivekanand House, Padma Nagar, Akkalkot Road, Solapur - 413005
            </p>

            <p>
              <FaEnvelope size={14} />{" "}
              <a href="mailto:support@twoelephants.org" style={{ color: 'inherit' }}>
                support@twoelephants.org
              </a>
            </p>

            <p>
              <FaPhone size={14} />{" "}
              <a href="tel:+917507080000" style={{ color: 'inherit' }}>
                +91 7507080000
              </a>
              {" | "}
              <a href="tel:+917249570505" style={{ color: 'inherit' }}>
                9405236989
              </a>
            </p>

            <div className="f-response">
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