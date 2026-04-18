import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FaUser,
  FaCalendar,
  FaClock,
  FaGlobe,
  FaPaperPlane,
  FaLink,
  FaArrowLeft
} from "react-icons/fa";
import { articles as defaultArticles } from '../data/articles';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();

    const updateProgress = () => {
      const progressBar = document.getElementById('scroll-progress');
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (!progressBar || docHeight <= 0) return;

      const scrollTop = window.scrollY;
      const scrollPercent = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
      progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [slug]);

  const fetchData = async () => {
    try {
      const [articleRes, allRes] = await Promise.all([
        axios.get(`${API_BASE}/api/public/articles/${slug}/`),
        axios.get(`${API_BASE}/api/public/articles/`)
      ]);
      setArticle(articleRes.data);
      setAllArticles(allRes.data);
    } catch (err) {
      console.error('Failed to fetch article from backend, checking defaults:', err);
      // Check if it's in defaults
      const foundInDefault = defaultArticles.find(a => a.id === slug || a.slug === slug);
      if (foundInDefault) {
        setArticle(foundInDefault);
        setAllArticles(defaultArticles);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="error-page section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Loading article...</h2>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="error-page section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Article not found</h2>
          <NavHashLink smooth to="/#insights" className="btn btn-primary" style={{ marginTop: '24px' }}>
            Back to All Insights
          </NavHashLink>
        </div>
      </div>
    );
  }

  const relatedArticles = allArticles.filter(a => a.cat === article.cat && a.slug !== slug).slice(0, 2);
  const shareUrl = window.location.href;
  const shareTitle = article.title;

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="article-detail-page">
      <div id="scroll-progress"></div>
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
                    <FaUser size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock size={14} />
                    <span>{article.read_time}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          {article.img && (
            <motion.div
              className="article-hero-image container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={getImageUrl(article.img)} alt={article.title} className="featured-image" />
            </motion.div>
          )}

          <div className="article-content-standard section-padding">
            <div className="container-narrow">
              <p className="article-lead">{article.excerpt}</p>

              <div className="article-body-text">
                {article.content && article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="article-share-footer">
                <div className="share-box">
                  <span className="share-label">Share this insight</span>
                  <div className="share-actions">
                    <button className="share-btn" onClick={shareOnLinkedIn}>
                      <FaGlobe size={16} />
                    </button>
                    <button className="share-btn" onClick={shareOnTwitter}>
                      <FaPaperPlane size={16} />
                    </button>
                    <button className="share-btn" onClick={copyLink}>
                      <FaLink size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="article-navigation">
                <NavHashLink smooth to="/#insights" className="btn btn-outline-dark">
                  <FaArrowLeft size={14} /> Back to All Insights
                </NavHashLink>
              </div>

              {relatedArticles.length > 0 && (
                <div className="related-articles">
                  <h3>Related Articles</h3>
                  <div className="related-grid">
                    {relatedArticles.map((rel) => (
                      <Link key={rel.slug} to={`/insights/${rel.slug}`} className="related-card">
                        {rel.img && <img src={getImageUrl(rel.img)} alt={rel.title} />}
                        <span className="blog-cat">{rel.cat}</span>
                        <h4>{rel.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
