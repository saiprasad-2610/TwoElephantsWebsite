import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Globe, Send, Link as LinkIcon } from 'lucide-react';
import { articles } from '../data/articles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);

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

  const relatedArticles = articles.filter(a => a.cat === article.cat && a.id !== id).slice(0, 2);
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
      // Could add a toast notification here
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
                    <button className="share-btn" onClick={shareOnLinkedIn}><Globe size={18} /></button>
                    <button className="share-btn" onClick={shareOnTwitter}><Send size={18} /></button>
                    <button className="share-btn" onClick={copyLink}><LinkIcon size={18} /></button>
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

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="related-articles section-padding">
            <div className="container">
              <motion.div 
                className="section-header text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">Related Insights</h2>
                <p className="section-subtitle">Explore more articles in {article.cat}</p>
              </motion.div>

              <div className="related-articles-grid">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div 
                    key={relatedArticle.id}
                    className="related-article-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/insights/${relatedArticle.id}`} className="related-article-link">
                      <div className="related-article-image">
                        <img src={relatedArticle.img} alt={relatedArticle.title} />
                      </div>
                      <div className="related-article-content">
                        <div className="eyebrow amber">{relatedArticle.cat}</div>
                        <h3>{relatedArticle.title}</h3>
                        <p>{relatedArticle.excerpt}</p>
                        <div className="related-article-meta">
                          <span>{relatedArticle.author}</span>
                          <span>{relatedArticle.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
