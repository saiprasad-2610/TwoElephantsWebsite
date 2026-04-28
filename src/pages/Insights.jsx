import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles as defaultArticles } from '../data/articles';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/blog.css';


const API_BASE = '';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return url;
};

const MotionLink = motion(Link);



const Insights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/public/articles/`);
        // Sort articles by date descending (most recent first)
        const sortedArticles = (res.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Failed to fetch articles from backend, falling back to defaults:', error);
        // Fallback to default articles if backend is down
        const sortedDefaults = [...defaultArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedDefaults);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const SectionReveal = ({ children }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="insights-hero-section section-padding">
          <div className="container">
            <div className="insights-hero-content">
              <motion.div
                className="eyebrow dark"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ALL INSIGHTS
              </motion.div>
              <motion.h1
                className="insights-hero-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Thinking at the Intersection of <em>Industry</em>
              </motion.h1>
              <motion.p
                className="insights-hero-sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Deep dives into the technologies shaping the future of global enterprise.
                Explore our comprehensive collection of articles, case studies, and thought leadership.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="insights-all-section section-padding">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading articles...</p>
              </div>
            ) : articles && articles.length > 0 ? (
              <motion.div
                className="insights-grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {articles.map((article, idx) => (
                  <MotionLink
                    key={article.id || idx}
                    to={`/insights/${article.slug || article.id}`}
                    className="blog-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="blog-img-wrap">
                      <img src={getImageUrl(article.img)} alt={article.title} className="blog-img" />
                      <div className="blog-overlay-info">
                        <span>{article.read_time}</span>
                      </div>
                    </div>
                    <div className="blog-content">
                      <span className="blog-cat">{article.cat}</span>
                      <h3 className="blog-title">{article.title}</h3>
                      <p className="blog-excerpt">{article.excerpt}</p>
                      <div className="blog-footer">
                        <span className="read-more">Read Full Article <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </MotionLink>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
