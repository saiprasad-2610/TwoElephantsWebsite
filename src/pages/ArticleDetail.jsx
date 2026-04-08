import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { articles } from '../data/articles';
import Navbar from '../components/Navbar';
import logo from '../assets/images/logo1.svg';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="error-page section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Article not found</h2>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <Navbar />

      <main style={{ paddingTop: '100px' }}>
        <article>
          <header className="article-header-standard">
            <div className="container">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="eyebrow amber no-line">{article.cat}</div>
                <h1 className="article-title-main">{article.title}</h1>
                
                <div className="article-meta-row">
                  <div className="meta-item">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          <motion.div 
            className="article-hero-image container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={article.img} alt={article.title} className="featured-image" />
          </motion.div>

          <div className="article-content-standard section-padding">
            <div className="container-narrow">
              <p className="article-lead">{article.excerpt}</p>
              
              <div className="article-body-text">
                {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="article-share-footer">
                <div className="share-box">
                  <span className="share-label">Share this insight</span>
                  <div className="share-actions">
                    <button className="share-btn"><Linkedin size={18} /></button>
                    <button className="share-btn"><Twitter size={18} /></button>
                    <button className="share-btn"><LinkIcon size={18} /></button>
                  </div>
                </div>
              </div>
              
              <div className="article-navigation">
                <Link to="/" className="btn btn-outline-dark">
                  <ArrowLeft size={16} /> Back to All Insights
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer style={{ background: 'var(--color-dark)', color: '#fff', padding: '60px 0 30px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="logo-main" style={{ fontSize: '24px', marginBottom: '16px' }}>Two Elephants</div>
          <p style={{ opacity: 0.6 }}>© 2026 Two Elephants Technologies LLP. Built with precision in Solapur.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;
