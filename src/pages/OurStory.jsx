import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Heart, Award, Building2, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import loomsImg from '../assets/images/looms.jpg';
import labsImg from '../assets/images/labs.jpg';
import '../styles/OurStory.css';

const Counter = ({ value, label }) => {
  return (
    <div className="l-stat">
      <span className="l-number">{value}</span>
      <span className="l-label">{label}</span>
    </div>
  );
};

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    {
      year: "1960",
      title: "Pushpa Textile Founded",
      desc: "The iconic 'Do Haathi' brand is born in Solapur, setting quality standards that would endure generations.",
      icon: "🏭",
      color: "#4da8ff",
      glow: "rgba(77,168,255,0.3)"
    },
    {
      year: "2010s",
      title: "International Logistics",
      desc: "Expansion into Houston, Texas, building global trust in the demanding Oil & Gas sector.",
      icon: "🌐",
      color: "#cf0d0dff",
      glow: "rgba(248,204,28,0.3)"
    },
    {
      year: "2016s",
      title: "National Scale",
      desc: "Operating 5 factories producing 20,000+ premium pieces monthly for brands like IndiGo and Maruti Suzuki.",
      icon: "📈",
      color: "#10b981",
      glow: "rgba(16,185,129,0.3)"
    },
    {
      year: "2026",
      title: "Two Elephants Technologies LLP",
      desc: "Transitioning six decades of industrial wisdom into enterprise-grade technology solutions for the modern era.",
      icon: "🚀",
      color: "#7c3aed",
      glow: "rgba(124,58,237,0.3)"
    }
  ];

  return (
    <div className="story-page">
      <Navbar />
      
      <main>
        {/* ── HERO SECTION ── */}
        <section className="story-hero">
          <div className="container">
            <div className="story-hero-content">
              <div className="eyebrow">OUR LEGACY</div>
              <h1>60+ Years of Trust & <i>Excellence</i></h1>
              <p className="lead">
                From Solapur's historic looms to global IT labs — Two Elephants Technologies LLP carries forward 
                six decades of industrial integrity and quality craftsmanship into the digital age.
              </p>
            </div>
          </div>
        </section>

        {/* ── LEGACY VISUAL ── */}
        <section className="section-padding">
          <div className="container">
            <div className="story-grid">
              <div className="story-images">
                <div className="image-stack">
                  <img src={loomsImg} alt="Pushpa Textile Heritage" className="story-img-main" />
                  <div className="story-img-card card-legacy">
                    <span className="card-year">1960</span>
                    <span className="card-text">Legacy Begins</span>
                  </div>
                  <img src={labsImg} alt="Modern Technology Labs" className="story-img-fg" />
                  <div className="story-img-card card-tech">
                    <Zap size={16} color="var(--color-blue-glow)" />
                    <span>Tech Evolution</span>
                  </div>
                </div>
              </div>

              <div className="story-content">
                <div className="eyebrow dark">SIX DECADES OF TRUST</div>
                <h2 className="h2-title">A Legacy That Earns Its <em>Next Chapter</em></h2>
                <p className="body-text">
                  The Rathi family — known in Solapur as "Do Haathi" (Two Elephants) — has mastered the art of 
                  precision over six decades. Founded as Pushpa Textile in 1960, our journey has spanned 
                  manufacturing excellence, global Oil & Gas logistics, and national-scale expansion.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  Today, we are reinventing this family legacy for the enterprise era, bringing the same 
                  uncompromising industrial integrity to BFSI, Pharma, and Manufacturing technology.
                </p>

                <div className="legacy-stats">
                  <Counter value="60+" label="Years of Excellence" />
                  <Counter value="5" label="Factories at Peak" />
                  <Counter value="20K+" label="Pieces / Month" />
                </div>

                <blockquote className="pull-quote">
                  "Our legacy is not a footnote — it is our strongest credential."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── MILESTONES SECTION ── */}
        <section className="milestones-section section-padding">
          <div className="container">
            <div className="htl-wrap">
              <div className="htl-header">
                <div className="eyebrow dark">MILESTONES</div>
                <h2>From textile heritage to enterprise-scale technology.</h2>
              </div>

              <div className="htl-track">
                <div className="htl-line"></div>
                {milestones.map((m, i) => (
                  <div key={i} className="htl-item">
                    <div className="htl-dot" style={{ background: m.color, boxShadow: `0 0 0 6px ${m.glow}` }}></div>
                    <div className="htl-card">
                      <div className="htl-icon" style={{ background: m.glow }}>
                        <span>{m.icon}</span>
                      </div>
                      <div className="htl-year" style={{ color: m.color }}>{m.year}</div>
                      <h4 className="htl-title">{m.title}</h4>
                      <p className="htl-desc">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="values-section section-padding">
          <div className="container">
            <div className="text-center">
              <div className="eyebrow dark">OUR VALUES</div>
              <h2 className="h2-title">The Foundation of <i>Everything</i> We Build</h2>
            </div>
            
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon"><Shield size={48} color="var(--color-blue-core)" /></div>
                <h3>Strength</h3>
                <p>Six decades of operational discipline forged in India's most demanding industries. We build robust systems that stand the test of time.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon"><Heart size={48} color="#ef4444" /></div>
                <h3>Care</h3>
                <p>Every client relationship is treated with the same devotion as family business — always. Your success is our personal commitment.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon"><Award size={48} color="var(--accent-amber)" /></div>
                <h3>Honesty</h3>
                <p>Transparent delivery, accountable leadership, and no-surprise engagements. We believe in building trust through radical transparency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY SOLAPUR? ── */}
        <section className="solapur-section section-padding">
          <div className="container">
            <div className="solapur-grid">
              <div className="solapur-content">
                <div className="eyebrow dark">BUILDING THE FUTURE</div>
                <h2>Why Solapur? <br /><i>Looms to Labs</i></h2>
                <p className="body-text">
                  Solapur has long been India's textile powerhouse. Now, it is poised to become the country's 
                  next breakthrough IT hub — combining engineering talent, cost advantages, and industrial discipline.
                </p>
                <p className="body-text" style={{ marginTop: '20px' }}>
                  "When people think of Solapur, they think of looms. I want the next generation to think of labs." 
                  <br /><strong>— Prashant Rathi, CEO</strong>
                </p>
                
                <div className="solapur-stats">
                  <div className="s-stat-card">
                    <span className="s-stat-num">18</span>
                    <span className="s-stat-label">Engineering Colleges</span>
                  </div>
                  <div className="s-stat-card">
                    <span className="s-stat-num">3K+</span>
                    <span className="s-stat-label">Graduates per Year</span>
                  </div>
                </div>
              </div>
              
              <div className="solapur-visual">
                <div className="highlight-card" style={{ background: 'var(--color-navy)', color: '#fff', padding: '40px' }}>
                  <h3 style={{ color: 'var(--color-blue-glow)', marginBottom: '20px' }}>Structural Advantage</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                      <Building2 size={24} color="var(--color-blue-glow)" />
                      <span>Office rent at ₹15–20/sqft vs. ₹100–150 in metros.</span>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                      <Users size={24} color="var(--color-blue-glow)" />
                      <span>Hire 5-7x more engineers for the same budget.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '15px' }}>
                      <Globe size={24} color="var(--color-blue-glow)" />
                      <span>Strategically located between Pune and Hyderabad.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TALENT STRATEGY ── */}
        <section className="talent-section section-padding">
          <div className="container">
            <div className="talent-header">
              <div className="eyebrow">OUR ROADMAP</div>
              <h2>Architectured Talent Strategy</h2>
              <p>Creating a sustainable, scalable workforce rooted in Solapur. Target: 500 job-ready professionals by FY30.</p>
            </div>
            
            <div className="talent-steps">
              <div className="talent-step">
                <span className="step-num">01</span>
                <h3>Initiation</h3>
                <ul>
                  <li>MoUs with 8 Engineering Colleges</li>
                  <li>Intensive domain training: BFSI, O&G, Pharma</li>
                  <li>Live project exposure from Day 1</li>
                </ul>
              </div>
              
              <div className="talent-step">
                <span className="step-num">02</span>
                <h3>Integration</h3>
                <ul>
                  <li>Experienced professionals + fresh engineers</li>
                  <li>Real-world industry experience on live projects</li>
                  <li>Mentorship structures to accelerate readiness</li>
                </ul>
              </div>
              
              <div className="talent-step">
                <span className="step-num">03</span>
                <h3>Realization</h3>
                <ul>
                  <li>Scale to 500 job-ready professionals</li>
                  <li>Structured training programs & mentorship</li>
                  <li>Domain-specific client standards deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="section-padding text-center">
          <div className="container">
            <h2 className="h2-title">Be Part of Our <i>Next Chapter</i></h2>
            <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
              Whether you're a client looking for industrial-grade IT solutions or a talent 
              wanting to build a career in Solapur, let's talk.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
              <Link to="/careers" className="btn btn-outline">Join the Team</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
