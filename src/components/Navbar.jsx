import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo1.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Two Elephants" style={{ height: '40px' }} />
          <div className="logo-text">
            <span className="logo-main">Two Elephants</span>
            <span className="logo-sub">TECHNOLOGIES</span>
          </div>
        </Link>
        
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#insights">Insights</a>
          <Link to="/contact" className="btn btn-primary btn-sm">Get in Touch</Link>
        </div>

        <button 
          className="menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#team" onClick={() => setIsMobileMenuOpen(false)}>Team</a>
            <a href="#insights" onClick={() => setIsMobileMenuOpen(false)}>Insights</a>
            <Link to="/contact" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
