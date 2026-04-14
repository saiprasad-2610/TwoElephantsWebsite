import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { 
  Linkedin, 
  Twitter, 
  Github, 
  MapPin, 
  Mail, 
  Clock 
} from 'lucide-react';
=======
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
>>>>>>> Stashed changes
import logo from '../assets/images/logo1.svg';

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
<<<<<<< Updated upstream
              <a href="#" className="social-btn"><Linkedin size={18} /></a>
              <a href="#" className="social-btn"><Twitter size={18} /></a>
              <a href="#" className="social-btn"><Github size={18} /></a>
=======
              <a href="https://www.linkedin.com/company/two-elephants-technologies-llp/" className="social-btn" aria-label="LinkedIn"><FaLinkedinIn size={18} /></a>
              <a href="#" className="social-btn" aria-label="Facebook"><FaFacebookF size={18} /></a>
              <a href="https://www.instagram.com/twoelephantstechnologiesllp?igsh=MWw5b2psZHJhMGJ4cA%3D%3D&utm_source=qr" className="social-btn" aria-label="Instagram"><FaInstagram size={18} /></a>
>>>>>>> Stashed changes
            </div>
          </div>
          <div>
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">
              <li><a href="/#story">Our Story</a></li>
              <li><a href="/#team">Team</a></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="f-col-title">Services</h4>
            <ul className="f-links">
              <li><a href="/#services">BFSI Technology</a></li>
              <li><a href="/#services">Oil & Gas IT</a></li>
              <li><a href="/#services">Pharma IT</a></li>
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

export default Footer;
