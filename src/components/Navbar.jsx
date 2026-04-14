import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import logo from '../assets/images/logo1.svg';

/** ─────────────────────────────────────────
 *  EFFECT 1: Staggered Letter Wave
 *  Each character bounces up in ripple order
 * ───────────────────────────────────────── */
const NavText = ({ text, isActive, isHovered }) => (
  <span className="nav-text" aria-label={text}>
    <motion.span
      animate={
        isHovered
          ? { color: 'rgba(255,255,255,0.96)' }
          : isActive
            ? { color: '#f8cc1c' }
            : { color: 'rgba(255,255,255,0.80)' }
      }
      transition={{ duration: 0.2 }}
      style={{ fontWeight: isActive ? 700 : isHovered ? 600 : 500 }}
    >
      {text}
    </motion.span>
  </span>
);

/** ─────────────────────────────────────────
 *  EFFECT 2: Magnetic Hover
 *  Each link slightly follows the cursor
 * ───────────────────────────────────────── */
// MagneticLink removed - using direct motion.div hover


/** ─────────────────────────────────────────
 *  EFFECT 3: Click Ripple
 * ───────────────────────────────────────── */
const ClickRipple = ({ trigger, color = 'rgba(248,204,28,0.5)' }) => {
  const [ripples, setRipples] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const id = Date.now();
    setRipples(r => [...r, id]);
    setTimeout(() => setRipples(r => r.filter(x => x !== id)), 700);
  }, [trigger]);

  return (
    <>
      {ripples.map(id => (
        <motion.span
          key={id}
          style={{
            position: 'absolute', inset: 0, borderRadius: '8px',
            background: color, zIndex: 0, pointerEvents: 'none',
          }}
          initial={{ opacity: 0.7, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </>
  );
};

/* ═══════════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════════ */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [clickedPath, setClickedPath] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > 50 || location.pathname !== '/');
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMobileMenuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, location.hash, closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };
 

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const navItems = [
    { name: 'Home', path: '/#home', isHash: true },
    { name: 'Our Story', path: '/story', isHash: false },
    { name: 'Services', path: '/services', isHash: false },
    { name: 'Team', path: '/#team', isHash: true },
    { name: 'Insights', path: '/#insights', isHash: true },
    { name: 'Careers', path: '/careers', isHash: false },
    { name: 'Contact', path: '/contact', isHash: false },
  ];

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '72px',
        zIndex: 999, display: 'flex', alignItems: 'center',
        background: isScrolled ? 'rgba(8,14,28,0.97)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(28px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(28px)' : 'none',
        boxShadow: isScrolled
          ? '0 1px 0 rgba(255,255,255,0.06), 0 8px 56px rgba(0,0,0,0.5)'
          : 'none',
        transition: 'background 0.5s ease, box-shadow 0.5s ease',
      }}
      /* EFFECT 4: Slide-down entrance */
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.15 }}
    >
      <div className="container nav-inner">

        {/* ── LOGO ── */}
        <Link to="/#home"  onClick={() => window.scrollTo(0,0)} className="logo" style={{ textDecoration: "none" }}>
          <motion.img
            src={logo}
            alt="Two Elephants"
            style={{ height: "65px", width: "auto" }}
            whileHover={{ scale: 1.12, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          />

          <div className="logo-text">
            <span className="logo-main">Two Elephants</span>
            <span className="logo-sub">TECHNOLOGIES LLP</span>
          </div>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <div
          className="nav-links"
          onMouseLeave={() => setHoveredPath(null)}
          style={{ position: 'relative' }}
        >
          {navItems.map((item, idx) => {
            const isActive = item.isHash
              ? location.pathname === '/' && location.hash === '#' + item.path.split('#')[1]
              : location.pathname === item.path;
            const isHovered = hoveredPath === item.path;
            const anyHovered = hoveredPath !== null;
            const Component = item.isHash ? NavHashLink : Link;

            return (
              /* EFFECT 5: Staggered entrance per item */
              <motion.div
                key={item.path}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 + idx * 0.07 }}
                style={{ display: 'inline-block' }}
              >
                <motion.div
                  className="simple-hover-link"
                  whileHover={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <Component
                    {...(item.isHash ? { smooth: true } : {})}
                    to={item.path}
                    onClick={() => {
                      setClickedPath(item.path);
                      setIsClicked(true);
                      setTimeout(() => {
                        setClickedPath(null);
                        setIsClicked(false);
                      }, 200);
                    }}
                    className="nav-item-link"
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      textDecoration: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      opacity: anyHovered && !isHovered ? 0.62 : 1,
                      transition: 'opacity 0.25s ease',
                    }}
                  >
                    {!isActive && isHovered && (
                      <motion.span
                        layoutId="nav-hover-line"
                        style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '18%',
                          width: '64%',
                          height: '1px',
                          borderRadius: '999px',
                          zIndex: 1,
                          background:
                            'linear-gradient(90deg, transparent, rgba(248,204,28,0.92), transparent)',
                          boxShadow: '0 0 8px rgba(248,204,28,0.28)',
                        }}
                        initial={{ opacity: 0, scaleX: 0.65 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bar"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '12%',
                          width: '76%',
                          height: '2px',
                          borderRadius: '2px',
                          zIndex: 10,
                          background:
                            'linear-gradient(90deg, transparent, #f8cc1c, transparent)',
                          boxShadow:
                            '0 0 10px #f8cc1c, 0 0 20px rgba(248,204,28,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      />
                    )}
                    <ClickRipple trigger={clickedPath === item.path} />
                    <span
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      <NavText text={item.name} isActive={isActive} isHovered={isHovered} />
                    </span>
                  </Component>
                </motion.div>
              </motion.div>
            );
          })}

          {/* CTA "Get in Touch" Button */}
          {/* <motion.div
            style={{ marginLeft: '8px' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 + navItems.length * 0.07 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-block', padding: '8px 20px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                background: 'linear-gradient(135deg, #f8cc1c 0%, #ffa500 100%)',
                color: '#080E1C', border: 'none',
                boxShadow: '0 0 24px rgba(248,204,28,0.40), 0 4px 16px rgba(0,0,0,0.3)',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(248,204,28,0.75), 0 4px 24px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(248,204,28,0.40), 0 4px 16px rgba(0,0,0,0.3)'; }}
            >
              Get in Touch ✦
            </Link>
          </motion.div> */}

        </div>

        <button
          className={`menu-btn${isMobileMenuOpen ? ' active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <button
        type="button"
        className={`mobile-overlay${isMobileMenuOpen ? ' open' : ''}`}
        onClick={closeMobileMenu}
        aria-label="Close menu overlay"
      ></button>

      <div id="mobile-menu" className={`mobile-menu${isMobileMenuOpen ? ' open' : ''}`}>
        <Link to="/#home" className="mobile-menu-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="Two Elephants" />
          <span>Two Elephants</span>
        </Link>

        <div className="mobile-menu-links">
          {navItems.map((item) => {
            const Component = item.isHash ? NavHashLink : Link;
            return (
              <Component
                key={item.path}
                {...(item.isHash ? { smooth: true } : {})}
                to={item.path}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Component>
            );
          })}
        </div>

        <Link to="/contact" className="btn btn-primary mobile-menu-cta" onClick={closeMobileMenu}>
          Contact Us
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
