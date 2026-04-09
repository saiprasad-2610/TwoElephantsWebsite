import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import logo from '../assets/images/logo1.svg';

/** ─────────────────────────────────────────
 *  EFFECT 1: Staggered Letter Wave
 *  Each character bounces up in ripple order
 * ───────────────────────────────────────── */
const NavText = ({ text, isActive, isHovered }) => (
  <span style={{ display: 'inline-flex', gap: 0 }} aria-label={text}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        animate={
          isHovered
            ? { y: -5, color: '#f8cc1c', textShadow: '0 0 14px rgba(248,204,28,0.85)' }
            : isActive
              ? { y: 0, color: '#f8cc1c', textShadow: '0 0 8px rgba(248,204,28,0.5)' }
              : { y: 0, color: 'rgba(255,255,255,0.80)', textShadow: 'none' }
        }
        transition={{
          type: 'spring', stiffness: 650, damping: 20,
          delay: isHovered ? i * 0.03 : (text.length - i) * 0.015,
        }}
        style={{ display: 'inline-block', willChange: 'transform, color' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

/** ─────────────────────────────────────────
 *  EFFECT 2: Magnetic Hover
 *  Each link slightly follows the cursor
 * ───────────────────────────────────────── */
const MagneticLink = ({ children, onMouseEnter, onMouseLeave, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30 });
  const sy = useSpring(y, { stiffness: 350, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = (e) => {
    x.set(0); y.set(0);
    onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onMouseEnter}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > 50 || location.pathname !== '/');
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/#home', isHash: true },
    { name: 'Our Story', path: '/#story', isHash: true },
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
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <motion.img
            src={logo}
            alt="Two Elephants"
            style={{ height: '65px', width: 'auto' }}
            whileHover={{ scale: 1.12, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
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
                <MagneticLink
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <Component
                    {...(item.isHash ? { smooth: true } : {})}
                    to={item.path}
                    onClick={() => { setClickedPath(item.path); setTimeout(() => setClickedPath(null), 50); }}
                    className="nav-item-link"
                    style={{
                      position: 'relative', display: 'inline-block',
                      textDecoration: 'none', padding: '8px 14px',
                      borderRadius: '8px',
                      /* EFFECT 6: Dim inactive links when any is hovered */
                      opacity: anyHovered && !isHovered ? 0.48 : 1,
                      transition: 'opacity 0.25s ease',
                    }}
                  >
                    {/* Animated background pill */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          layoutId="nav-pill"
                          style={{
                            position: 'absolute', inset: 0, borderRadius: '8px', zIndex: 0,
                            background: 'linear-gradient(135deg, rgba(248,204,28,0.14) 0%, rgba(77,168,255,0.10) 100%)',
                            border: '1px solid rgba(248,204,28,0.30)',
                            boxShadow: '0 0 24px rgba(248,204,28,0.18), 0 0 48px rgba(248,204,28,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
                          }}
                          initial={{ opacity: 0, scale: 0.86 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.86 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active page underline glow */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bar"
                        style={{
                          position: 'absolute', bottom: '2px', left: '12%', width: '76%',
                          height: '2px', borderRadius: '2px', zIndex: 10,
                          background: 'linear-gradient(90deg, transparent, #f8cc1c, transparent)',
                          boxShadow: '0 0 10px #f8cc1c, 0 0 20px rgba(248,204,28,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      />
                    )}

                    {/* Click ripple burst */}
                    <ClickRipple trigger={clickedPath === item.path} />

                    <span style={{ position: 'relative', zIndex: 1, fontSize: '14px', fontWeight: 500 }}>
                      <NavText text={item.name} isActive={isActive} isHovered={isHovered} />
                    </span>
                  </Component>
                </MagneticLink>
              </motion.div>
            );
          })}

          {/* CTA "Get in Touch" Button */}
          <motion.div
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
          </motion.div>

          {/* Mobile toggle */}
          <motion.button
            className="menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.88, rotate: 90 }}
            style={{ marginLeft: '12px' }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={24} /></motion.span>
                : <motion.span key="men" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={24} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {navItems.map((item, i) => {
              const Component = item.isHash ? NavHashLink : Link;
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <Component smooth={item.isHash} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Component>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.06 }}
              style={{ marginTop: '24px' }}
            >
              <Link to="/contact" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
