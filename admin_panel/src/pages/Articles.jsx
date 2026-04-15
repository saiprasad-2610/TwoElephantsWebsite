import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Newspaper, Plus, Edit2, Trash2, X, Image, Calendar, User, Clock, Eye, EyeOff, Search } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';
const BACKEND_BASE = 'http://localhost:8000';

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BACKEND_BASE}${url}`;
};

const CATEGORIES = ['BFSI', 'OIL & GAS', 'SOLAPUR', 'Technology', 'Innovation', 'Other'];

const initialFormState = {
  title: '',
  slug: '',
  cat: 'Technology',
  img: '',
  read_time: '5 min read',
  author: 'Two Elephants Team',
  date: new Date().toISOString().split('T')[0],
  excerpt: '',
  content: [''],
  is_published: true,
};

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/articles/`);
      setArticles(res.data);
    } catch (error) {
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'title' && !editingArticle) {
      setFormData({ ...formData, title: value, slug: generateSlug(value) });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleContentChange = (index, value) => {
    const newContent = [...formData.content];
    newContent[index] = value;
    setFormData({ ...formData, content: newContent });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addContent = () => {
    setFormData({ ...formData, content: [...formData.content, ''] });
  };

  const removeContent = (index) => {
    if (formData.content.length > 1) {
      setFormData({ ...formData, content: formData.content.filter((_, i) => i !== index) });
    }
  };

  const openModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        slug: article.slug,
        cat: article.cat,
        img: article.img_url || article.img || '',
        read_time: article.read_time,
        author: article.author,
        date: article.date,
        excerpt: article.excerpt,
        content: article.content && article.content.length > 0 ? article.content : [''],
        is_published: article.is_published,
      });
      setImagePreview(article.img_url || article.img || null);
    } else {
      setEditingArticle(null);
      setFormData(initialFormState);
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingArticle(null);
    setFormData(initialFormState);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingArticle) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'img' && formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          } else if (key !== 'img') {
            formDataToSend.append(key, formData[key]);
          }
        });
        formDataToSend.append('content', JSON.stringify(formData.content.filter((c) => c.trim() !== '')));
        await axios.put(`${API_BASE}/articles/${editingArticle.id}/`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Article updated successfully');
      } else {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'img' && formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          } else if (key !== 'img') {
            formDataToSend.append(key, formData[key]);
          }
        });
        formDataToSend.append('content', JSON.stringify(formData.content.filter((c) => c.trim() !== '')));
        await axios.post(`${API_BASE}/articles/`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Article created successfully');
      }
      fetchArticles();
      closeModal();
    } catch (error) {
      toast.error(editingArticle ? 'Failed to update article' : 'Failed to create article');
    }
  };

  const togglePublishStatus = async (article) => {
    try {
      await axios.patch(`${API_BASE}/articles/${article.id}/`, { is_published: !article.is_published });
      setArticles(articles.map((a) => (a.id === article.id ? { ...a, is_published: !a.is_published } : a)));
      toast.success(`Article ${article.is_published ? 'unpublished' : 'published'}`);
    } catch (error) {
      toast.error('Failed to update article');
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.delete(`${API_BASE}/articles/${id}/`);
      setArticles(articles.filter((a) => a.id !== id));
      toast.success('Article deleted');
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.cat === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Ubuntu_Sans']">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Knowledge Base</h1>
          <p className="text-gray-500 font-medium">Curate and publish insights for your audience</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
        >
          <Plus size={20} />
          Create Article
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search across articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-6 py-4 bg-[#0B1526] border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold appearance-none min-w-[200px]"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-80 bg-white/5 rounded-[32px]" />
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#0B1526] border rounded-[32px] overflow-hidden transition-all duration-500 group hover:border-blue-500/30 shadow-xl ${
                article.is_published ? 'border-white/5' : 'border-white/5 opacity-60 grayscale'
              }`}
            >
              {(article.img || article.img_url) && (
                <div className="h-52 overflow-hidden relative">
                  <img src={getImageUrl(article.img_url || article.img)} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1526] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                    {article.cat}
                  </div>
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    article.is_published ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{article.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-6 pb-6 border-b border-white/5">
                  <span className="flex items-center gap-1.5"><User size={12} className="text-blue-500/50" /> {article.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500/50" /> {formatDate(article.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500/50" /> {article.read_time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePublishStatus(article)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                      article.is_published
                        ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    {article.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => openModal(article)}
                    className="p-2.5 bg-white/5 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 rounded-xl border border-white/5 transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="p-2.5 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-xl border border-white/5 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0B1526] border border-white/5 rounded-[32px] p-20 text-center shadow-xl">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
            <Newspaper size={40} className="text-gray-700" />
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">No articles found in database</p>
          <button onClick={() => openModal()} className="px-8 py-3.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600/20 transition-all">
            Create your first article
          </button>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#080E1C]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-[#0B1526] border border-white/10 rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-[#0B1526] border-b border-white/5 px-10 py-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {editingArticle ? 'Update Content' : 'New Publication'}
                  </h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Article Editor</p>
                </div>
                <button onClick={closeModal} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Article Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-lg"
                    placeholder="Enter a compelling headline..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">URL Identifier (Slug)</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-blue-400 placeholder-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                      placeholder="article-slug-format"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
                    <select
                      name="cat"
                      value={formData.cat}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Author Name</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Publish Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Read Time</label>
                    <input
                      type="text"
                      name="read_time"
                      value={formData.read_time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/20 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                      placeholder="5 min read"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Hero Image</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="article-image-upload"
                    />
                    <label
                      htmlFor="article-image-upload"
                      className="flex flex-col items-center justify-center w-full min-h-[240px] bg-black/20 border-2 border-dashed border-white/10 rounded-[32px] cursor-pointer group-hover:border-blue-500/50 transition-all overflow-hidden p-4"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                          <img src={imagePreview} alt="Preview" className="max-h-48 rounded-2xl shadow-lg mb-4" />
                          <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full">Change Image</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-600">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Image size={32} className="text-gray-500" />
                          </div>
                          <span className="text-sm font-bold text-gray-400">Click to upload media</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest mt-2">PNG, JPG, WEBP • MAX 5MB</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Short Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium leading-relaxed resize-none"
                    placeholder="Brief summary for card display..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Main Content</label>
                  <div className="space-y-4">
                    {formData.content.map((paragraph, index) => (
                      <div key={index} className="flex gap-4 group">
                        <textarea
                          value={paragraph}
                          onChange={(e) => handleContentChange(index, e.target.value)}
                          rows={4}
                          className="flex-1 px-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium leading-relaxed resize-none"
                          placeholder={`Enter paragraph ${index + 1}...`}
                        />
                        {formData.content.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeContent(index)}
                            className="w-12 h-12 flex items-center justify-center text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-2xl self-start transition-all"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addContent}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-blue-400 hover:text-blue-300 transition-colors pl-1"
                  >
                    <Plus size={14} /> Add Paragraph
                  </button>
                </div>

                <div className="flex items-center gap-4 p-6 bg-black/20 border border-white/5 rounded-[32px]">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_published"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <label htmlFor="is_published" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Public Visibility</label>
                </div>

                <div className="flex gap-6 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-4 bg-white/5 text-gray-400 border border-white/5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    {editingArticle ? 'Commit Updates' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
