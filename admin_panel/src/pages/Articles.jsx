import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Newspaper, Plus, Edit2, Trash2, X, Image, Calendar, User, Clock, Search } from 'lucide-react';

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
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
      reader.onloadend = () => setImagePreview(reader.result);
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
        await axios.put(`${API_BASE}/articles/${editingArticle.id}/`, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
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
        await axios.post(`${API_BASE}/articles/`, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
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
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-['Inter']">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Knowledge Base</h1>
          <p className="text-gray-500 font-medium">Curate and publish insights for your audience</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-[11px]"
        >
          <Plus size={18} />
          Create Article
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search across articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm shadow-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm appearance-none min-w-[180px] shadow-sm"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (<div key={i} className="animate-pulse h-72 bg-gray-100 rounded-2xl" />))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-lg ${
                article.is_published ? 'border-gray-100' : 'border-gray-100 opacity-60 grayscale'
              }`}
            >
              {(article.img || article.img_url) && (
                <div className="h-44 overflow-hidden relative">
                  <img src={getImageUrl(article.img_url || article.img)} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg text-[9px] font-bold text-gray-600 uppercase tracking-wider">
                    {article.cat}
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                    article.is_published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h3>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2 font-medium leading-relaxed">{article.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-1"><User size={11} className="text-blue-400" /> {article.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} className="text-blue-400" /> {formatDate(article.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={11} className="text-blue-400" /> {article.read_time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublishStatus(article)}
                    className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all ${
                      article.is_published ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {article.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => openModal(article)} className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg border border-gray-100 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteArticle(article.id)} className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg border border-gray-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <Newspaper size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4">No articles found in database</p>
          <button onClick={() => openModal()} className="px-6 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold uppercase tracking-wider text-[10px] hover:bg-blue-100 transition-all">
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="bg-white border border-gray-100 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">{editingArticle ? 'Update Content' : 'New Publication'}</h2>
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Article Editor</p>
                </div>
                <button onClick={closeModal} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all border border-gray-100">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto custom-scrollbar">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Article Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" placeholder="Enter a compelling headline..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">URL Identifier (Slug)</label>
                    <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-blue-600 placeholder-gray-700 focus:outline-none focus:border-blue-400 transition-all font-mono text-xs" placeholder="article-slug-format" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                    <select name="cat" value={formData.cat} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm">
                      {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Author Name</label>
                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Publish Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Read Time</label>
                    <input type="text" name="read_time" value={formData.read_time} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm" placeholder="5 min read" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Hero Image</label>
                  <div className="relative group">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="article-image-upload" />
                    <label htmlFor="article-image-upload" className="flex flex-col items-center justify-center w-full min-h-[180px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer group-hover:border-blue-400 transition-all overflow-hidden p-4">
                      {imagePreview ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                          <img src={imagePreview} alt="Preview" className="max-h-36 rounded-xl shadow mb-3" />
                          <span className="text-[9px] font-bold uppercase tracking-[1px] text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">Change Image</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Image size={24} className="text-gray-400" />
                          </div>
                          <span className="text-xs font-medium text-gray-500">Click to upload media</span>
                          <span className="text-[9px] font-semibold uppercase tracking-wider mt-1">PNG, JPG, WEBP • MAX 5MB</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Short Excerpt</label>
                  <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} required rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm leading-relaxed resize-none" placeholder="Brief summary for card display..." />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Main Content</label>
                  {formData.content.map((paragraph, index) => (
                    <div key={index} className="flex gap-3">
                      <textarea value={paragraph} onChange={(e) => handleContentChange(index, e.target.value)} rows={3} className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all font-medium text-sm leading-relaxed resize-none" placeholder={`Enter paragraph ${index + 1}...`} />
                      {formData.content.length > 1 && (
                        <button type="button" onClick={() => removeContent(index)} className="w-9 h-9 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl self-start transition-all">
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addContent} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors pl-1">
                    <Plus size={12} /> Add Paragraph
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="is_published" id="is_published" checked={formData.is_published} onChange={handleInputChange} className="sr-only peer" />
                    <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <label htmlFor="is_published" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Public Visibility</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-xl font-bold uppercase tracking-wider text-[11px] hover:bg-gray-100 transition-all">
                    Discard Changes
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-[11px]">
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
